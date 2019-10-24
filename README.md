## Coding test for fronted position


I spent about 12 hours on this task. About 4 of them was on reading a bit about React and doing the tutorial on the ReactJS site. As I never looked at React before am I pretty confident there are plenty of things one could and should correct but the basic functionality is there. 

From the top of my head would these things need improvement:
* Unit tests, there is only one 
* Use Material-UI instead of Bootstrap
* Use a proper auto complete rather than a half working (arrows, enter etc)
* Style things, did a bare minimum to avoid eyes bleeding but nothing nice
* See if classes should be changed to functions

I used create-react-app to setup a basic project, and I installed react-bootstrap and react-minimal-pie-chart to get some basic styling and the graph working.

I also setup vagrant for working with it so to start it:
```shell
vagrant up
vagrant ssh
cd /var/www/frontend-test
npm start
```
And then going to http://localhost:3000 should do it.