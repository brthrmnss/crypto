@echo off

rem SET sec_putty_environment_debug for debug purpose

SET meta=sec
SET project=putty
SET default_release=prod
SET default_path=\\ms\dist\%meta%\PROJ\%project%\%default_release%

SET commandpath=%~dp0%

if NOT "%commandpath%" == "%commandpath:\\ms\dist\sec\PROJ\putty\=%" goto msdist
if NOT "%commandpath%" == "%commandpath:\\ms\dev\sec\putty\=%" goto msdev

:default
echo "Warning: unrecognized putty.cmd path and invoking production version"
SET PUTTY_PREFIX=%default_path%
goto common

:msdev
for /f "tokens=5 delims=\" %%a in ("%commandpath%") DO SET PUTTY_PREFIX=\\ms\dev\%meta%\%project%\%%a\install
goto common

:msdist
for /f "tokens=6 delims=\" %%a in ("%commandpath%") DO SET PUTTY_PREFIX=\\ms\dist\%meta%\PROJ\%project%\%%a

:common
SET PUTTY_INST=%PUTTY_PREFIX%\.exec\ia32.nt.4.0\bin

rem echo for debugging purposes
if NOT "%sec_putty_environment_debug%" == "" (
    echo command path: %commandpath%
    echo putty root: %PUTTY_PREFIX%
    echo putty.exe path: %PUTTY_INST%
)

rem Setup Kerberos
set KRB5CCNAME=MSLSA:
set KRB5_CONFIG=%PUTTY_PREFIX%\common\etc\krb5.conf
set PATH=\\ms\dist\kerberos\PROJ\mitkfw\3.2-lib-prod\.exec\ia32.nt.4.0\bin;%PATH:\\ms\dist\kerberos\PROJ\mitkfw\3.2-lib-prod\.exec\ia32.nt.4.0\bin;=%

rem Start putty
rem old cmd @start %PUTTY_INST%\putty.exe %1 %2 %3 %4 %5 %6

@start %PUTTY_INST%\putty.exe -ssh morriste@rr413c1n7.ms.com:22 -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt" -t
