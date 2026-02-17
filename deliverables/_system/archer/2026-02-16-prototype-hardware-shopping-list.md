# AI Agent Box — Prototype Hardware Shopping List
**Date:** 2026-02-16  
**Purpose:** Build first test unit for internal validation  
**Budget:** $180-220 (Professional tier) or $120-140 (Essential tier)

---

## Recommended: Professional Tier (Test High-End Product First)

Build the Pironman 5 kit first to validate the premium offering. You can always build Essential tier units later for budget-conscious clients.

---

### Shopping List — Professional Tier (~$200 total)

| Item | Quantity | Unit Price | Total | Where to Buy |
|------|----------|------------|-------|--------------|
| **Raspberry Pi 5 (8GB)** | 1 | $80 | $80 | [Adafruit](https://www.adafruit.com/product/5813) / [CanaKit](https://www.canakit.com/) / [Amazon](https://www.amazon.com/s?k=raspberry+pi+5+8gb) |
| **Pironman 5 Case Kit** | 1 | $80-90 | $85 | [SunFounder Amazon](https://www.amazon.com/s?k=pironman+5) / [Official Site](https://www.sunfounder.com/) |
| **Official 27W USB-C Power Supply** | 1 | $12 | $12 | [Adafruit](https://www.adafruit.com/product/5811) / [Amazon](https://www.amazon.com/s?k=raspberry+pi+5+power+supply) |
| **256GB MicroSD Card (A2, Class 10)** | 1 | $20-25 | $22 | [Amazon](https://www.amazon.com/s?k=256gb+microsd+a2) (SanDisk Extreme or Samsung EVO Plus) |
| **Cat6 Ethernet Cable (6ft)** | 1 | $5-8 | $6 | [Amazon](https://www.amazon.com/s?k=cat6+ethernet+6ft) / Local hardware store |
| **HDMI Cable (Micro HDMI to HDMI)** | 1 | $7-10 | $8 | [Amazon](https://www.amazon.com/s?k=micro+hdmi+to+hdmi) (for initial setup, optional if SSH) |
| | | **TOTAL** | **$213** | |

---

### Component Details

#### 1. Raspberry Pi 5 (8GB RAM) — $80

**Why 8GB:**
- 18 agents + Next.js dashboard = high memory usage
- 4GB will bottleneck (agents will crash under load)
- 8GB provides headroom for future enhancements

**Where to Buy:**
- **[Adafruit](https://www.adafruit.com/product/5813)** (reliable, often in stock)
- **[CanaKit](https://www.canakit.com/)** (bundles available)
- **[Amazon](https://www.amazon.com/s?k=raspberry+pi+5+8gb)** (faster shipping, check reviews for official distributors)

**Stock Check:**
- Pi 5 had supply issues at launch (late 2023), but widely available as of Feb 2026
- If out of stock, check [rpilocator.com](https://rpilocator.com/) for real-time inventory

---

#### 2. Pironman 5 Case Kit — $85

**What's Included:**
- Aluminum case (premium feel, heat dissipation)
- Active cooling (tower cooler + dual fans)
- 1.3" OLED display (shows system stats: CPU temp, IP address)
- RGB LED strip (optional, can disable)
- IR receiver (optional, for remote control)
- Power button (soft shutdown, not just yanking power)
- All mounting hardware + thermal pads

**Why Pironman 5:**
- Professional appearance (clients will show it off)
- Superior cooling (Pi 5 runs hot, passive cooling insufficient)
- OLED display = easy troubleshooting (client sees IP address without opening dashboard)
- Differentiates your product from DIY hobbyist setups

**Where to Buy:**
- **[Amazon — SunFounder Pironman 5](https://www.amazon.com/s?k=pironman+5)** (search "Pironman 5 Case", check it's SunFounder official)
- **[SunFounder Official Store](https://www.sunfounder.com/)** (direct, sometimes cheaper)

**Assembly Required:**
- ~30-45 minutes (not difficult, follow video guide)
- SunFounder provides assembly video on YouTube

---

#### 3. Official 27W USB-C Power Supply — $12

**Critical:** Do NOT use cheap phone chargers.
- Pi 5 needs 5V/5A (27W) under load
- Cheap chargers cause "undervoltage" warnings → instability → crashes
- Official supply has proper cable (USB-C, not all cables support 5A)

**Where to Buy:**
- **[Adafruit Raspberry Pi 5 Power Supply](https://www.adafruit.com/product/5811)** (official)
- **[Amazon](https://www.amazon.com/s?k=raspberry+pi+5+power+supply+27w)** (verify "Raspberry Pi Official" in title)

**Alternative:**
- CanaKit 27W USB-C supply (also reliable, often bundled with Pi)

---

#### 4. 256GB MicroSD Card (A2, Class 10) — $22

**Why 256GB:**
- OpenClaw + 18 agent workspaces + dashboard + logs = ~20-30GB
- Client data (MEMORY.md grows over time, deliverables, backups) = 50-100GB over 1 year
- 128GB works but fills up fast (recommend 256GB for "set it and forget it")

**Why A2 / Class 10:**
- **A2 rating** = optimized for random I/O (database writes, logs)
- **Class 10** = minimum 10MB/s sequential write (fast boot, app loading)
- Cheap cards (A1 or no rating) will bottleneck the system

**Recommended Brands:**
- **SanDisk Extreme** (red/gold, reliable, fast)
- **Samsung EVO Plus** (orange/white, slightly cheaper, also good)

**Where to Buy:**
- **[Amazon SanDisk Extreme 256GB](https://www.amazon.com/s?k=sandisk+extreme+256gb+microsd+a2)**
- **[Amazon Samsung EVO Plus 256GB](https://www.amazon.com/s?k=samsung+evo+plus+256gb+microsd)**

**Avoid:**
- Generic brands (Kingston, PNY often fake A2 ratings)
- "Ultra" or "Select" variants (slower than Extreme/EVO Plus)

---

#### 5. Cat6 Ethernet Cable (6ft) — $6

**Why Ethernet (not WiFi):**
- Anthropic API calls are frequent (every agent task)
- WiFi drops = agent tasks fail = client thinks box is broken
- Ethernet = rock-solid reliability (client plugs in once, forgets about it)

**Length:**
- 6ft standard (most routers within 6ft of desk/shelf)
- 10ft or 25ft if router is far (add $2-5)

**Where to Buy:**
- **[Amazon Cat6 6ft](https://www.amazon.com/s?k=cat6+ethernet+cable+6ft)** (any brand works, all Cat6 cables are similar)
- **Best Buy / Target / Walmart** (local, same price)

---

#### 6. Micro HDMI to HDMI Cable (Optional) — $8

**Purpose:**
- Initial setup (see boot screen, troubleshoot if wifi/ethernet doesn't auto-connect)
- After setup, you'll SSH in (no monitor needed)

**Alternative:**
- Borrow a cable (don't buy if you have one)
- Skip entirely and SSH from the start (riskier, assumes network auto-connects)

**Where to Buy:**
- **[Amazon Micro HDMI to HDMI](https://www.amazon.com/s?k=micro+hdmi+to+hdmi+cable)** (Pi 5 uses **Micro HDMI**, not Mini HDMI)

**Note:** Pi 5 has **two Micro HDMI ports**. Cable only needs to connect to one (port 0, closest to USB-C power).

---

## Alternative: Essential Tier (~$127 total)

If you want to test the budget offering first, here's the Essential tier shopping list:

| Item | Quantity | Unit Price | Total | Where to Buy |
|------|----------|------------|-------|--------------|
| **Raspberry Pi 5 (8GB)** | 1 | $80 | $80 | [Adafruit](https://www.adafruit.com/product/5813) / [Amazon](https://www.amazon.com/s?k=raspberry+pi+5+8gb) |
| **Official Active Cooler Case** | 1 | $15 | $15 | [Adafruit](https://www.adafruit.com/product/5814) / [Amazon](https://www.amazon.com/s?k=raspberry+pi+5+active+cooler) |
| **Official 27W USB-C Power Supply** | 1 | $12 | $12 | [Adafruit](https://www.adafruit.com/product/5811) / [Amazon](https://www.amazon.com/s?k=raspberry+pi+5+power+supply) |
| **128GB MicroSD Card (A2, Class 10)** | 1 | $12-15 | $13 | [Amazon](https://www.amazon.com/s?k=128gb+microsd+a2) (SanDisk Extreme or Samsung EVO) |
| **Cat6 Ethernet Cable (6ft)** | 1 | $5 | $5 | [Amazon](https://www.amazon.com/s?k=cat6+ethernet+6ft) |
| **Micro HDMI Cable (optional)** | 1 | $8 | $8 | [Amazon](https://www.amazon.com/s?k=micro+hdmi+to+hdmi) |
| | | **TOTAL** | **$133** | |

**Tradeoffs vs Professional:**
- No OLED display (client can't see IP address without opening dashboard)
- Basic white plastic case (vs aluminum)
- Single fan (vs tower cooler + dual fans)
- **Margin:** $673 (vs $988 for Professional)

**Recommendation:** Build Professional tier first. If clients say "too expensive," you can downgrade to Essential later.

---

## Additional Supplies (Nice to Have)

| Item | Cost | Purpose |
|------|------|---------|
| **USB MicroSD Card Reader** | $8 | Flash Raspberry Pi OS onto card from your Windows PC |
| **Label Maker / Stickers** | $15 | Label case with client name, QR code setup |
| **Small Screwdriver Set** | $10 | Pironman 5 assembly (if you don't have one) |
| **Anti-Static Wrist Strap** | $5 | Protect Pi during assembly (optional, not critical) |

**Where to Buy:**
- Amazon (all generic items)
- Harbor Freight (screwdrivers, cheap)

---

## Prototype Build Plan

### Step 1: Order Components (1-3 Days Shipping)

**Priority 1 (Need Immediately):**
- Raspberry Pi 5 (8GB)
- Pironman 5 Case Kit
- Official power supply
- 256GB microSD card
- Ethernet cable

**Priority 2 (Can Wait):**
- Micro HDMI cable (borrow if possible)
- Label maker (use later for client units)

**Where to Order:**
- **Amazon Prime** (2-day shipping, easy returns if defective)
- **Adafruit** (reliable but slower shipping, 5-7 days)

**Budget:**
- $213 for Professional tier
- Add 10% buffer for tax/shipping = ~$235 total

---

### Step 2: Assemble Hardware (30-45 Minutes)

**Tools Needed:**
- Small Phillips screwdriver (usually included in Pironman 5 kit)
- Flat workspace

**Assembly Steps:**
1. Watch SunFounder Pironman 5 assembly video on YouTube
2. Install thermal pads on Pi 5 CPU
3. Mount Pi to bottom case
4. Connect OLED display ribbon cable
5. Install tower cooler + fans
6. Attach top case
7. Connect power button + LED strip (optional)

**Common Mistakes:**
- Forgetting thermal pads (Pi will overheat)
- Ribbon cable backwards (OLED won't work, no damage but annoying)
- Over-tightening screws (can crack Pi board)

---

### Step 3: Flash MicroSD Card (15-20 Minutes)

**On Your Windows PC:**

1. **Download Raspberry Pi Imager:**
   - https://www.raspberrypi.com/software/
   - Free, official tool

2. **Flash OS:**
   - Insert microSD card into USB reader
   - Open Raspberry Pi Imager
   - Choose OS: **Raspberry Pi OS Lite (64-bit)** (no desktop, headless)
   - Choose Storage: Your microSD card
   - Click gear icon (⚙️) for advanced options:
     - Enable SSH
     - Set username/password (default: username `pi`, password `raspberry`)
     - Configure WiFi (optional, ethernet is better)
     - Set hostname: `marketing-box.local`
   - Click **Write**

3. **Wait:** ~5-10 minutes to flash + verify

**Why Lite (no desktop):**
- No GUI needed (you'll SSH in)
- Faster boot, less RAM usage
- Dashboard runs in browser anyway

---

### Step 4: First Boot (5 Minutes)

1. **Insert microSD** into Pi (slot under board, clicks in)
2. **Connect ethernet** cable (Pi → router)
3. **Plug in power** (USB-C)
4. **Wait 60-90 seconds** for boot

**What You'll See:**
- Pironman 5 OLED display shows boot sequence
- After boot: IP address displayed (e.g., `192.168.1.50`)
- Green LED solid = booted successfully

**If OLED shows no IP:**
- Ethernet cable not connected
- Router not assigning IP (check router DHCP settings)
- Plug in HDMI + monitor to troubleshoot

---

### Step 5: SSH In + Install OpenClaw (30 Minutes)

**From Your Windows PC:**

1. **Open PowerShell or Windows Terminal**

2. **SSH to Pi:**
   ```bash
   ssh pi@marketing-box.local
   # or if .local doesn't work:
   ssh pi@192.168.1.50
   ```
   - Password: `raspberry` (or whatever you set in Imager)

3. **Update System:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Install Node.js (required for OpenClaw):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   node -v  # should show v20.x
   ```

5. **Install OpenClaw:**
   ```bash
   sudo npm install -g openclaw
   openclaw --version  # verify installed
   ```

6. **Initialize OpenClaw:**
   ```bash
   cd ~
   openclaw init
   # Follow prompts (set agent name, Anthropic API key)
   ```

7. **Copy Your Agent System:**
   - From your Windows PC, SCP the agent files to Pi:
     ```powershell
     # On your Windows PC (PowerShell):
     scp -r C:\Users\spart\.openclaw\workspace\agents pi@marketing-box.local:/home/pi/.openclaw/workspace/
     scp C:\Users\spart\.openclaw\openclaw.json pi@marketing-box.local:/home/pi/.openclaw/
     ```

8. **Start Gateway:**
   ```bash
   openclaw gateway start
   openclaw status  # should show "Gateway running on port 18789"
   ```

---

### Step 6: Test Agents (15 Minutes)

**From SSH terminal on Pi:**

1. **Test Archer (orchestrator):**
   ```bash
   openclaw chat
   # Type: "status"
   # Should return agent roster
   ```

2. **Test Lookout (simple agent):**
   ```bash
   # Spawn Lookout task:
   openclaw run --agent lookout --task "Test task: return status"
   ```

3. **Check logs:**
   ```bash
   openclaw logs
   # Should show agent activity
   ```

**Success Criteria:**
- Gateway running (port 18789)
- Agents responding to tasks
- Logs show no critical errors

---

### Step 7: Build Dashboard (2-3 Hours)

**On Your Windows PC (not on Pi yet):**

1. **Create Next.js dashboard:**
   ```bash
   npx create-next-app@latest marketing-box-dashboard
   cd marketing-box-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install @shadcn/ui recharts tailwindcss
   ```

3. **Build pages:**
   - `app/page.tsx` — Home (agent status tiles)
   - `app/rankings/page.tsx` — Rankings chart
   - `app/content/page.tsx` — Content queue
   - `app/settings/page.tsx` — Settings form

4. **Connect to OpenClaw API:**
   - Fetch agent status from `http://localhost:18789/api/status`
   - Fetch rankings from Lookout MEMORY.md
   - Display in dashboard components

5. **Test locally:**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

6. **Build for production:**
   ```bash
   npm run build
   ```

7. **Deploy to Pi:**
   ```bash
   # SCP build to Pi:
   scp -r .next pi@marketing-box.local:/home/pi/dashboard/
   ```

8. **On Pi, install PM2 (process manager):**
   ```bash
   sudo npm install -g pm2
   cd ~/dashboard
   pm2 start npm --name "dashboard" -- start
   pm2 startup  # auto-start on boot
   pm2 save
   ```

9. **Access dashboard:**
   - Open browser: `http://marketing-box.local:3000`
   - Should show agent status tiles

---

## Total Time Estimate

| Step | Time |
|------|------|
| Order components | 1-3 days (shipping) |
| Assemble hardware | 30-45 min |
| Flash microSD | 15-20 min |
| First boot + SSH | 5 min |
| Install OpenClaw + agents | 30 min |
| Test agents | 15 min |
| Build dashboard | 2-3 hours |
| **Total (after components arrive)** | **4-5 hours** |

**Recommendation:** Spread over 2 days.
- **Day 1:** Assemble, flash, boot, install OpenClaw (1-2 hours)
- **Day 2:** Build dashboard, test full system (3 hours)

---

## Shopping Links (Direct)

### Raspberry Pi 5 (8GB)
- **Adafruit:** https://www.adafruit.com/product/5813
- **Amazon:** https://www.amazon.com/s?k=raspberry+pi+5+8gb
- **CanaKit:** https://www.canakit.com/

### Pironman 5 Case Kit
- **Amazon (SunFounder):** https://www.amazon.com/s?k=pironman+5+case
- **SunFounder Official:** https://www.sunfounder.com/

### Power Supply (Official 27W)
- **Adafruit:** https://www.adafruit.com/product/5811
- **Amazon:** https://www.amazon.com/s?k=raspberry+pi+5+power+supply+27w

### MicroSD Card (256GB A2)
- **SanDisk Extreme:** https://www.amazon.com/s?k=sandisk+extreme+256gb+microsd+a2
- **Samsung EVO Plus:** https://www.amazon.com/s?k=samsung+evo+plus+256gb+microsd

### Ethernet Cable (Cat6 6ft)
- **Amazon:** https://www.amazon.com/s?k=cat6+ethernet+cable+6ft

### Micro HDMI Cable
- **Amazon:** https://www.amazon.com/s?k=micro+hdmi+to+hdmi+cable

---

## Budget Summary

**Professional Tier (Recommended):**
- Components: $213
- Tax/Shipping (est): $20
- **Total: ~$235**

**Essential Tier (Budget Option):**
- Components: $133
- Tax/Shipping (est): $15
- **Total: ~$150**

**Recommendation:** Start with Professional tier. It's the higher-margin product ($988 profit vs $673) and gives you the best testing platform. If clients say "too expensive," you can always pivot to Essential tier later.

---

## Next Steps After Prototype

1. **Test internally for 7 days** (catch bugs, refine dashboard)
2. **Deploy 3 beta units** (existing clients, 50% off for feedback)
3. **Collect testimonials** (video preferred)
4. **Refine documentation** (quick-start card, setup video)
5. **Launch landing page** (heywoodagency.com/ai-agent-box)
6. **Sell first 10 units** (email + LinkedIn outreach)

**Timeline:** 6-8 weeks from component arrival to first sale.

---

**Ready to order?** Prioritize Amazon Prime (2-day shipping) for fastest turnaround.
