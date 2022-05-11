'use strict'
// const userArr = [];

$('#btn-submit').click(function(event) {
	let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')): [];
	let passValue = $('#input-password').val();
	let userValue = $('#input-username').val();
	let isError = false;

	if(userValue){
		isError = false;
		// console.log(userValue);
	} else{
		isError = true;
		alert('Vui lòng nhập user name');
	}

	if(passValue){
		if(passValue.length < 8){
			alert('Password phải có ít nhất 8 kí tự')
			isError = true;
		} else {
			isError = false;
			// console.log(userValue);
		}

	} else{
		isError = true;
		alert('Vui lòng nhập password');
	}

	
	let userList = users.filter((user, index) => {
		return (userValue === user.userName && passValue === user.passWord)
	});
	
	if(userList){
		localStorage.setItem('userArr', JSON.stringify(userList));
	} 
});

$("a").click(function(event){
	let [userArr] = localStorage.getItem('userArr') ? JSON.parse(localStorage.getItem('userArr')) : [];
	// console.log(userArr);
	
	if (userArr) {
		event.stopPropagation();
	} else {
		event.preventDefault();
		alert('Username or Password is wrong')
	}
});