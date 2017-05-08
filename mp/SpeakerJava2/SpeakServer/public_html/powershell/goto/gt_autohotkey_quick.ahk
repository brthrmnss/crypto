; template for navigating to a window



If WinExist("=goToWindow=") {
    WinActivate =goToWindow=
}
else
{
    run, =launchIfNotFound=
    ; --new-window
}
