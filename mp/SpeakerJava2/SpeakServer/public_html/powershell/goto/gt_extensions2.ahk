; template for navigating to a window

; Exit

; :WinGetTitle, Title, A
; :MsgBox, The active window is "%Title%".

If WinExist("Extensions") {
    WinActivate Extensions
}
else
{
    run, chrome://extensions/?id=eccjleafkfbnhkhhnmboefdjjenidimg
    ; --new-window
}

Sleep, 300
Send ^r

if WinExist("how to go to fil#e"){
    WinActivate crypto - [

    Send ^+r
    SendRaw pid3Demo.dir.js
    Sleep, 400

    Send {Enter}
}



Sleep, 300
Send !{Tab}
; Sleep, 300
; Send !{Tab}
; Send ^+r