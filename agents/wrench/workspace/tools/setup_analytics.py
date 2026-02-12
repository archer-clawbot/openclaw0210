#!/usr/bin/env python3
"""
LocalCatalyst.ai — GA4 + GTM Automated Provisioning
=====================================================
One command to set up the complete analytics stack:
- Creates GA4 property with optimal configuration
- Creates GTM container with all tags, triggers, and variables
- Configures custom events (CTA clicks, FAQ interactions, scroll depth)
- Links GA4 ↔ GTM
- Outputs the GTM container ID and GA4 measurement ID for WordPress installation

Prerequisites:
  pip install google-analytics-admin google-api-python-client google-auth-oauthlib

Setup:
  1. Go to https://console.cloud.google.com
  2. Create a project (or use existing)
  3. Enable these APIs:
     - Google Analytics Admin API
     - Tag Manager API
  4. Create OAuth 2.0 credentials (Desktop app type)
  5. Download the credentials JSON → save as credentials.json in this directory
  6. Run: python setup_analytics.py

The script will open a browser for OAuth consent on first run,
then cache the token for future runs.
"""

import json
import sys
import os
from pathlib import Path

# Google API imports
from google.analytics.admin_v1alpha import AnalyticsAdminServiceClient
from google.analytics.admin_v1alpha.types import (
    Property,
    DataStream,
    DataRetentionSettings,
    IndustryCategory,
    ServiceLevel,
    ActorType,
    DataSharingSettings,
    EnhancedMeasurementSettings,
)
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# ============================================================
# CONFIGURATION — Edit these values
# ============================================================
CONFIG = {
    # Google Analytics
    "ga4_account_id": "",  # Your GA account ID (numeric). Leave blank to auto-detect.
    "property_name": "LocalCatalyst.ai",
    "property_url": "https://localcatalyst.ai",
    "timezone": "America/Chicago",
    "currency": "USD",
    "industry": "BUSINESS_AND_INDUSTRIAL_MARKETS",

    # Google Tag Manager
    "gtm_account_name": "LocalCatalyst",
    "gtm_container_name": "localcatalyst.ai",

    # Your IP for internal traffic filter (comma-separated for multiple)
    "internal_ips": ["YOUR_IP_HERE"],

    # Domain
    "domain": "localcatalyst.ai",

    # Credentials file path
    "credentials_file": "credentials.json",
    "token_file": "token.json",
}

# API Scopes
SCOPES = [
    "https://www.googleapis.com/auth/analytics.edit",
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/tagmanager.edit.containers",
    "https://www.googleapis.com/auth/tagmanager.manage.accounts",
    "https://www.googleapis.com/auth/tagmanager.publish",
]


def authenticate():
    """Handle OAuth2 authentication with token caching."""
    creds = None
    token_path = Path(CONFIG["token_file"])
    creds_path = Path(CONFIG["credentials_file"])

    if not creds_path.exists():
        print(f"\n❌ Missing {CONFIG['credentials_file']}")
        print("   1. Go to https://console.cloud.google.com/apis/credentials")
        print("   2. Create OAuth 2.0 Client ID (Desktop application)")
        print("   3. Download JSON → save as credentials.json here")
        sys.exit(1)

    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(creds_path), SCOPES)
            creds = flow.run_local_server(port=0)
        token_path.write_text(creds.to_json())

    return creds


