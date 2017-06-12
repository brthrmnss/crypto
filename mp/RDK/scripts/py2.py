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

# Any interaction with RoboDK must be done through RDK:
RDK = Robolink()
RDK.AddFile('C:/RoboDK/Library/KUKA_KR_210_2.robot')

from http.server import BaseHTTPRequestHandler, HTTPServer
import json

# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):

  # GET
  def do_GET(self):
        # Send response status code
        self.send_response(200)

        # Send headers
        self.send_header('Content-type','text/html')
        self.end_headers()
        print("asdf");
        # Send message back to client
        message = "Hello world2!"
        # Write content as utf-8 data
        self.wfile.write(bytes(message, "utf8"))
        return

   # GET
  def do_POST(self):


        #with stdoutIO() as s:
        #    exec code

        #print "out:", s.getvalue()

        # Send response status code

        self.send_response(200)

        # Send headers
        self.send_header('Content-type','text/html')
        self.end_headers()

        content_len = int(self.headers['content-length'])
        post_body = self.rfile.read(content_len).decode('UTF-8')

        print("code");
        print(post_body); #show command
        print()
        #outputc = exec(post_body, globals() );
        #print("result", outputc);

        ##with stdoutIO() as s:
        ##    exec(post_body, globals())

        ##out = s.getvalue()

        #test_execute():
        out = ""
        out = execute(post_body, globals())
        #out = execute(post_body, globals(), locals())

        #print "out:", s.getvalue()
        print("result:")
        print(out);

        # Send message back to client
        ##message = "Hello worldg!"
        # Write content as utf-8 data
        ##message = out;
        if out == None:
          out = "none"


        self.wfile.write(bytes(out, "utf8"))
        return

def run():
  print('starting server...|')

  # Server settings
  # Choose port 8080, for port 80, which is normally used for a http server, you need root access
  server_address = ('127.0.0.1', 8081)
  httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
  print('running server...')
  httpd.serve_forever()


run()
print('after...')

from robolink import *    # API to communicate with robodk
from robodk import *      # robodk robotics toolbox

# Setup global parameters
BALL_DIAMETER = 100 # diameter of one ball
APPROACH = 100      # approach distance to grab each part, in mm
nTCPs = 6           # number of TCP's in the tool

#----------------------------------------------
# Function definitions

def box_calc(BALLS_SIDE=4, BALLS_MAX=None):
    """Calculate a list of points (ball center) as if the balls were stored in a box"""
    if BALLS_MAX is None: BALLS_MAX = BALLS_SIDE**3
    xyz_list = []
    for h in range(BALLS_SIDE):
        for i in range(BALLS_SIDE):
            for j in range(BALLS_SIDE):
                xyz_list = xyz_list + [[(i+0.5)*BALL_DIAMETER, (j+0.5)*BALL_DIAMETER, (h+0.5)*BALL_DIAMETER]]
                if len(xyz_list) >= BALLS_MAX:
                    return xyz_list
    return xyz_list

def pyramid_calc(BALLS_SIDE=4):
    """Calculate a list of points (ball center) as if the balls were place in a pyramid"""
    #the number of balls can be calculated as: int(BALLS_SIDE*(BALLS_SIDE+1)*(2*BALLS_SIDE+1)/6)
    BALL_DIAMETER = 100
    xyz_list = []
    sqrt2 = 2**(0.5)
    for h in range(BALLS_SIDE):
        for i in range(BALLS_SIDE-h):
            for j in range(BALLS_SIDE-h):
                height = h*BALL_DIAMETER/sqrt2 + BALL_DIAMETER/2
                xyz_list = xyz_list + [[i*BALL_DIAMETER + (h+1)*BALL_DIAMETER*0.5, j*BALL_DIAMETER + (h+1)*BALL_DIAMETER*0.5, height]]
    return xyz_list

def balls_setup(frame, positions):
    """Place a list of balls in a reference frame. The reference object (ball) must have been previously copied to the clipboard."""
    nballs = len(positions)
    step = 1/(nballs - 1)
    for i in range(nballs):
        newball = frame.Paste()
        newball.setName('ball ' + str(i)) #set item name
        newball.setPose(transl(positions[i])) #set item position with respect to parent
        newball.setVisible(True, False) #make item visible but hide the reference frame
        newball.Recolor([1-step*i, step*i, 0.2, 1]) #set RGBA color

def cleanup_balls(parentnodes):
    """Delete all child items whose name starts with \"ball\", from the provided list of parent items."""
    todelete = []
    for item in parentnodes:
        todelete = todelete + item.Childs()

    for item in todelete:
        if item.Name().startswith('ball'):
            item.Delete()

def TCP_On(toolitem, tcp_id):
    """Attach the closest object to the toolitem Htool pose,
    furthermore, it will output appropriate function calls on the generated robot program (call to TCP_On)"""
    toolitem.AttachClosest()
    toolitem.RDK().RunMessage('Set air valve %i on' % (tcp_id+1))
    toolitem.RDK().RunProgram('TCP_On(%i)' % (tcp_id+1));

