; rem start putty
; rem open file
; rem paste file


 Run "\\ms\dist\sec\PROJ\putty\prod\common\bin\putty.cmd" -ssh morriste@rr413c1n7.ms.com:22 -t -m "C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\startupcmds.txt"

sleep, 5000

;WinActivate TextPad - [

FileRead, commands, C:\Users\morriste\train\train_drive\trash\node2\mp\SpeakerJava\SpeakServer\public_html\powershell\start_ccrt_layoutManager_server.sh

sleep , 500
SendInput {Raw}kinit
 Send {Enter}
 sleep , 1000
 SendInput {Raw}GetRich$$
  Send {Enter}
  sleep , 1000
commands = %commands%
SendInput {Raw}%commands%

sleep , 500
 Send {Enter}
