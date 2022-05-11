'use strict'

class Users {
	constructor(firstName, lastName, userName, passWord){
		this.firstName = firstName;
		this.lasName = lastName;
		this.userName = userName;
		this.passWord = passWord;
	}
}

class Task {
	constructor(task, owner, isDone){
		this.task = task;
		this.owner = owner;
		this.isDone = isDone;
	}
}

const task1 = new Task('Hit the gym','baobao',true);
let taskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];

if(taskList.length === 0){
	taskList.push(task1);
	localStorage.setItem('taskList', JSON.stringify(taskList));
} else {
	// console.log(taskList);
}

let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')): [];
const user1 = new Users('Bao', 'Le', 'baobao', '12345678');

if(users.length === 0) {
	users.push(user1);
	localStorage.setItem('users', JSON.stringify(users));
	// console.log(users);
	
} else {
	// console.log(users.length);
}

