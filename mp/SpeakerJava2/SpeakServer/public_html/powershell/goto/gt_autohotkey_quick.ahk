; template for navigating to a window

; regex SetTitleMatchMode,RegEx


If WinExist("=goToWindow=") {
    WinActivate =goToWindow=
}
else
{
    run, =launchIfNotFound=
    ; --new-window
}
