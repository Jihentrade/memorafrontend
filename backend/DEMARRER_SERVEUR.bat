@echo off
chcp 65001 >nul
cls

echo.
echo ═══════════════════════════════════════════════════════════════
echo            DÉMARRAGE DU SERVEUR BACKEND MEMORA MAGNET
echo ═══════════════════════════════════════════════════════════════
echo.
echo.

echo [Étape 1/3] Vérification du dossier...
if not exist "package.json" (
    echo.
    echo ❌ ERREUR : Vous n'êtes pas dans le dossier "backend"
    echo.
    echo Veuillez :
    echo   1. Ouvrir ce fichier depuis le dossier "backend"
    echo   2. Ou déplacez ce fichier dans le dossier "backend"
    echo.
    pause
    exit /b 1
)

echo ✅ Dossier correct !
echo.

echo [Étape 2/3] Démarrage du serveur...
echo.
echo ⚠️  Gardez cette fenêtre OUVERTE pendant que vous travaillez
echo ⚠️  Pour arrêter le serveur, appuyez sur Ctrl+C
echo.
echo ───────────────────────────────────────────────────────────────
echo.

npm start

echo.
echo ───────────────────────────────────────────────────────────────
echo.
echo Le serveur a été arrêté.
echo.
pause

