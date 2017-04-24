clipboard = %clipboard%
clipboard2 = clipboard

; FileAppend, %clipboard2%,  %A_ScriptDir%\output.txt
FileDelete,%A_ScriptDir%\clipboard.output.txt
Fileappend,%clipboard%, %A_ScriptDir%\clipboard.output.txt