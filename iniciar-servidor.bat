@echo off
chcp 65001 > nul
color 0A
echo.
echo ====== SISTEMA DE AGENDAMENTOS ======
echo.
echo Iniciando servidor...
echo.
cd /d "%~dp0backend"
npm start
echo.
echo Servidor finalizado.
pause
