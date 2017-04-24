$sig = '[DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);'
Add-Type -MemberDefinition $sig -name NativeMethods -namespace Win32



function Get-WindowTitle($handle) {
  Get-Process |
    ? { $_.MainWindowHandle -eq $handle } |
    select -Expand MainWindowTitle
}

$app = New-Object -COM 'Shell.Application'
$app.Windows() |
  Select-Object LocationURL, @{n='Title';e={Get-WindowTitle $_.HWND}}


#Stop-Process -Name Notepad -ea 0;Notepad.exe
$hwnd = @(Get-Process SR)[0].MainWindowHandle
# Minimize window
#[Win32.NativeMethods]::ShowWindowAsync($hwnd, 2)
# Restore window
[Win32.NativeMethods]::ShowWindowAsync($hwnd, 4)
#Stop-Process -Name Notepad