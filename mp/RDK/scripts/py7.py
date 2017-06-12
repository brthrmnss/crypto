def test_execute2():
  cmdoutput = execute("z = 5", globs, locs)
  print("output of command", cmdoutput)
  cmdoutput = execute("z", globs, locs)
  print("output of command", cmdoutput)
  #cmdoutput = execute(code, globs, locs)
  #print("output of command", cmdoutput)
  print()
  code2 = "y = 5 + 2"
  cmdoutput = execute(code2, globs, locs)
  print("output of command", cmdoutput)
  code2 = "print(y)"
  cmdoutput = execute(code2, globs, locs)
  print("output of command", cmdoutput)
  code2 = "y"
  cmdoutput = execute(code2, globs, locs)
  print("output of command", cmdoutput)
  print("quickrundone")
  #sys.exit()


test_execute2()

def test_execute2B():
  #cmdoutput = execute("z = 5", globs, locs)
  #print("output of command", cmdoutput)
  #cmdoutput = execute("z", globs, locs)
  #print("output of command", cmdoutput)
  ##cmdoutput = execute(code, globs, locs)
  ##print("output of command", cmdoutput)
  #print()
  #code2 = "y = 5 + 2"
  #cmdoutput = execute(code2, globs, locs)
  #print("output of command", cmdoutput)
  code2 = "print(y)"
  cmdoutput = execute(code2, globs, locs)
  print("output of command", cmdoutput)
  code2 = "y"
  cmdoutput = execute(code2, globs, locs)
  print("output of command", cmdoutput)
  print("quickrundone")
  sys.exit()


test_execute2B()