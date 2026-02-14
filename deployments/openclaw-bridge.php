<?php
/**
 * Plugin Name: OpenClaw Fleet Bridge
 * Description: Authenticated REST API bridge between OpenClaw fleet and WordPress/WooCommerce.
 * Version: 1.0.0
 * Author: OpenClaw / Spartan Digital
 * Requires at least: 6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// ─── CONFIG ──────────────────────────────────────────────────────────

// Shared secret for HMAC-SHA256 request signing.
// Set in wp-config.php: define('OPENCLAW_BRIDGE_SECRET', 'your-64-char-hex-string');
// Generate with: openssl rand -hex 32
if (!defined('OPENCLAW_BRIDGE_SECRET')) {
    // Fail loudly if not configured — don't silently operate without auth
    add_action('admin_notices', function () {
        echo '<div class="error"><p><strong>OpenClaw Bridge:</strong> OPENCLAW_BRIDGE_SECRET is not defined in wp-config.php. Bridge endpoints are disabled.</p></div>';
    });
    return; // Don't register any endpoints
}

define('OPENCLAW_BRIDGE_VERSION', '1.0.0');
define('OPENCLAW_BRIDGE_TIMESTAMP_TOLERANCE', 300); // 5 minutes
define('OPENCLAW_BRIDGE_NAMESPACE', 'openclaw/v1');

// ─── HMAC AUTHENTICATION ─────────────────────────────────────────────

/**
 * Verify HMAC-SHA256 signature on incoming requests.
 *
 * Expected headers:
 *   X-OpenClaw-Timestamp: Unix timestamp (seconds)
 *   X-OpenClaw-Signature: HMAC-SHA256 hex digest
 *
 * Signature covers: timestamp + ":" + HTTP_METHOD + ":" + request_path + ":" + sha256(body)
 */
function openclaw_verify_hmac(WP_REST_Request $request) {
    $timestamp = $request->get_header('X-OpenClaw-Timestamp');
    $signature = $request->get_header('X-OpenClaw-Signature');

    if (!$timestamp || !$signature) {
        return new WP_Error(
            'openclaw_missing_auth',
            'Missing X-OpenClaw-Timestamp or X-OpenClaw-Signature header.',
            ['status' => 401]
        );
    }

    // Replay protection — reject requests older than 5 minutes
    $now = time();
    if (abs($now - intval($timestamp)) > OPENCLAW_BRIDGE_TIMESTAMP_TOLERANCE) {
        return new WP_Error(
            'openclaw_expired',
            'Request timestamp outside tolerance window.',
            ['status' => 401]
        );
    }

    // Reconstruct the signed payload
    $method = $request->get_method();
    $path = $request->get_route();
    $body = $request->get_body();
    $body_hash = hash('sha256', $body ?: '');
    $payload = "{$timestamp}:{$method}:{$path}:{$body_hash}";

    // Compute expected signature
    $expected = hash_hmac('sha256', $payload, OPENCLAW_BRIDGE_SECRET);

    // Constant-time comparison to prevent timing attacks
    if (!hash_equals($expected, $signature)) {
        error_log("[OpenClaw Bridge] HMAC verification failed from " . $_SERVER['REMOTE_ADDR']);
        return new WP_Error(
            'openclaw_invalid_signature',
            'HMAC signature verification failed.',
            ['status' => 403]
        );
    }

    return true;
}

/**
 * WP REST permission callback using HMAC verification.
 */
function openclaw_hmac_permission(WP_REST_Request $request) {
    $result = openclaw_verify_hmac($request);
    if (is_wp_error($result)) {
        return $result;
    }
    return true;
}

// ─── REST API ENDPOINTS ──────────────────────────────────────────────

