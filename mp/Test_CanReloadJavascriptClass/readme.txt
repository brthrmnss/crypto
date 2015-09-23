Update:
How to run? :
run serve.js (which will clog all browser windows)
  serves .js file  ... '....f'
run monitor
  runFileWatcherMonitor_Port3B_using_fsWatch.js
run chrome extension to put javascript to connect into browser eval (make seperate server to isolate for simplicity0)

Why: Can quickly create UI with stopping to reload all classes.
Focus on 1 component at time
-------
Can you reload a javascript class?

Goal: build a angularjs 'rebuilder' where i can make changes to source and see them reloaded using eval scripts


Attempt: put button, change javascript, and see if it reload the existing variables on the window object

Answer: Yes, but the prototypes are not reloaded ... so 'inplace' updates are not the same



Goal2: Build so there is re-render button, and all data stays the same, but we redraw eveyrthing in place
Compromise: Will reload the class, but destroy the parent's parent and reapply the dome
Compromise: will make a demo 'holder' component that will be reloaded as well ...
Next step: http://10.211.55.4:10001/quickform_tester.html
make server to host old app directory,
make reloader in this dir
pull in resources
test with a local component

-or-

modify demo file in seperate webstorm window quickform , then add 'reload' button
remove directive?
reload directive and you're in ....


