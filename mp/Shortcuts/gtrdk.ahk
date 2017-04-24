; rem start putty
; rem open file
; rem paste file



WinActivate crypto - [
click 20,50
Send !f


Send o
Sleep, 1000

SendRaw G:\Dropbox\projects\crypto\mp\RDK\testpython2.js
Sleep, 400

Send {Enter}
Sleep, 400
