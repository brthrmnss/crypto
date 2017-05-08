; rem start putty
; rem open file
; rem paste file

WinActivate crypto - [
click 20,50
Send !f

Send o
Sleep, 1000

; Send {Space}
Sleep, 500

SendRaw =FILE=
Sleep, 400

Send {Enter}
Sleep, 400
