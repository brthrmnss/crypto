
;template for navigating to a window

SetTitleMatchMode,2

loop{
    If WinExist("Download File Info") {
        WinActivate Download File Info
    }
    else
    {
        ;run, =launchIfNotFound=
        ; --new-window
    }



    ControlGetText, txtVal , Edit1 ; Control name shown by WindowSpy


    if txtVal contains rapidgat
    ControlClick, Button1
}


 esc::exitapp