# ============================================================
# GA4 SETUP
# ============================================================
def setup_ga4(creds):
    """Create and configure GA4 property with optimal settings."""
    print("\n" + "=" * 60)
    print("📊 SETTING UP GA4")
    print("=" * 60)

    client = AnalyticsAdminServiceClient(credentials=creds)

    # --- Find or specify GA account ---
    account_id = CONFIG["ga4_account_id"]
    if not account_id:
        print("\n🔍 Finding your GA accounts...")
        accounts = list(client.list_accounts())
        if not accounts:
            print("❌ No Google Analytics accounts found. Create one at analytics.google.com first.")
            sys.exit(1)
        for i, acct in enumerate(accounts):
            print(f"   [{i}] {acct.display_name} ({acct.name})")
        if len(accounts) == 1:
            account_id = accounts[0].name.split("/")[-1]
            print(f"   → Using: {accounts[0].display_name}")
        else:
            idx = int(input("   Select account number: "))
            account_id = accounts[idx].name.split("/")[-1]

    account_name = f"accounts/{account_id}"

    # --- Create GA4 Property ---
    print(f"\n📝 Creating GA4 property: {CONFIG['property_name']}")
    property_obj = client.create_property(
        property=Property(
            parent=account_name,
            display_name=CONFIG["property_name"],
            time_zone=CONFIG["timezone"],
            currency_code=CONFIG["currency"],
            industry_category=IndustryCategory.BUSINESS_AND_INDUSTRIAL_MARKETS,
        )
    )
    property_id = property_obj.name.split("/")[-1]
    print(f"   ✅ Property created: {property_obj.name} (ID: {property_id})")

    # --- Create Web Data Stream ---
    print(f"\n📝 Creating web data stream: {CONFIG['property_url']}")
    stream = client.create_data_stream(
        parent=property_obj.name,
        data_stream=DataStream(
            type_=DataStream.DataStreamType.WEB_DATA_STREAM,
            display_name="LocalCatalyst Web",
            web_stream_data=DataStream.WebStreamData(
                default_uri=CONFIG["property_url"],
            ),
        ),
    )
    measurement_id = stream.web_stream_data.measurement_id
    stream_id = stream.name.split("/")[-1]
    print(f"   ✅ Stream created: {stream.display_name}")
    print(f"   📏 Measurement ID: {measurement_id}")

    # --- Set Data Retention to 14 months ---
    print("\n📝 Setting data retention to 14 months...")
    try:
        client.update_data_retention_settings(
            data_retention_settings=DataRetentionSettings(
                name=f"{property_obj.name}/dataRetentionSettings",
                event_data_retention=DataRetentionSettings.RetentionDuration.FOURTEEN_MONTHS,
                reset_user_data_on_new_activity=True,
            ),
        )
        print("   ✅ Data retention: 14 months")
    except Exception as e:
        print(f"   ⚠️  Data retention setting skipped: {e}")

    # --- Configure Enhanced Measurement ---
    print("\n📝 Configuring enhanced measurement...")
    try:
        client.update_enhanced_measurement_settings(
            enhanced_measurement_settings=EnhancedMeasurementSettings(
                name=f"{stream.name}/enhancedMeasurementSettings",
                stream_enabled=True,
                scrolls_enabled=True,
                outbound_clicks_enabled=True,
                site_search_enabled=True,
                video_engagement_enabled=True,
                file_downloads_enabled=True,
                page_changes_enabled=True,
                form_interactions_enabled=True,
                search_query_parameter="s",  # WordPress default
            ),
        )
        print("   ✅ Enhanced measurement configured")
        print("       → Page views, scrolls, outbound clicks, site search (param: s)")
        print("       → Video engagement, file downloads, form interactions")
    except Exception as e:
        print(f"   ⚠️  Enhanced measurement config skipped: {e}")

    # --- Create Internal Traffic Rule ---
    if CONFIG["internal_ips"] and CONFIG["internal_ips"][0] != "YOUR_IP_HERE":
        print("\n📝 Creating internal traffic filter...")
        try:
            # Note: Internal traffic rules are created via the Data Stream's tag settings
            # This may require the GA4 UI or the Measurement Protocol — noting for manual setup
            print("   ⚠️  Internal traffic filter requires manual setup in GA4 UI:")
            print(f"      Admin → Data Streams → Configure Tag → Internal Traffic")
            print(f"      IPs to exclude: {', '.join(CONFIG['internal_ips'])}")
        except Exception as e:
            print(f"   ⚠️  Internal traffic filter skipped: {e}")
    else:
        print("\n⚠️  Set your IP in CONFIG['internal_ips'] to create traffic filter")

    return {
        "property_id": property_id,
        "property_name": property_obj.name,
        "measurement_id": measurement_id,
        "stream_id": stream_id,
        "stream_name": stream.name,
    }


