@echo off
:: OpenClaw Gateway launcher — called by Windows Scheduled Task
:: Wraps the npm-installed openclaw CLI to start the gateway
cd /d "%~dp0"
"C:\Users\spart\AppData\Roaming\npm\openclaw.cmd" gateway