def TCP_Off(toolitem, tcp_id, itemleave=0):
    """Detaches the closest object attached to the toolitem Htool pose,
    furthermore, it will output appropriate function calls on the generated robot program (call to TCP_Off)"""
    toolitem.DetachClosest(itemleave)
    toolitem.RDK().RunMessage('Set air valve %i off' % (tcp_id+1))
    toolitem.RDK().RunProgram('TCP_Off(%i)' % (tcp_id+1));


#----------------------------------------------------------
# The program starts here:

# Any interaction with RoboDK must be done through RDK:
RDK = Robolink()

# Turn off automatic rendering (faster)
RDK.Render(False)

#RDK.Set_Simulation_Speed(500); # set the simulation speed

# Gather required items from the station tree
robot = RDK.Item('Fanuc M-710iC/50')
robot_tools = robot.Childs()
#robottool = RDK.Item('MainTool')
frame1 = RDK.Item('Table 1')
frame2 = RDK.Item('Table 2')

# Copy a ball as an object (same as CTRL+C)
ballref = RDK.Item('reference ball')
ballref.Copy()

# Run a pre-defined station program (in RoboDK) to replace the two tables
prog_reset = RDK.Item('Replace objects')
prog_reset.RunProgram()

# Call custom procedure to remove old objects
cleanup_balls([frame1, frame2])

# Make a list of positions to place the objects
frame1_list = pyramid_calc(4)
frame2_list = pyramid_calc(4)

# Programmatically place the objects with a custom-made procedure
balls_setup(frame1, frame1_list)

# Delete previously generated tools
for tool in robot_tools:
    if tool.Name().startswith('TCP'):
        tool.Delete()

# Calculate tool frames for the suction cup tool of 6 suction cups
TCP_list = []
for i in range(nTCPs):
    TCPi_pose = transl(0,0,100)*rotz((360/nTCPs)*i*pi/180)*transl(125,0,0)*roty(pi/2)
    TCPi = robot.AddTool(TCPi_pose, 'TCP %i' % (i+1))
    TCP_list.append(TCPi)

TCP_0 = TCP_list[0]

# Turn on automatic rendering
RDK.Render(True)

# Move balls
robot.setTool(TCP_list[0])
nballs_frame1 = len(frame1_list)
nballs_frame2 = len(frame2_list)
idTake = nballs_frame1 - 1
idLeave = 0
idTCP = 0
target_app_frame = transl(2*BALL_DIAMETER, 2*BALL_DIAMETER, 4*BALL_DIAMETER)*roty(pi)*transl(0,0,-APPROACH)

while idTake >= 0:
    # ------------------------------------------------------------------
    # first priority: grab as many balls as possible
    # the tool is empty at this point, so take as many balls as possible (up to a maximum of 6 -> nTCPs)
    ntake = min(nTCPs, idTake + 1)

    # approach to frame 1
    robot.setFrame(frame1)
    robot.setTool(TCP_0)
    robot.MoveJ([0,0,0,0,10,-200])
    robot.MoveJ(target_app_frame)

    # grab ntake balls from frame 1
    for i in range(ntake):
        TCPi = TCP_list[i]
        robot.setTool(TCPi)
        # calculate target wrt frame1: rotation about Y is needed since Z and X axis are inverted
        target = transl(frame1_list[idTake])*roty(pi)*rotx(30*pi/180)
        target_app = target*transl(0,0,-APPROACH)
        idTake = idTake - 1
        robot.MoveL(target_app)
        robot.MoveL(target)
        TCP_On(TCPi, i)
        robot.MoveL(target_app)

    # ------------------------------------------------------------------
    # second priority: unload the tool
    # approach to frame 2 and place the tool balls into table 2
    robot.setTool(TCP_0)
    robot.MoveJ(target_app_frame)
    robot.MoveJ([0,0,0,0,10,-200])
    robot.setFrame(frame2)
    robot.MoveJ(target_app_frame)
    for i in range(ntake):
        TCPi = TCP_list[i]
        robot.setTool(TCPi)
        if idLeave > nballs_frame2-1:
            raise Exception("No room left to place objects in Table 2")

        # calculate target wrt frame1: rotation of 180 about Y is needed since Z and X axis are inverted
        target = transl(frame2_list[idLeave])*roty(pi)*rotx(30*pi/180)
        target_app = target*transl(0,0,-APPROACH)
        idLeave = idLeave + 1
        robot.MoveL(target_app)
        robot.MoveL(target)
        TCP_Off(TCPi, i, frame2)
        robot.MoveL(target_app)

    robot.MoveJ(target_app_frame)

# Move home when the robot finishes
robot.MoveJ([0,0,0,0,10,-200])
