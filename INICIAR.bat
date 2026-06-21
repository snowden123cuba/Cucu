@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ════════════════════════════════════════════════════════════════
echo           SISTEMA DE AGENDAMIENTOS - INICIAR SERVIDOR
echo ════════════════════════════════════════════════════════════════
echo.

REM Renombrar imágenes si están duplicadas
cd /d "%~dp0frontend\client" 2>nul
for %%F in (*.png.png) do if exist "%%F" ren "%%F" "%%~nF"
cd /d "%~dp0frontend\admin" 2>nul
for %%F in (*.png.png) do if exist "%%F" ren "%%F" "%%~nF"

REM Ir a la carpeta backend
cd /d "%~dp0backend"
if not exist package.json (
    echo ERROR: No se encontro package.json
    pause
    exit /b 1
)

echo Iniciando servidor...
echo.
echo ════════════════════════════════════════════════════════════════
echo SERVIDOR EN LINEA
echo ════════════════════════════════════════════════════════════════
echo.
echo CLIENTE:  http://localhost:3000
echo ADMIN:    http://localhost:3000/admin.html
echo CONFIG:   http://localhost:3000/admin.html (tab: Configuracoes)
echo.
echo Presiona Ctrl+C para detener el servidor
echo ════════════════════════════════════════════════════════════════
echo.

npm start

pause
