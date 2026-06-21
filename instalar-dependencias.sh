#!/bin/bash
cd "$(dirname "$0")/backend"
echo "Instalando dependencias del backend..."
npm install
echo ""
echo "Si deseas iniciar el servidor, ejecuta:"
echo "npm start"
