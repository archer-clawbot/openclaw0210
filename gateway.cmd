@echo off
rem OpenClaw Gateway (v2026.2.17)
set PATH=C:\Users\spart\.local\bin;C:\Python314\Scripts\;C:\Python314\;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;C:\Program Files\dotnet\;C:\Program Files\NVIDIA Corporation\NVIDIA App\NvDLISR;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;C:\Program Files (x86)\HighPoint Technologies, Inc\HighPoint RAID Management\Service;C:\Program Files\nodejs\;C:\ProgramData\chocolatey\bin;C:\Program Files\Git\cmd;C:\Program Files\Tailscale\;C:\Users\spart\AppData\Local\Microsoft\WindowsApps;C:\Users\spart\AppData\Roaming\npm;C:\Users\spart\AppData\Local\Microsoft\WinGet\Links;C:\Users\spart\.lmstudio\bin;C:\Users\spart\AppData\Local\Programs\Ollama;C:\Users\spart\AppData\Local\Programs\Antigravity\bin;C:\Users\spart\AppData\Local\GitHubDesktop\bin
set OPENCLAW_GATEWAY_PORT=18789
set OPENCLAW_GATEWAY_TOKEN=37fea8b2696b654fb8e12f907554ff76ba5ee502e0b0ca18
set OPENCLAW_SYSTEMD_UNIT=openclaw-gateway.service
set OPENCLAW_SERVICE_MARKER=openclaw
set OPENCLAW_SERVICE_KIND=gateway
set OPENCLAW_SERVICE_VERSION=2026.2.17
"C:\Program Files\nodejs\node.exe" C:\Users\spart\AppData\Roaming\npm\node_modules\openclaw\dist\index.js gateway --port 18789
