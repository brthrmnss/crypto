
If WinExist("BDB TT") {
    WinActivate BDB TT
}
else
{
    run, http://localhost:6008/index.html567.html
}
