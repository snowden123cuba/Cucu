$ErrorActionPreference = "SilentlyContinue"

Write-Host "Renombrando imagenes..." -ForegroundColor Green
cd "C:\Users\yuli\Documents\Cucu\frontend\client"
Get-ChildItem -Filter "*.png.png" -ErrorAction SilentlyContinue | Rename-Item -NewName {$_.Name.Replace('.png.png', '.png')} -Force

cd "C:\Users\yuli\Documents\Cucu\frontend\admin"
Get-ChildItem -Filter "*.png.png" -ErrorAction SilentlyContinue | Rename-Item -NewName {$_.Name.Replace('.png.png', '.png')} -Force

Write-Host "OK - Imagenes listas" -ForegroundColor Green
Write-Host ""
Write-Host "Iniciando servidor Node.js..." -ForegroundColor Cyan
Write-Host ""

cd "C:\Users\yuli\Documents\Cucu\backend"
Write-Host "========================================================" -ForegroundColor Green
Write-Host "SERVIDOR INICIADO" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Cliente:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Admin:    http://localhost:3000/admin.html" -ForegroundColor Cyan
Write-Host "Config:   http://localhost:3000/admin.html (tab: Configuracoes)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Abre tu navegador para acceder" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""

npm start
