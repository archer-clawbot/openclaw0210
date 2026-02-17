$b = [Convert]::ToBase64String([IO.File]::ReadAllBytes('C:\Users\spart\.openclaw\wrench\localcatalyst_functions.php'))
Write-Output $b.Substring(20000, $b.Length - 20000)
