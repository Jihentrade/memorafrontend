@echo off
chcp 65001 >nul
cls

echo.
echo ═══════════════════════════════════════════════════════════════
echo              REDÉMARRAGE FORCÉ DU SERVEUR BACKEND
echo ═══════════════════════════════════════════════════════════════
echo.
echo.

echo [1/3] Arrêt de tous les serveurs Node.js en cours...
echo.

taskkill /F /IM node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Serveurs Node.js arrêtés
) else (
    echo ⚠️  Aucun serveur Node.js n'était en cours d'exécution
)

echo.
echo [2/3] Attente de 2 secondes...
timeout /t 2 /nobreak >nul

echo.
echo [3/3] Démarrage du nouveau serveur...
echo.
echo ───────────────────────────────────────────────────────────────
echo.
echo ⚠️  Gardez cette fenêtre OUVERTE
echo ⚠️  Pour arrêter : Ctrl+C
echo.
echo ───────────────────────────────────────────────────────────────
echo.

npm start

echo.
echo ───────────────────────────────────────────────────────────────
echo Le serveur a été arrêté.
pause

