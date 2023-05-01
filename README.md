# Marvelous V2.0 Front-End

## Background
This project is the front-end part of an assessment. It is a todo list project. The back-end part repository is here: [back-end](https://github.com/xuetongiqn/assessment-back-end)
## Online Demo
```
http://ec2-13-56-11-106.us-west-1.compute.amazonaws.com:8080/
```
## Description
This project is built in React. As requested, all the business logics are in the back-end. And there is a **websocket** connection between the server and every client. The server send the latest todo list and done list to client, then they are stored and displaied using **Redux**.

When there is an user interaction (such as add new task, complete a task or delete all tasks), client side will send a message to server. When server updated the data, it will **boardcast** the latest list to all of the clients.

If the page is in searching mode(the search input box is not empty), when one of the clients change the data(add new or complete task), the search results will update to the latest version immediately and automatically.

## Optionals and features
1. Syncing
When the backend data changes, clients will update in 1 **second**.
2. Unit test 
Unit test in back-end project.
3. Deploy
[Online Demo](http://ec2-13-56-11-106.us-west-1.compute.amazonaws.com:8080/)
4. feature1
If you add a task which is already done, you can click the ```READD``` button to readd it.
5. feature2
If you stop in search mode, if backend data changed, the latest result will update in time.


## Install
This project uses [React](https://react.dev/), [Socket.io](https://socket.io/), [Redux](https://redux.js.org/) and [Material UI](https://mui.com/). Please install the dependencies first.
```
$ npm install
```
or
```
$ yarn
```
## Launch in development mode
Use below command to launch the project. And you can see the page in browser:```http://localhost:3000/```. By default, the server side is listen to 8080 port, you can change the proxy setting in ```package.json```.
```
$ npm start
```
or
```
$ yarn start
```
## Build release
Use the command below, and the compiled files are in the ```build/``` folder.
```
$ npm build
```
or
```
$ yarn build
```