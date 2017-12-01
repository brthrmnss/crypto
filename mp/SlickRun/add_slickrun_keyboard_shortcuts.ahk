#SingleInstance FORCE
;SetTitleMatchMode,2
!1::
    IfWinActive Generic - morristew7.msad.ms.com
    {
        MsgBox "l::"
        Return
    }
    WinActivate SR - Google Chrome
     Run "G:\Dropbox\projects\crypto\mp\SlickRun\scripts\gotosr.ahk"
    ; Run "chromeddd"
    Return
!q::
    IfWinActive Generic - morristew7.msad.ms.com
        {
            MsgBox "!q::"
            Return
        }
    WinActivate SR - Google Chrome
     Run "G:\Dropbox\projects\crypto\mp\SlickRun\scripts\gotosr.ahk"
    ; Run "chromeddd"
    Return
<!q::
    ;MsgBox "<q::"
    WinGetTitle, Title, A

    IfInString, Title, Lubu 16.06 Clone Extx
    {
        ; MsgBox, skip
        return
    }
    ; MsgBox, 2. The active window is "%Title%".
    IfWinActive Generic - morristew7.msad.ms.com
    {
        MsgBox "<q::"
        Return
    }
    IfWinActive Remote Desktop Connection
    {
        MsgBox "<q::2"
        Return
    }
    WinActivate SR - Google Chrome
    Run "G:\Dropbox\projects\crypto\mp\SlickRun\scripts\gotosr.ahk"

    Return
>!q::
    WinGetTitle, Title, A
    MsgBox, The active window is "%Title%".
    IfWinActive Generic - morristew7.msad.ms.com
        {
            MsgBox "!q::"
            Return
        }
    WinActivate SR - Google Chrome
     Run "G:\Dropbox\projects\crypto\mp\SlickRun\scripts\gotosr.ahk"
    Run "bobob"
    ; this is alt q Run "ddddd"
    Return
#q::
    WinActivate SR - Google Chrome
     Run "G:\Dropbox\projects\crypto\mp\SlickRun\scripts\gotosr.ahk"
    Return
