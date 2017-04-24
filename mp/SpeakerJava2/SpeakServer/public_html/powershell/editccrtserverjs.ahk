; rem start putty
; rem open file
; rem paste file



WinActivate NodeTest - [
; WinActivate dev - [Z:\dev
click 20,50
Send !f


Send o
Sleep, 1000

SendRaw Q:\p4v2\ccrt-trunk.js
Sleep, 400

Send {Enter}
Sleep, 400
