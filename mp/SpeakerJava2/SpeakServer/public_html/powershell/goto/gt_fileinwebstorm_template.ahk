; rem start putty
; rem open file
; rem paste file

WinActivate =goToWindow=
click 20,50
Send !f

Send o
Sleep, 1000

; Send {Space}
Sleep, 500

SendRaw =filePathOrName=
Sleep, 400

Send {Enter}
Sleep, 400
