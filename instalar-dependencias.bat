@echo off
chcp 65001 > nul
color 0A
echo.
echo ====== SISTEMA DE AGENDAMENTOS - INSTALACAO ======
echo.
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERRO: Node.js nao encontrado!
    echo Baixe em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo Node.js OK
echo.
echo Instalando dependencias do backend...
cd /d "%~dp0backend"
npm install
echo.
echo ===== INSTALACAO CONCLUIDA COM SUCESSO! =====
echo.
echo Para iniciar o servidor:
echo   1. Clique duplo em: iniciar-servidor.bat
echo   2. Ou execute: npm start
echo.
echo Sistema disponivel em:
echo   Cliente: http://localhost:3000
echo   Admin: http://localhost:3000/admin.html
echo.
pause
