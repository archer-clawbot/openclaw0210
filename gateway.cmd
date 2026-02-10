@echo off
rem OpenClaw Gateway (v2026.2.1)
set PATH=C:\Python314\Scripts\;C:\Python314\;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;C:\Program Files\dotnet\;C:\Program Files\NVIDIA Corporation\NVIDIA App\NvDLISR;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;C:\Program Files (x86)\HighPoint Technologies, Inc\HighPoint RAID Management\Service;C:\Program Files\nodejs\;C:\ProgramData\chocolatey\bin;C:\Program Files\Git\cmd;C:\Users\spart\AppData\Local\Microsoft\WindowsApps;C:\Users\spart\AppData\Roaming\npm;C:\Users\spart\AppData\Local\Microsoft\WinGet\Links;C:\Users\spart\.lmstudio\bin;C:\Users\spart\AppData\Local\Programs\Ollama;C:\Users\spart\AppData\Local\Programs\Antigravity\bin
set OPENCLAW_GATEWAY_PORT=18789
set OPENCLAW_GATEWAY_TOKEN=u8MkaRmfeHbq/5PdGHdANG89zamRjnPHLYpvH6O4X7E=
set OPENCLAW_SYSTEMD_UNIT=openclaw-gateway.service
set OPENCLAW_SERVICE_MARKER=openclaw
set OPENCLAW_SERVICE_KIND=gateway
set OPENCLAW_SERVICE_VERSION=2026.2.1
"C:\Program Files\nodejs\node.exe" C:\Users\spart\AppData\Roaming\npm\node_modules\openclaw\dist\index.js gateway --port 18789
