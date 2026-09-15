#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN_DIR="${HOME}/.local/bin"
APP_DIR="${HOME}/.local/share/applications"
ICON_DIR="${HOME}/.local/share/icons/hicolor/scalable/apps"

echo "Instalando MDRealtime desde: ${REPO_DIR}"

mkdir -p "${BIN_DIR}" "${APP_DIR}" "${ICON_DIR}"

# 1. Enlace ejecutable en ~/.local/bin
ln -sf "${REPO_DIR}/bin/mdrealtime" "${BIN_DIR}/mdrealtime"
ln -sf "${REPO_DIR}/bin/mdrealtime" "${BIN_DIR}/symbiolive"
chmod +x "${REPO_DIR}/bin/mdrealtime"

# 2. Copiar icono de la aplicación
cp "${REPO_DIR}/assets/icon.svg" "${ICON_DIR}/mdrealtime.svg"
cp "${REPO_DIR}/assets/icon.svg" "${ICON_DIR}/symbiolive.svg"

# 3. Instalar entrada de escritorio
cp "${REPO_DIR}/assets/mdrealtime.desktop" "${APP_DIR}/mdrealtime.desktop"

# 4. Actualizar base de datos de escritorio si existe el comando
if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "${APP_DIR}" >/dev/null 2>&1 || true
fi

if command -v gtk-update-icon-cache >/dev/null 2>&1; then
  gtk-update-icon-cache -f -t "${HOME}/.local/share/icons/hicolor" >/dev/null 2>&1 || true
fi

echo "Instalación completada. Comando disponible: mdrealtime (y symbiolive)"