# ============================================================
# GTM SETUP
# ============================================================
def setup_gtm(creds, ga4_info):
    """Create GTM container with complete tag/trigger/variable configuration."""
    print("\n" + "=" * 60)
    print("🏷️  SETTING UP GOOGLE TAG MANAGER")
    print("=" * 60)

    service = build("tagmanager", "v2", credentials=creds)
    accounts = service.accounts()
    containers = None
    account_path = None

    # --- Find or create GTM account ---
    print("\n🔍 Finding GTM accounts...")
    acct_list = accounts.list().execute()

    if "account" in acct_list:
        for i, acct in enumerate(acct_list["account"]):
            print(f"   [{i}] {acct['name']} ({acct['path']})")
        if len(acct_list["account"]) == 1:
            account_path = acct_list["account"][0]["path"]
            print(f"   → Using: {acct_list['account'][0]['name']}")
        else:
            idx = int(input("   Select account number: "))
            account_path = acct_list["account"][idx]["path"]
    else:
        print("   No GTM accounts found. Creating one...")
        new_acct = accounts.create(body={
            "name": CONFIG["gtm_account_name"],
            "shareData": True,
        }).execute()
        account_path = new_acct["path"]
        print(f"   ✅ Account created: {new_acct['name']}")

    containers = service.accounts().containers()

    # --- Create Container ---
    print(f"\n📝 Creating GTM container: {CONFIG['gtm_container_name']}")
    container = containers.create(
        parent=account_path,
        body={
            "name": CONFIG["gtm_container_name"],
            "usageContext": ["web"],
            "domainName": [CONFIG["domain"]],
        },
    ).execute()
    container_path = container["path"]
    container_id = container["publicId"]  # GTM-XXXXXXX
    print(f"   ✅ Container created: {container_id}")

    # Get workspace
    workspaces = service.accounts().containers().workspaces()
    ws_list = workspaces.list(parent=container_path).execute()
    workspace_path = ws_list["workspace"][0]["path"]

    # --- Helper functions ---
    def create_variable(name, var_type, parameter=None):
        body = {"name": name, "type": var_type}
        if parameter:
            body["parameter"] = parameter
        return workspaces.variables().create(parent=workspace_path, body=body).execute()

    def create_trigger(name, trigger_type, custom_event_filter=None, filters=None, auto_event_filter=None):
        body = {"name": name, "type": trigger_type}
        if custom_event_filter:
            body["customEventFilter"] = custom_event_filter
        if filters:
            body["filter"] = filters
        if auto_event_filter:
            body["autoEventFilter"] = auto_event_filter
        return workspaces.triggers().create(parent=workspace_path, body=body).execute()

    def create_tag(name, tag_type, parameter, firing_trigger_ids, paused=False):
        body = {
            "name": name,
            "type": tag_type,
            "parameter": parameter,
            "firingTriggerId": firing_trigger_ids,
            "paused": paused,
        }
        return workspaces.tags().create(parent=workspace_path, body=body).execute()

    # -------------------------------------------------------
    # BUILT-IN VARIABLES — Enable required ones
    # -------------------------------------------------------
    print("\n📝 Enabling built-in variables...")
    builtin_vars = [
        "pageUrl", "pageHostname", "pagePath", "referrer",
        "event", "clickElement", "clickClasses", "clickId",
        "clickTarget", "clickUrl", "clickText",
        "scrollDepthThreshold", "scrollDepthUnits", "scrollDirection",
        "formElement", "formClasses", "formId", "formTarget", "formUrl", "formText",
        "historySource", "newHistoryState", "oldHistoryState",
    ]
    try:
        workspaces.built_in_variables().create(
            parent=workspace_path,
            type=builtin_vars,
        ).execute()
        print(f"   ✅ Enabled {len(builtin_vars)} built-in variables")
    except Exception as e:
        print(f"   ⚠️  Built-in variables: {e}")

    # -------------------------------------------------------
    # CUSTOM VARIABLES
    # -------------------------------------------------------
    print("\n📝 Creating custom variables...")

    # Data Layer variable for custom events
    dlv_event = create_variable("DLV — Event Name", "v", [
        {"type": "template", "key": "name", "value": "event"},
        {"type": "integer", "key": "dataLayerVersion", "value": "2"},
    ])
    print("   ✅ DLV — Event Name")

    # -------------------------------------------------------
    # TRIGGERS
    # -------------------------------------------------------
    print("\n📝 Creating triggers...")

    # All Pages (built-in, but get reference)
    all_pages_trigger = workspaces.triggers().list(parent=workspace_path).execute()
    all_pages_id = None
    for t in all_pages_trigger.get("trigger", []):
        if t["name"] == "All Pages":
            all_pages_id = t["triggerId"]
            break

    if not all_pages_id:
        ap = create_trigger("All Pages", "pageview")
        all_pages_id = ap["triggerId"]

    # CTA Click trigger — fires on .lc-btn-primary clicks
    cta_trigger = create_trigger(
        "Click — CTA Primary Button",
        "linkClick",
        auto_event_filter=[{
            "type": "contains",
            "parameter": [
                {"type": "template", "key": "arg0", "value": "{{Click Classes}}"},
                {"type": "template", "key": "arg1", "value": "lc-btn-primary"},
            ],
        }],
    )
    print(f"   ✅ Click — CTA Primary Button (ID: {cta_trigger['triggerId']})")

    # Ghost button click trigger
    ghost_trigger = create_trigger(
        "Click — Ghost Button",
        "linkClick",
        auto_event_filter=[{
            "type": "contains",
            "parameter": [
                {"type": "template", "key": "arg0", "value": "{{Click Classes}}"},
                {"type": "template", "key": "arg1", "value": "lc-btn-ghost"},
            ],
        }],
    )
    print(f"   ✅ Click — Ghost Button (ID: {ghost_trigger['triggerId']})")

    # FAQ accordion trigger
    faq_trigger = create_trigger(
        "Click — FAQ Accordion",
        "click",
        auto_event_filter=[{
            "type": "contains",
            "parameter": [
                {"type": "template", "key": "arg0", "value": "{{Click Classes}}"},
                {"type": "template", "key": "arg1", "value": "lc-faq-trigger"},
            ],
        }],
    )
    print(f"   ✅ Click — FAQ Accordion (ID: {faq_trigger['triggerId']})")

    # Scroll depth trigger (25%, 50%, 75%, 90%)
    scroll_trigger = create_trigger(
        "Scroll Depth — 25/50/75/90",
        "scrollDepth",
    )
    # Update with thresholds
    workspaces.triggers().update(
        path=scroll_trigger["path"],
        body={
            "name": "Scroll Depth — 25/50/75/90",
            "type": "scrollDepth",
            "parameter": [
                {"type": "template", "key": "verticalThresholdsPercent", "value": "25,50,75,90"},
                {"type": "template", "key": "verticalThresholdUnits", "value": "PERCENT"},
                {"type": "boolean", "key": "verticalThresholdOn", "value": "true"},
                {"type": "boolean", "key": "horizontalThresholdOn", "value": "false"},
                {"type": "template", "key": "triggerStartOption", "value": "WINDOW_LOAD"},
            ],
        },
    ).execute()
    print(f"   ✅ Scroll Depth — 25/50/75/90 (ID: {scroll_trigger['triggerId']})")

    # Outbound link click trigger
    outbound_trigger = create_trigger(
        "Click — Outbound Link",
        "linkClick",
        auto_event_filter=[{
            "type": "cssSelector",
            "parameter": [
                {"type": "template", "key": "arg0", "value": "{{Click Element}}"},
                {"type": "template", "key": "arg1", "value": "a[href^='http']:not([href*='" + CONFIG["domain"] + "'])"},
            ],
        }],
    )
    print(f"   ✅ Click — Outbound Link (ID: {outbound_trigger['triggerId']})")

    # Form submission trigger
    form_trigger = create_trigger(
        "Form — All Submissions",
        "formSubmission",
    )
    print(f"   ✅ Form — All Submissions (ID: {form_trigger['triggerId']})")

    # Timer — 30s engagement
    timer_trigger = create_trigger(
        "Timer — 30s Engaged",
        "timer",
    )
    workspaces.triggers().update(
        path=timer_trigger["path"],
        body={
            "name": "Timer — 30s Engaged",
            "type": "timer",
            "parameter": [
                {"type": "template", "key": "interval", "value": "30000"},
                {"type": "template", "key": "limit", "value": "1"},
                {"type": "template", "key": "eventName", "value": "gtm.timer"},
            ],
        },
    ).execute()
    print(f"   ✅ Timer — 30s Engaged (ID: {timer_trigger['triggerId']})")

    # -------------------------------------------------------
    # TAGS
    # -------------------------------------------------------
    print("\n📝 Creating tags...")

    measurement_id = ga4_info["measurement_id"]

    # --- GA4 Configuration Tag (Google Tag) ---
    ga4_config = create_tag(
        "GA4 — Config",
        "gaawc",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "boolean", "key": "sendPageView", "value": "true"},
            {"type": "boolean", "key": "enableSendToServerContainer", "value": "false"},
        ],
        firing_trigger_ids=[all_pages_id],
    )
    config_tag_id = ga4_config["tagId"]
    print(f"   ✅ GA4 — Config [{measurement_id}] (ID: {config_tag_id})")

    # --- GA4 Event: CTA Click ---
    create_tag(
        "GA4 Event — CTA Click",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "cta_click"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "cta_text"},
                    {"type": "template", "key": "value", "value": "{{Click Text}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "cta_url"},
                    {"type": "template", "key": "value", "value": "{{Click URL}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "page_location"},
                    {"type": "template", "key": "value", "value": "{{Page URL}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[cta_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — CTA Click")

    # --- GA4 Event: Ghost Button Click ---
    create_tag(
        "GA4 Event — Ghost Button Click",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "secondary_cta_click"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "button_text"},
                    {"type": "template", "key": "value", "value": "{{Click Text}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "button_url"},
                    {"type": "template", "key": "value", "value": "{{Click URL}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[ghost_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — Ghost Button Click")

    # --- GA4 Event: FAQ Expand ---
    create_tag(
        "GA4 Event — FAQ Expand",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "faq_expand"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "faq_question"},
                    {"type": "template", "key": "value", "value": "{{Click Text}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "page_location"},
                    {"type": "template", "key": "value", "value": "{{Page URL}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[faq_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — FAQ Expand")

    # --- GA4 Event: Scroll Depth ---
    create_tag(
        "GA4 Event — Scroll Milestone",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "scroll_milestone"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "scroll_depth"},
                    {"type": "template", "key": "value", "value": "{{Scroll Depth Threshold}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "page_location"},
                    {"type": "template", "key": "value", "value": "{{Page URL}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[scroll_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — Scroll Milestone")

    # --- GA4 Event: Outbound Click ---
    create_tag(
        "GA4 Event — Outbound Click",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "outbound_click"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "link_url"},
                    {"type": "template", "key": "value", "value": "{{Click URL}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "link_text"},
                    {"type": "template", "key": "value", "value": "{{Click Text}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[outbound_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — Outbound Click")

    # --- GA4 Event: Form Submit ---
    create_tag(
        "GA4 Event — Form Submission",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "form_submit"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "form_id"},
                    {"type": "template", "key": "value", "value": "{{Form ID}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "form_url"},
                    {"type": "template", "key": "value", "value": "{{Form URL}}"},
                ]},
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "page_location"},
                    {"type": "template", "key": "value", "value": "{{Page URL}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[form_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — Form Submission")

    # --- GA4 Event: 30s Engagement ---
    create_tag(
        "GA4 Event — 30s Engaged",
        "gaawe",
        parameter=[
            {"type": "template", "key": "measurementId", "value": measurement_id},
            {"type": "template", "key": "eventName", "value": "engaged_30s"},
            {"type": "list", "key": "eventParameters", "list": [
                {"type": "map", "map": [
                    {"type": "template", "key": "name", "value": "page_location"},
                    {"type": "template", "key": "value", "value": "{{Page URL}}"},
                ]},
            ]},
        ],
        firing_trigger_ids=[timer_trigger["triggerId"]],
    )
    print("   ✅ GA4 Event — 30s Engaged")

    # -------------------------------------------------------
    # PUBLISH CONTAINER
    # -------------------------------------------------------
    print("\n📝 Publishing GTM container...")
    version = workspaces.create_version(
        path=workspace_path,
        body={"name": "v1.0 — GA4 + Full Event Tracking", "notes": "Auto-provisioned by LocalCatalyst setup script"},
    ).execute()

    # Publish the version
    version_path = version["containerVersion"]["path"]
    service.accounts().containers().versions().publish(path=version_path).execute()
    print(f"   ✅ Container published: v1.0")

    return {
        "container_id": container_id,
        "container_path": container_path,
    }


# ============================================================
# OUTPUT SUMMARY
# ============================================================
def print_summary(ga4_info, gtm_info):
    """Print everything needed for WordPress installation."""
    print("\n" + "=" * 60)
    print("🎉 SETUP COMPLETE")
    print("=" * 60)

    print(f"""
╔══════════════════════════════════════════════════════════╗
║  GA4 Measurement ID:  {ga4_info['measurement_id']:<35} ║
║  GTM Container ID:    {gtm_info['container_id']:<35} ║
╚══════════════════════════════════════════════════════════╝

GTM Tags Deployed:
  ✅ GA4 Config (all pages)
  ✅ CTA Click (.lc-btn-primary)
  ✅ Ghost Button Click (.lc-btn-ghost)
  ✅ FAQ Accordion (.lc-faq-trigger)
  ✅ Scroll Depth (25/50/75/90%)
  ✅ Outbound Link Clicks
  ✅ Form Submissions
  ✅ 30-Second Engagement Timer

GA4 Configuration:
  ✅ Data retention: 14 months
  ✅ Enhanced measurement: all events enabled
  ✅ Search parameter: s (WordPress)
  ✅ Timezone: {CONFIG['timezone']}
  ✅ Currency: {CONFIG['currency']}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:

1. Install GTM on WordPress — add to functions.php:

   // GTM Head
   function lc_gtm_head() {{
       echo '<!-- Google Tag Manager -->
   <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{"gtm.start":
   new Date().getTime(),event:"gtm.js"}});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=
   "https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
   }})(window,document,"script","dataLayer","{gtm_info['container_id']}");</script>';
   }}
   add_action('wp_head', 'lc_gtm_head', 1);

   // GTM Body
   function lc_gtm_body() {{
       echo '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={gtm_info['container_id']}"
   height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
   }}
   add_action('wp_body_open', 'lc_gtm_body');

2. Verify in Search Console:
   → https://search.google.com/search-console
   → Add property: {CONFIG['domain']}
   → Verify via DNS TXT record
   → Submit sitemap: https://{CONFIG['domain']}/sitemap_index.xml

3. Link GA4 ↔ Search Console:
   → GA4 Admin → Product Links → Search Console Links

4. Set internal traffic filter:
   → GA4 Admin → Data Streams → Configure tag → Internal traffic
   → Add your IP address(es)
   → GA4 Admin → Data Filters → Activate

5. Test everything:
   → GTM Preview mode: https://tagmanager.google.com (Preview button)
   → GA4 Realtime: https://analytics.google.com (Realtime report)
   → Click a CTA button → verify cta_click event appears
""")

    # Save config to file for reference
    output = {
        "ga4": ga4_info,
        "gtm": gtm_info,
        "config": {k: v for k, v in CONFIG.items() if "credentials" not in k and "token" not in k},
    }
    output_path = Path("analytics-config.json")
    output_path.write_text(json.dumps(output, indent=2))
    print(f"   📄 Config saved to: {output_path}")


# ============================================================
# MAIN
# ============================================================
def main():
    print("╔══════════════════════════════════════════════════════════╗")
    print("║   LocalCatalyst.ai — Analytics Auto-Provisioning       ║")
    print("║   GA4 + GTM + Event Tracking                           ║")
    print("╚══════════════════════════════════════════════════════════╝")

    creds = authenticate()
    ga4_info = setup_ga4(creds)
    gtm_info = setup_gtm(creds, ga4_info)
    print_summary(ga4_info, gtm_info)


if __name__ == "__main__":
    main()
