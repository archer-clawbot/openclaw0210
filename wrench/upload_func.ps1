$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJlbl9HQiIsInZpZXdNb2RlIjoibGlzdCIsInNpbmdsZUNsaWNrIjpmYWxzZSwicmVkaXJlY3RBZnRlckNvcHlNb3ZlIjpmYWxzZSwicGVybSI6eyJhZG1pbiI6ZmFsc2UsImV4ZWN1dGUiOmZhbHNlLCJjcmVhdGUiOnRydWUsInJlbmFtZSI6dHJ1ZSwibW9kaWZ5Ijp0cnVlLCJkZWxldGUiOnRydWUsInNoYXJlIjpmYWxzZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6dHJ1ZSwiaGlkZURvdGZpbGVzIjpmYWxzZSwiZGF0ZUZvcm1hdCI6ZmFsc2UsInVzZXJuYW1lIjoidTg5MzM1ODc0NCIsImFjZUVkaXRvclRoZW1lIjoiIn0sImlzcyI6IkZpbGUgQnJvd3NlciIsImV4cCI6MTc3MTA2MTgxMCwiaWF0IjoxNzcxMDQwMjEwfQ.lepXIn-QUtQjCe4s_FNNcSmE2iRh5t5x4aApLCmisNQ'
$fileBytes = [IO.File]::ReadAllBytes('C:\Users\spart\.openclaw\wrench\localcatalyst_functions.php')
$url = 'https://srv1611-files.hstgr.io/8b3654e8644b71c0/api/resources/public_html/wp-content/themes/localcatalyst/functions.php?override=true'
$headers = @{ 'X-Auth' = $token }
$resp = Invoke-WebRequest -Uri $url -Method POST -Headers $headers -Body $fileBytes -ContentType 'application/octet-stream'
Write-Output "Status: $($resp.StatusCode), uploaded $($fileBytes.Length) bytes"