add_action('rest_api_init', function () {

    // GET /openclaw/v1/subscription/status?email=customer@example.com
    // Returns subscription tier and fleet access limits for a customer.
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/subscription/status', [
        'methods' => 'GET',
        'callback' => 'openclaw_get_subscription_status',
        'permission_callback' => 'openclaw_hmac_permission',
        'args' => [
            'email' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_email',
                'validate_callback' => function ($value) {
                    return is_email($value);
                },
            ],
        ],
    ]);

    // GET /openclaw/v1/subscription/all-active
    // Returns all active subscriptions with their fleet access profiles.
    // Used by dispatcher on startup to build the customer access map.
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/subscription/all-active', [
        'methods' => 'GET',
        'callback' => 'openclaw_get_all_active_subscriptions',
        'permission_callback' => 'openclaw_hmac_permission',
    ]);

    // POST /openclaw/v1/fleet/health
    // Fleet reports its status. WordPress stores it for the customer dashboard.
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/fleet/health', [
        'methods' => 'POST',
        'callback' => 'openclaw_receive_fleet_health',
        'permission_callback' => 'openclaw_hmac_permission',
    ]);

    // GET /openclaw/v1/bridge/verify
    // Health check — confirms bridge plugin is active and auth works.
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/bridge/verify', [
        'methods' => 'GET',
        'callback' => function () {
            return new WP_REST_Response([
                'ok' => true,
                'version' => OPENCLAW_BRIDGE_VERSION,
                'woocommerce' => class_exists('WooCommerce'),
                'subscriptions' => class_exists('WC_Subscriptions'),
            ], 200);
        },
        'permission_callback' => 'openclaw_hmac_permission',
    ]);

    // POST /openclaw/v1/bridge/config
    // Set OpenClaw configuration options (HMAC-authenticated).
    // Allows fleet to configure Convex URLs and dashboard URL remotely.
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/bridge/config', [
        'methods' => 'POST',
        'callback' => function (WP_REST_Request $request) {
            $data = $request->get_json_params();
            $allowed_keys = [
                'openclaw_convex_site_url',
                'openclaw_convex_api_token',
                'openclaw_dashboard_url',
            ];
            $updated = [];
            foreach ($allowed_keys as $key) {
                if (isset($data[$key])) {
                    update_option($key, sanitize_text_field($data[$key]), false);
                    $updated[] = $key;
                }
            }
            return new WP_REST_Response([
                'ok' => true,
                'updated' => $updated,
            ], 200);
        },
        'permission_callback' => 'openclaw_hmac_permission',
    ]);

    // GET /openclaw/v1/bridge/config
    // Read current OpenClaw configuration (HMAC-authenticated).
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/bridge/config', [
        'methods' => 'GET',
        'callback' => function () {
            return new WP_REST_Response([
                'openclaw_convex_site_url' => get_option('openclaw_convex_site_url', ''),
                'openclaw_convex_api_token' => get_option('openclaw_convex_api_token') ? '***SET***' : '',
                'openclaw_dashboard_url' => get_option('openclaw_dashboard_url', ''),
            ], 200);
        },
        'permission_callback' => 'openclaw_hmac_permission',
    ]);
});

// ─── ENDPOINT HANDLERS ───────────────────────────────────────────────

/**
 * GET /openclaw/v1/subscription/status?email=customer@example.com
 */
function openclaw_get_subscription_status(WP_REST_Request $request): WP_REST_Response {
    $email = $request->get_param('email');

    // Find customer by email
    $customer = get_user_by('email', $email);
    if (!$customer) {
        return new WP_REST_Response([
            'status' => 'none',
            'message' => 'No customer found with this email.',
        ], 200); // 200 not 404 — "no subscription" is a valid response, not an error
    }

    // Get active subscriptions for this customer
    if (!function_exists('wcs_get_users_subscriptions')) {
        return new WP_REST_Response([
            'error' => 'WooCommerce Subscriptions not active.',
        ], 503);
    }

    $subscriptions = wcs_get_users_subscriptions($customer->ID);
    $active = null;

    foreach ($subscriptions as $sub) {
        if ($sub->has_status(['active', 'pending-cancel'])) {
            $active = $sub;
            break; // Use the first active subscription
        }
    }

    if (!$active) {
        return new WP_REST_Response([
            'status' => 'inactive',
            'customer_id' => $customer->ID,
            'email' => $email,
        ], 200);
    }

    // Get the subscription product and its OpenClaw meta
    $items = $active->get_items();
    $product = null;
    foreach ($items as $item) {
        $product = $item->get_product();
        break;
    }

    $tier = $product ? get_post_meta($product->get_id(), '_openclaw_tier', true) : 'unknown';
    $max_agents = $product ? intval(get_post_meta($product->get_id(), '_openclaw_max_agents', true)) : 0;
    $max_tasks = $product ? intval(get_post_meta($product->get_id(), '_openclaw_max_tasks_monthly', true)) : 0;

    return new WP_REST_Response([
        'status' => $active->get_status(), // 'active' or 'pending-cancel'
        'customer_id' => $customer->ID,
        'email' => $email,
        'subscription_id' => $active->get_id(),
        'tier' => $tier,
        'fleet_access' => [
            'max_agents' => $max_agents,
            'max_tasks_monthly' => $max_tasks,
        ],
        'current_period_end' => $active->get_date('next_payment'),
        'created' => $active->get_date('start'),
    ], 200);
}

