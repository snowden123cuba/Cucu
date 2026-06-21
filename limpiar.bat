@echo off
REM Eliminar archivos innecesarios
del /Q "iniciar-servidor.bat" 2>nul
del /Q "iniciar-todo.ps1" 2>nul
del /Q "instalar-dependencias.bat" 2>nul
del /Q "instalar-dependencias.sh" 2>nul
del /Q "probar-servidor.bat" 2>nul
del /Q "renombrar-imagenes.ps1" 2>nul

echo OK - Archivos innecesarios eliminados
echo Queda solo: INICIAR.bat
pause
