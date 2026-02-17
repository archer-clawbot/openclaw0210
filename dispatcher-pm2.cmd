@echo off
:: OpenClaw Dispatcher — PM2 managed with auto-restart
:: Usage:
::   dispatcher-pm2.cmd start    — Start dispatcher (auto-restart on crash)
::   dispatcher-pm2.cmd stop     — Stop dispatcher
::   dispatcher-pm2.cmd restart  — Restart dispatcher
::   dispatcher-pm2.cmd logs     — Tail live logs
::   dispatcher-pm2.cmd status   — Show PM2 process status
cd /d "%~dp0"

if "%1"=="" goto start
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="restart" goto restart
if "%1"=="logs" goto logs
if "%1"=="status" goto status
echo Unknown command: %1
echo Usage: dispatcher-pm2.cmd [start|stop|restart|logs|status]
exit /b 1

:start
pm2 start ecosystem.config.js
pm2 save
echo.
echo Dispatcher started with PM2 (auto-restart enabled).
echo Run 'pm2 logs openclaw-dispatcher' to follow logs.
exit /b 0

:stop
pm2 stop openclaw-dispatcher
exit /b 0

:restart
pm2 restart openclaw-dispatcher
exit /b 0

:logs
pm2 logs openclaw-dispatcher --lines 50
exit /b 0

:status
pm2 status
exit /b 0
