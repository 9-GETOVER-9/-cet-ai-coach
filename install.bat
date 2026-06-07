@echo off
REM CET Skills V1 - Windows installer
setlocal
chcp 65001 >nul

set "SRC=%~dp0"
set "DST=%USERPROFILE%\.claude\skills"

echo.
echo === CET Skills V1 安装 ===
echo 源目录: %SRC%
echo 目标:   %DST%
echo.

if not exist "%DST%" mkdir "%DST%"

set "SKILLS=cet cet-diagnose cet-writing cet-reading cet-listening cet-translation cet-vocab"
for %%S in (%SKILLS%) do (
    if not exist "%DST%\%%S" mkdir "%DST%\%%S"
    copy /Y "%SRC%%%S\SKILL.md" "%DST%\%%S\SKILL.md" >nul
    if errorlevel 1 (echo [失败] %%S) else (echo [完成] %%S)
)

if not exist "%DST%\cet-dashboard" mkdir "%DST%\cet-dashboard"
copy /Y "%SRC%cet-dashboard\SKILL.md" "%DST%\cet-dashboard\SKILL.md" >nul

set "EXCLUDE_FILE=%TEMP%\cet_xcopy_exclude.txt"
> "%EXCLUDE_FILE%" echo \node_modules\
>>"%EXCLUDE_FILE%" echo \dist\
>>"%EXCLUDE_FILE%" echo \.git\
xcopy /E /I /Y /Q /EXCLUDE:"%EXCLUDE_FILE%" "%SRC%cet-dashboard\dashboard" "%DST%\cet-dashboard\dashboard\" >nul
del "%EXCLUDE_FILE%" >nul 2>&1
echo [完成] cet-dashboard

copy /Y "%SRC%SCHEMA.md" "%DST%\CET_SCHEMA.md" >nul
echo [完成] CET_SCHEMA.md

echo.
echo === 安装完成 ===
echo 下一步:
echo   cd "%%USERPROFILE%%\.claude\skills\cet-dashboard\dashboard"
echo   npm install
echo   npm start
echo.
echo Claude Code 中输入 /cet 开始。
pause
