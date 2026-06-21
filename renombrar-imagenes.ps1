$client_path = "C:\Users\yuli\Documents\Cucu\frontend\client\bg-client.png.png"
$admin_path = "C:\Users\yuli\Documents\Cucu\frontend\admin\bg-admin.png.png"
$new_client = "C:\Users\yuli\Documents\Cucu\frontend\client\bg-client.png"
$new_admin = "C:\Users\yuli\Documents\Cucu\frontend\admin\bg-admin.png"

if (Test-Path $client_path) {
    Rename-Item -Path $client_path -NewName "bg-client.png" -Force
    Write-Host "✅ Renombrado: bg-client.png.png → bg-client.png"
}

if (Test-Path $admin_path) {
    Rename-Item -Path $admin_path -NewName "bg-admin.png" -Force
    Write-Host "✅ Renombrado: bg-admin.png.png → bg-admin.png"
}

Write-Host ""
Write-Host "✅ Ahora puedes ejecutar: probar-servidor.bat"
Write-Host ""
pause
