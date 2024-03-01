# ROS Image Topic viewer
This extension allows to visualize image messages published in ROS in VScode, but using [web_video_server](https://wiki.ros.org/web_video_server) as backend.

Once invoked, it will ask you to select the topic along the ones published.

Report any issues or problems in the GitHub: https://github.com/SimoneNascivera/ros_image_viewer_vscode

## Features

Right now I only support the message type *sensor_msgs/Image*. I am planning on supporting  *sensor_msgs/CompressedImage* and *stereo_msgs/DisparityImage*.

## Requirements

This extension requires ROS and the package [web_video_server](https://wiki.ros.org/web_video_server), installable via:
~~~ bash
sudo apt install ros-{ROS_DISTRO}-web-video-server
~~~