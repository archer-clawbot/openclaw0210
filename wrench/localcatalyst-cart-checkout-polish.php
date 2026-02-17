<?php
/**
 * Plugin Name: LocalCatalyst Cart & Checkout Polish
 * Plugin URI: https://localcatalyst.ai/
 * Description: Styling improvements for cart and checkout pages
 * Version: 1.0.0
 * Author: Wrench Agent
 * Author URI: https://localcatalyst.ai/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * This plugin adds custom CSS to polish the cart and checkout pages
 * with improved visual design, branding, and user experience.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Add custom CSS for cart and checkout page improvements
 */
function localcatalyst_enqueue_cart_checkout_styles() {
    wp_enqueue_style(
        'localcatalyst-cart-checkout-polish',
        plugin_dir_url( __FILE__ ) . 'localcatalyst-cart-checkout-improvements.css',
        array(),
        '1.0.0',
        'all'
    );
}

// Enqueue styles on cart and checkout pages
add_action( 'wp_enqueue_scripts', 'localcatalyst_enqueue_cart_checkout_styles' );

/**
 * Inline CSS fallback if file not found
 * This ensures styles are applied even if the CSS file is missing
 */
function localcatalyst_inline_cart_checkout_styles() {
    if ( is_cart() || is_checkout() ) {
        wp_add_inline_style(
            'woocommerce',
            localcatalyst_get_cart_checkout_css()
        );
    }
}

add_action( 'wp_enqueue_scripts', 'localcatalyst_inline_cart_checkout_styles' );

/**
 * Get the cart and checkout CSS
 * 
 * @return string The CSS code
 */
