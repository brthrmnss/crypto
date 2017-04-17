; rem start putty
; rem open file
; rem paste file



WinActivate NodeTest - [
; WinActivate dev - [Z:\dev
click 20,50
Send !f


Send o
Sleep, 500

SendRaw Q:\p4v2\public_html\index.html
Sleep, 400

Send {Enter}
Sleep, 400
