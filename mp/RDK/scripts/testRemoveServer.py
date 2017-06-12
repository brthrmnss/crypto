#!/usr/bin/env python

from robolink import *    # API to communicate with robodk
from robodk import *      # robodk robotics toolbox

import sys
from io import StringIO
import sys
#import StringIO
import contextlib

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old


code = """
i = [0,1,2]
for j in i :
    print(j)
"""

with stdoutIO() as s:
    exec(code)

print("out:", s.getvalue())


from io import StringIO

def execute(code, _globals={}, _locals={}):
    import sys
    fake_stdout = StringIO()
    __stdout = sys.stdout
    sys.stdout = fake_stdout
    try:
        #try if this is expressions
        ret = eval(code, _globals, _locals)
        result = fake_stdout.getvalue()
        sys.stdout = __stdout
        if ret:
            result += str(ret)
        return result
    except:
        try:
            exec(code, _globals, _locals)
        except:
            sys.stdout = __stdout
            import traceback
            buf = StringIO()
            traceback.print_exc(file=buf)
            return buf.getvalue()
        else:
            sys.stdout = __stdout
            return fake_stdout.getvalue()

def test_execute():
  cmdoutput = execute("z = 5", globals(), locals())
  print("output of command", cmdoutput)
  cmdoutput = execute("z", globals(), locals())
  print("output of command", cmdoutput)
  #cmdoutput = execute(code, globals(), locals())
  #print("output of command", cmdoutput)
  print()
  code = "y = 5 + 2"
  cmdoutput = execute(code, globals(), locals())
  print("output of command", cmdoutput)
  code = "print(y)"
  cmdoutput = execute(code, globals(), locals())
  print("output of command", cmdoutput)
  code = "y"
  cmdoutput = execute(code, globals(), locals())
  print("output of command", cmdoutput)
  print("quickrundone")
  sys.exit()


#test_execute()

#import requests
#r = requests.post("http://bugs.python.org", data={'number': 12524, 'type': 'issue', 'action': 'show'})
#print(r.status_code, r.reason)


from urllib.parse import urlencode
from urllib.request import Request, urlopen

url = 'http://localhost:8081/g/blue/anyurulwilldo.html' # Set destination URL here
post_fields = {'data': "y=5+2"}     # Set POST fields here

request = Request(url, urlencode(post_fields).encode())
#request = Request(url, "y=5+2")
json = urlopen(request).read().decode()
print('called-1')
print(json)


post_fields = {'data': "print(y)"}     # Set POST fields here
request = Request(url, urlencode(post_fields).encode())
json = urlopen(request).read().decode()
print('called-2')
print(json)


post_fields = {'data': "y"}
request = Request(url, urlencode(post_fields).encode())
json = urlopen(request).read().decode()
print('called-3')
print(json)
