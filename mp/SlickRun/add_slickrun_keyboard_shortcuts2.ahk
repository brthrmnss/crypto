#SingleInstance FORCE
;SetTitleMatchMode,2
#KeyHistory ;
SC110::
    ; WinActivate SR
    ; Run  "node" "G:/Dropbox/projects/crypto/mp/AutoItKey/vm_scripts/AutoItRunner_ReadLocally.js", Hide
    Run "G:\Dropbox\projects\crypto\mp\SlickRun\test.bat",, Hide
    ; Run  "start" "/min" "node" "G:/Dropbox/projects/crypto/mp/AutoItKey/vm_scripts/AutoItRunner_ReadLocally.js"
    ; Run "start" "/min" "test.bat"
    ; Run start /min myfile.bat
    Return
SC122::
    WinActivate Web Speech2Text
    Return