function localcatalyst_get_cart_checkout_css() {
    return <<<'CSS'
/* ==========================================================================
   GENERAL IMPROVEMENTS
   ========================================================================== */

.woocommerce .entry-header {
  margin-bottom: 2rem;
}

.woocommerce h1,
.woocommerce h2 {
  color: #0f172a;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

/* ==========================================================================
   CART PAGE IMPROVEMENTS
   ========================================================================== */

.woocommerce .shop_table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.woocommerce .shop_table thead {
  background-color: #f0f9ff;
  border-bottom: 2px solid #10b981;
}

.woocommerce .shop_table thead th {
  padding: 1.25rem;
  text-align: left;
  font-weight: 600;
  color: #0f172a;
  border-bottom: 2px solid #10b981;
}

.woocommerce .shop_table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.woocommerce .shop_table tbody tr:hover {
  background-color: #f9fafb;
}

.woocommerce .shop_table tbody td {
  padding: 1.25rem;
  vertical-align: middle;
  color: #1e293b;
}

.woocommerce .shop_table .product-name a {
  color: #10b981;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.woocommerce .shop_table .product-name a:hover {
  color: #059669;
  text-decoration: underline;
}

.woocommerce .quantity input {
  width: 60px;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.95rem;
}

.woocommerce .quantity input:focus {
  border-color: #10b981;
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.woocommerce .shop_table .product-remove a.remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #fee2e2;
  color: #dc2626;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: 600;
}

.woocommerce .shop_table .product-remove a.remove:hover {
  background-color: #fecaca;
  color: #991b1b;
}

/* Cart totals section */
.woocommerce .cart-collaterals {
  margin-top: 2rem;
}

.woocommerce .cart-collaterals h2 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
}

.woocommerce .cart_totals,
.woocommerce .shipping-calculator-form {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.75rem;
  margin-bottom: 1.5rem;
}

.woocommerce .cart_totals table {
  width: 100%;
  margin-bottom: 1.5rem;
}

.woocommerce .cart_totals table tr {
  border-bottom: 1px solid #d1d5db;
}

.woocommerce .cart_totals table tr:last-child {
  border-bottom: 2px solid #10b981;
  font-weight: 700;
  font-size: 1.1rem;
}

.woocommerce .cart_totals table th,
.woocommerce .cart_totals table td {
  padding: 0.75rem 0;
  text-align: right;
  color: #1e293b;
}

.woocommerce .cart_totals table th {
  text-align: left;
  color: #0f172a;
  font-weight: 600;
}

.woocommerce .cart_totals table td bdi {
  color: #0f172a;
  font-weight: 600;
}

.woocommerce .cart_totals table tr:last-child td bdi {
  font-size: 1.25rem;
  color: #10b981;
}

/* Coupon section */
.woocommerce .coupon {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-end;
}

.woocommerce .coupon input[type="text"] {
  flex: 1;
  min-height: 44px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
}

.woocommerce .coupon input[type="text"]:focus {
  border-color: #10b981;
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.woocommerce .coupon button {
  min-height: 44px;
  padding: 0.75rem 1.5rem;
}

/* Button styling improvements */
.woocommerce .button,
.woocommerce button,
a.button,
.wp-block-button__link {
  display: inline-block;
  min-height: 44px;
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.woocommerce .button:hover,
.woocommerce button:hover,
a.button:hover,
.wp-block-button__link:hover {
  background-color: #059669;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.woocommerce .button:active,
.woocommerce button:active {
  transform: translateY(0);
}

.woocommerce a.checkout-button {
  display: block;
  width: 100%;
  text-align: center;
  background-color: #10b981;
  color: #ffffff;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
}

.woocommerce a.checkout-button:hover {
  background-color: #059669;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
}

/* ==========================================================================
   CHECKOUT PAGE IMPROVEMENTS
   ========================================================================== */

.woocommerce-checkout .woocommerce-form-row {
  margin-bottom: 1.25rem;
}

.woocommerce-checkout .woocommerce-form-row input[type="text"],
.woocommerce-checkout .woocommerce-form-row input[type="email"],
.woocommerce-checkout .woocommerce-form-row input[type="tel"],
.woocommerce-checkout .woocommerce-form-row input[type="password"],
.woocommerce-checkout .woocommerce-form-row textarea,
.woocommerce-checkout .woocommerce-form-row select {
  width: 100%;
  min-height: 44px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: #ffffff;
  color: #1e293b;
  transition: all 0.2s ease;
}

.woocommerce-checkout .woocommerce-form-row input[type="text"]:focus,
.woocommerce-checkout .woocommerce-form-row input[type="email"]:focus,
.woocommerce-checkout .woocommerce-form-row input[type="tel"]:focus,
.woocommerce-checkout .woocommerce-form-row input[type="password"]:focus,
.woocommerce-checkout .woocommerce-form-row textarea:focus,
.woocommerce-checkout .woocommerce-form-row select:focus {
  border-color: #10b981;
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  background-color: #f0fdf4;
}

.woocommerce-checkout .woocommerce-form-row label {
  display: block;
  margin-bottom: 0.5rem;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.95rem;
}

.woocommerce-checkout .woocommerce-form-row .required {
  color: #dc2626;
  font-weight: 700;
  margin-left: 0.25rem;
}

.woocommerce-checkout h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #10b981;
  color: #0f172a;
}

.woocommerce-checkout .order-review-heading {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
  font-weight: 700;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table {
  background-color: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table thead {
  background-color: #f0f9ff;
  border-bottom: 2px solid #10b981;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table thead th {
  padding: 1rem;
  text-align: left;
  color: #0f172a;
  font-weight: 700;
  border-bottom: 2px solid #10b981;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table tbody tr:last-child {
  border-bottom: 2px solid #10b981;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table tbody td {
  padding: 1rem;
  color: #1e293b;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table tbody tr:last-child td {
  font-weight: 700;
  font-size: 1rem;
  color: #0f172a;
}

.woocommerce-checkout .woocommerce-checkout-review-order-table tbody tr:last-child td bdi {
  color: #10b981;
  font-size: 1.1rem;
}

.woocommerce-checkout #payment {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.75rem;
  margin-bottom: 1.5rem;
}

.woocommerce-checkout #payment h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.woocommerce-checkout .payment_methods {
  list-style: none;
  margin: 0;
  padding: 0;
}

.woocommerce-checkout .payment_methods li {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.woocommerce-checkout .payment_methods li:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.woocommerce-checkout .payment_methods label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  color: #0f172a;
  font-weight: 600;
}

.woocommerce-checkout .payment_methods input[type="radio"] {
  margin-right: 0.75rem;
  cursor: pointer;
  width: 20px;
  height: 20px;
  accent-color: #10b981;
}

.woocommerce-checkout .place-order button {
  width: 100%;
  min-height: 48px;
  background-color: #10b981;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.woocommerce-checkout .place-order button:hover {
  background-color: #059669;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
  transform: translateY(-2px);
}

.woocommerce-checkout .place-order button:active {
  transform: translateY(0);
}

.woocommerce-checkout .woocommerce-terms-and-conditions-checkbox-text {
  color: #575760;
  font-size: 0.9rem;
}

.woocommerce-checkout .woocommerce-terms-and-conditions-checkbox-text a {
  color: #10b981;
  text-decoration: none;
}

.woocommerce-checkout .woocommerce-terms-and-conditions-checkbox-text a:hover {
  color: #059669;
  text-decoration: underline;
}

.return-to-shop a {
  display: inline-flex;
  align-items: center;
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.return-to-shop a:before {
  content: "← ";
  margin-right: 0.5rem;
}

.return-to-shop a:hover {
  color: #059669;
}

/* ==========================================================================
   ACCESSIBILITY & ERROR MESSAGES
   ========================================================================== */

.woocommerce-error,
.woocommerce-message,
.woocommerce-info {
  background-color: #fef2f2;
  border-left: 4px solid #dc2626;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  color: #7f1d1d;
}

.woocommerce-message {
  background-color: #f0fdf4;
  border-left-color: #10b981;
  color: #166534;
}

.woocommerce-info {
  background-color: #eff6ff;
  border-left-color: #0284c7;
  color: #0c2d6b;
}

/* ==========================================================================
   MOBILE RESPONSIVE
   ========================================================================== */

@media (max-width: 768px) {
  .woocommerce .shop_table thead {
    display: none;
  }

  .woocommerce .shop_table tbody tr {
    display: block;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 1rem;
    background-color: #ffffff;
  }

  .woocommerce .shop_table tbody td {
    display: block;
    text-align: right;
    padding-left: 50%;
    padding-right: 0;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
  }

  .woocommerce .shop_table tbody td:last-child {
    border-bottom: none;
  }

  .woocommerce a.checkout-button {
    padding: 0.875rem;
    font-size: 0.95rem;
  }

  .woocommerce .coupon {
    flex-direction: column;
  }

  .woocommerce .coupon input[type="text"],
  .woocommerce .coupon button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  button,
  .woocommerce button,
  a.button,
  .wp-block-button__link {
    min-height: 48px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}
CSS;
}
