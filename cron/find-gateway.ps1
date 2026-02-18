Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -like '*openclaw*gateway*' -or $_.CommandLine -like '*openclaw.cmd*' } |
  Select-Object ProcessId, CommandLine |
  Format-List
