#SingleInstance force
;template for navigating to a window

SetTitleMatchMode,2
IfWinActive,Download File Info
    {
        ControlGetText, txtVal , Edit1 ; Control name shown by WindowSpy
        if txtVal contains rapidgat
        ControlClick, Button1
    }
Loop
{
    IfWinActive,Download File Info
    {
        ControlGetText, txtVal , Edit1 ; Control name shown by WindowSpy
        if txtVal contains rapidgat
        ControlClick, Button1
    }
    Sleep, 1000
}


 esc::exitapp