/**
 * GET /openclaw/v1/subscription/all-active
 */
function openclaw_get_all_active_subscriptions(WP_REST_Request $request): WP_REST_Response {
    if (!function_exists('wcs_get_subscriptions')) {
        return new WP_REST_Response(['error' => 'WooCommerce Subscriptions not active.'], 503);
    }

    $subscriptions = wcs_get_subscriptions([
        'subscription_status' => ['active', 'pending-cancel'],
        'subscriptions_per_page' => 100,
    ]);

    $results = [];
    foreach ($subscriptions as $sub) {
        $customer = $sub->get_user();
        $items = $sub->get_items();
        $product = null;
        foreach ($items as $item) {
            $product = $item->get_product();
            break;
        }

        $tier = $product ? get_post_meta($product->get_id(), '_openclaw_tier', true) : 'unknown';
        $max_agents = $product ? intval(get_post_meta($product->get_id(), '_openclaw_max_agents', true)) : 0;
        $max_tasks = $product ? intval(get_post_meta($product->get_id(), '_openclaw_max_tasks_monthly', true)) : 0;

        $results[] = [
            'customer_id' => $customer ? $customer->ID : null,
            'email' => $customer ? $customer->user_email : null,
            'subscription_id' => $sub->get_id(),
            'status' => $sub->get_status(),
            'tier' => $tier,
            'fleet_access' => [
                'max_agents' => $max_agents,
                'max_tasks_monthly' => $max_tasks,
            ],
            'current_period_end' => $sub->get_date('next_payment'),
        ];
    }

    return new WP_REST_Response([
        'count' => count($results),
        'subscriptions' => $results,
    ], 200);
}

/**
 * POST /openclaw/v1/fleet/health
 * Receives fleet health status and stores it as a transient for the customer dashboard.
 */
function openclaw_receive_fleet_health(WP_REST_Request $request): WP_REST_Response {
    $data = $request->get_json_params();

    // Store as WordPress transient (expires after 10 minutes)
    set_transient('openclaw_fleet_health', [
        'received_at' => current_time('mysql'),
        'agents_active' => $data['agents_active'] ?? 0,
        'agents_total' => $data['agents_total'] ?? 0,
        'tasks_pending' => $data['tasks_pending'] ?? 0,
        'fleet_cost_today' => $data['fleet_cost_today'] ?? 0,
        'breakers_tripped' => $data['breakers_tripped'] ?? [],
    ], 600);

    return new WP_REST_Response(['ok' => true], 200);
}

// ─── ORDER FULFILLMENT ENDPOINTS ─────────────────────────────────────

add_action('rest_api_init', function () {

    // POST /openclaw/v1/orders/fulfill
    // Called by fleet/dispatcher when an order deliverable is ready.
    // Marks WC order as completed and stores deliverable URL.
    register_rest_route(OPENCLAW_BRIDGE_NAMESPACE, '/orders/fulfill', [
        'methods' => 'POST',
        'callback' => 'openclaw_fulfill_order',
        'permission_callback' => 'openclaw_hmac_permission',
    ]);

});

/**
 * POST /openclaw/v1/orders/fulfill
 * Marks a WooCommerce order as completed and attaches deliverable metadata.
 */
