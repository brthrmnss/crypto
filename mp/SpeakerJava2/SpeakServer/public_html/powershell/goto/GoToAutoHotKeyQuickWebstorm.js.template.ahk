; rem start putty
; rem open file
; rem paste file

WinActivate =goToWindow=

; BlockPartialMode Send ^+r
; BlockPartialMode SendRaw =partialFileName=
; BlockPartialMode Sleep, 400
; BlockPartialMode Send {Enter}

; When open any file
; BlockFullMode Send {Enter}

; BlockFullMode click 20,50
; BlockFullMode Send !f

; BlockFullMode Send o
; BlockFullMode Sleep, 1000

; BlockFullMode ; Send {Space}
; BlockFullMode Sleep, 500

; BlockFullMode SendRaw =filePathOrName=
; BlockFullMode Sleep, 400

; BlockFullMode Send {Enter}
; BlockFullMode Sleep, 400
