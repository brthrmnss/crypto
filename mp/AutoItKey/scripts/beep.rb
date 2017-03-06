require "Win32API"
Beep = Win32API.new("kernel32", "Beep", ["I", "I"], 'v')
def beep freq, duration
    #puts 'beep', freq, 'd', duration
  Beep.call(freq, duration)
end
beep 600, 400