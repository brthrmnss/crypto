start "slickrunserver" node SlickRunServer.js
start "sr in app" chrome --app=http://127.0.0.1:4445/sr.html
REM add_slickrun_keyboard_shortcuts.ahk
start "ahk" G:\Dropbox\projects\crypto\mp\SlickRun\add_slickrun_keyboard_shortcuts.ahk