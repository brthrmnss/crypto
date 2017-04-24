

START "title" /D "C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\" "C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.2\marytts-5.2\bin\marytts-server.bat"

start "db" "http://rr413c1n7.ms.com:3000/index.html"


Start "q stuff" "Q:\p4v2"
Start "q backup" "Z:\dev\morriste\dev2\ui\dev"

'goto endbatchfile

Start "db" "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd"

Start "Dashboard" "U:\My documents\dashboard.docx"
Start "trunk instructinos" "U:\My Documents\projects\pj-ccrt-trunk.docx"

start "intellijs" "\\ms\dist\msde\PROJ\intellijlauncher\prod\intellij_msde.cmd"

START "RCS" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\RemoteConsoleServer.js
START "Reloader Server" /D  "C:\Users\morriste\train\train_drive\trash\node2" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\reloaderServer.js
START "xdrive Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\node2\mp\ReloadPivotTable\CCRT_ReloadableDir_Reloader_XDrive.js


'goto endbatchfile
START "TTS Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\Server.js
START "Pdf rip Combine" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipCombine.js
START "Pdf Rip Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\PdfRipServer.js
START "TTS SAve Server" "C:\Users\morriste\node\node.exe" C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\TinyMCESaveServer.js

'C:\Users\morriste\train\train_drive\trash\TTS-Reader2-live\TTS-Reader\TinyMCESaveServer.js



start "FastStone" "\\MSAD\ROOT\NA\NY\USERS\morriste\Desktop\FSCapture.exe"

start "Beyondcompare" "\\MSAD\ROOT\NA\NY\USERS\morriste\Desktop\Beyond Compare 4\BCompare.exe"

start "subsnet" "\\Msad\root\NA\NY\USERS\morriste\My Documents\trash\SunsetScreen.exe"

'Do need this?, how are sounds played from mary-tts?


timeout /t 5

start "sr" http://127.0.0.1:4444/sr.html
start "speakers" http://127.0.0.1:4444/tts_speaker.html
start "c" chrome --app=http://127.0.0.1:4444/sr.html


C:\Users\morriste\train\train_drive\trash\node2\mp\Grammar\GrammarHelperServer\GrammarHelperServer.js
C:\Users\morriste\train\train_drive\trash\node2\mp\Grammar\RemoteConsoleServerPt.js



:endbatchfile