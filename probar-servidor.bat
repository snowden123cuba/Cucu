@echo off
chcp 65001 >nul
color 0A
cls

echo ╔════════════════════════════════════════════════════════════════╗
echo ║                   INICIANDO SERVIDOR                          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Detener procesos Node.js previos
echo 🛑 Deteniendo procesos Node.js previos...
taskkill /F /IM node.exe >nul 2>&1

echo ⏳ Esperando 2 segundos...
timeout /t 2 /nobreak

REM Navegar a la carpeta backend
echo.
echo 📁 Navegando a la carpeta backend...
cd /d C:\Users\yuli\Documents\Cucu\backend

REM Verificar que package.json existe
if not exist package.json (
    echo ❌ ERROR: package.json no encontrado en backend/
    pause
    exit /b 1
)

echo ✅ Carpeta backend encontrada
echo.
echo 🚀 Iniciando servidor Node.js...
echo.
echo ════════════════════════════════════════════════════════════════
echo El servidor estará disponible en:
echo   📱 Cliente: http://localhost:3000
echo   🖥️  Admin:   http://localhost:3000/admin.html
echo   ⚙️  Config: http://localhost:3000/admin.html (pestaña Configurações)
echo.
echo Presiona Ctrl+C para detener el servidor
echo ════════════════════════════════════════════════════════════════
echo.

npm start

pause
