; rem start putty
; rem open file
; rem paste file


 Run "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"

sleep, 5000

;WinActivate TextPad - [

FileRead, commands, C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startccrtserver.sh


StringReplace, commands, commands, "`r`n", `r`n, UseErrorLevel
; CR
StringReplace, commands, commands, ``r, `r, All
; LF
StringReplace, commands, commands, ``n, `n, All
; Tab
StringReplace, commands, commands, ``t, `t, All


sleep , 500
SendInput {Raw}kinit
 Send {Enter}
 sleep , 1000
 SendInput {Raw}GetRich$$
  Send {Enter}
  sleep , 1000
; Clipboard = commands
commands = %commands%
SendInput {Raw}%commands%
; SendInput commands
; SendInput {commands}\

sleep , 500
 Send {Enter}
