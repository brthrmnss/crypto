start "sr in app" chrome --app=http://127.0.0.1:4444/sr.html
add_keyboard_shortcuts_sr.ahk

#SingleInstance FORCE

!q::
    WinActivate SR - Google Chrome
     Run "C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gotosr.ahk"
    ; Run "chromeddd"
    Return
<!q::
    WinActivate SR - Google Chrome
     Run "C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gotosr.ahk"

    Return
>!q::
    WinActivate SR - Google Chrome
     Run "C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gotosr.ahk"

    Return
#q::
    WinActivate SR - Google Chrome
     Run "C:\Users\morriste\train\train_drive\trash\node2\mp\RDK\AutoHotKey\gotosr.ahk"
    Return
!r::
    Run "http://127.0.0.1:10100/tinymce.html#/player"
    Return