function openclaw_fulfill_order(WP_REST_Request $request): WP_REST_Response {
    $data = $request->get_json_params();

    $wc_order_id = $data['wcOrderId'] ?? null;
    $deliverable_url = $data['deliverableUrl'] ?? null;

    if (!$wc_order_id) {
        return new WP_REST_Response(['error' => 'Missing wcOrderId'], 400);
    }

    $order = wc_get_order($wc_order_id);
    if (!$order) {
        return new WP_REST_Response(['error' => 'WC order not found'], 404);
    }

    // Store deliverable URL as order meta
    if ($deliverable_url) {
        $order->update_meta_data('_openclaw_deliverable_url', sanitize_url($deliverable_url));
    }

    // Add order note
    $order->add_order_note(
        sprintf(
            'OpenClaw order fulfilled.%s',
            $deliverable_url ? " Deliverable: {$deliverable_url}" : ''
        )
    );

    // Mark as completed
    $order->set_status('completed', 'Fulfilled by OpenClaw fleet.');
    $order->save();

    return new WP_REST_Response(['ok' => true, 'wcOrderId' => $wc_order_id], 200);
}

// ─── WC PAYMENT COMPLETE → CONVEX WEBHOOK ────────────────────────────
// When a customer pays for an order, notify Convex to create the order
// record and generate an access token for the intake form.

// Convex site URL — set in wp-config.php OR as WordPress options:
// define('OPENCLAW_CONVEX_SITE_URL', 'https://valuable-partridge-851.convex.site');
// define('OPENCLAW_CONVEX_API_TOKEN', 'your-convex-api-token');
// Fallback: get_option('openclaw_convex_site_url') / get_option('openclaw_convex_api_token')

add_action('woocommerce_payment_complete', function ($order_id) {
    $convex_url = defined('OPENCLAW_CONVEX_SITE_URL') ? OPENCLAW_CONVEX_SITE_URL : get_option('openclaw_convex_site_url');
    $convex_token = defined('OPENCLAW_CONVEX_API_TOKEN') ? OPENCLAW_CONVEX_API_TOKEN : get_option('openclaw_convex_api_token');

    if (!$convex_url || !$convex_token) {
        error_log("[OpenClaw Bridge] CONVEX_SITE_URL or CONVEX_API_TOKEN not configured — skipping order webhook for #{$order_id}");
        return;
    }

    $order = wc_get_order($order_id);
    if (!$order) {
        error_log("[OpenClaw Bridge] Cannot load WC order #{$order_id}");
        return;
    }

    $customer_email = $order->get_billing_email();
    $customer_name = trim($order->get_billing_first_name() . ' ' . $order->get_billing_last_name());

    // Process each line item that has OpenClaw agent metadata
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        if (!$product) continue;

        $product_id = $product->get_id();
        // Check for OpenClaw agent mapping on this product
        $agent_id = get_post_meta($product_id, '_openclaw_agent_id', true);
        if (!$agent_id) {
            // Not an OpenClaw-fulfillable product — skip
            continue;
        }

        // Get parent product ID for variations
        $wc_product_id = $product->is_type('variation')
            ? $product->get_parent_id()
            : $product_id;
        $wc_variation_id = $product->is_type('variation')
            ? $product_id
            : null;

        $line_total = intval(round($item->get_total() * 100)); // Convert to cents

        $payload = [
            'wcOrderId' => intval($order_id),
            'wcProductId' => intval($wc_product_id),
            'customerEmail' => $customer_email,
            'customerName' => $customer_name,
            'totalAmount' => $line_total,
            'currency' => $order->get_currency(),
            'tenantId' => 'localcatalyst',
        ];

        if ($wc_variation_id) {
            $payload['wcVariationId'] = intval($wc_variation_id);
        }

        // POST to Convex /orders/webhook with Bearer token auth
        $response = wp_remote_post(rtrim($convex_url, '/') . '/orders/webhook', [
            'body' => json_encode($payload),
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $convex_token,
            ],
            'timeout' => 15,
        ]);

        if (is_wp_error($response)) {
            error_log("[OpenClaw Bridge] Convex webhook failed for order #{$order_id}, product #{$wc_product_id}: " . $response->get_error_message());
            $order->add_order_note("OpenClaw: Failed to create intake form — {$response->get_error_message()}");
            continue;
        }

        $resp_body = json_decode(wp_remote_retrieve_body($response), true);
        $resp_code = wp_remote_retrieve_response_code($response);

        if ($resp_code !== 200 || empty($resp_body['accessToken'])) {
            $err = $resp_body['error'] ?? "HTTP {$resp_code}";
            error_log("[OpenClaw Bridge] Convex webhook non-200 for order #{$order_id}: {$err}");
            $order->add_order_note("OpenClaw: Webhook error — {$err}");
            continue;
        }

        // Store the access token for redirect on thank-you page
        $order->update_meta_data('_openclaw_access_token', $resp_body['accessToken']);
        $order->update_meta_data('_openclaw_product_slug', $resp_body['productSlug'] ?? '');
        $order->update_meta_data('_openclaw_order_id', $resp_body['orderId'] ?? '');
        $order->save();

        $order->add_order_note(
            sprintf('OpenClaw: Intake form ready for %s (product %d).', $resp_body['productSlug'] ?? 'unknown', $wc_product_id)
        );
    }
}, 10, 1);

