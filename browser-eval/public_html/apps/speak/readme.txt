https://local.helloworld3000.com:8043/apps/speak/test.html



run browserEvalServer.js


G:\Dropbox\projects\crypto\browser-eval\BrowserEvalServer.js
G:\Dropbox\projects\crypto\browser-eval\BasicReloadServer2.js
G:\Dropbox\projects\crypto\nodejs-ssl-example-master\serve.js


sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
wget https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -O - | sudo apt-key add -
sudo apt-get update
sudo apt-get install ros-indigo-desktop-full
sudo rosdep init
rosdep update
echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
sudo apt-get install python-rosinstall



 mkdir -p ~/Documents/catkin_ws/src
 cd ~/Documents/catkin_ws/src
 catkin_init_workspace
 cd ~/Documents/catkin_ws
 catkin_make
 

mkdir -p ~/Documents/GitHub
cd ~/Documents/GitHub
git clone https://github.com/ros-simulation/gazebo_ros_demos.git
cd ~/Documents/catkin_ws
 ln -s ~/Documents/GitHub/gazebo_ros_demos ~/Documents/catkin_ws/src/gazebo_ros_demos
 catkin_make
 source devel/setup.bash


 sudo apt-get install ros-indigo-effort-controllers -y
  sudo apt-get install ros-indigo-joint-state-controller -y


  echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
 cd ~/Documents/catkin_ws
   source devel/setup.bash
roslaunch rrbot_gazebo rrbot_world.launch

roslaunch rrbot_control rrbot_control.launch
 roslaunch rrbot_control rrbot_rqt.launch