// ─── WC THANK-YOU PAGE REDIRECT ─────────────────────────────────────
// After payment, redirect customer to the intake form in the dashboard.

add_action('woocommerce_thankyou', function ($order_id) {
    $order = wc_get_order($order_id);
    if (!$order) return;

    $access_token = $order->get_meta('_openclaw_access_token');
    if (!$access_token || $access_token === 'EXISTING_ORDER') return;

    $product_slug = $order->get_meta('_openclaw_product_slug');

    // Dashboard intake form URL — wp-config.php constant or WP option
    $dashboard_url = defined('OPENCLAW_DASHBOARD_URL')
        ? OPENCLAW_DASHBOARD_URL
        : (get_option('openclaw_dashboard_url') ?: 'https://dashboard.localcatalyst.com');

    $intake_url = rtrim($dashboard_url, '/') . "/intake/{$order_id}?token=" . urlencode($access_token);

    // Output a redirect notice + auto-redirect after 5 seconds
    echo '<div class="openclaw-intake-notice" style="margin: 20px 0; padding: 20px; background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; text-align: center;">';
    echo '<h3 style="margin: 0 0 10px;">Almost Done! Complete Your Intake Form</h3>';
    echo '<p>To get started on your order, please fill out a quick intake form with your business details.</p>';
    echo '<a href="' . esc_url($intake_url) . '" style="display: inline-block; padding: 12px 24px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Complete Intake Form &rarr;</a>';
    echo '<p style="margin-top: 10px; font-size: 0.85em; color: #64748b;">You\'ll be redirected automatically in 5 seconds...</p>';
    echo '</div>';
    echo '<script>setTimeout(function(){ window.location.href = "' . esc_js($intake_url) . '"; }, 5000);</script>';
}, 5);

// ─── SUBSCRIPTION CHANGE NOTIFICATIONS ───────────────────────────────
// When a subscription status changes, notify the fleet dispatcher so it
// can update customer access immediately.

add_action('woocommerce_subscription_status_updated', function ($subscription, $new_status, $old_status) {
    $fleet_webhook_url = defined('OPENCLAW_FLEET_WEBHOOK_URL')
        ? OPENCLAW_FLEET_WEBHOOK_URL
        : null;

    if (!$fleet_webhook_url) {
        return; // Fleet webhook not configured
    }

    $customer = $subscription->get_user();
    $items = $subscription->get_items();
    $product = null;
    foreach ($items as $item) {
        $product = $item->get_product();
        break;
    }

    $tier = $product ? get_post_meta($product->get_id(), '_openclaw_tier', true) : 'unknown';

    $body = json_encode([
        'event' => 'subscription.status_changed',
        'customer_email' => $customer ? $customer->user_email : null,
        'customer_id' => $customer ? $customer->ID : null,
        'subscription_id' => $subscription->get_id(),
        'old_status' => $old_status,
        'new_status' => $new_status,
        'tier' => $tier,
        'timestamp' => time(),
    ]);

    // Sign the outbound webhook with HMAC
    $timestamp = time();
    $body_hash = hash('sha256', $body);
    $payload = "{$timestamp}:POST:/openclaw/subscription-event:{$body_hash}";
    $signature = hash_hmac('sha256', $payload, OPENCLAW_BRIDGE_SECRET);

    // Fire-and-forget POST to fleet
    wp_remote_post($fleet_webhook_url, [
        'body' => $body,
        'headers' => [
            'Content-Type' => 'application/json',
            'X-OpenClaw-Timestamp' => $timestamp,
            'X-OpenClaw-Signature' => $signature,
        ],
        'timeout' => 5,
        'blocking' => false, // Don't wait for response
    ]);
}, 10, 3);
