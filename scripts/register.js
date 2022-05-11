'use strict'

$('#btn-submit').click(function(event) {
	let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')): [];
	// console.log(users);

	let firstName = $('#input-firstname').val();
	let lastName = $('#input-lastname').val();
	let userName = $('#input-username').val();
	let passWord = $('#input-password').val();
	let passWordConfirm = $('#input-password-confirm').val();
	let isError = false;

	let result = users.find((user, index) => {
		return (user.userName === userName);
	});

	console.log(result);

	if(!firstName) {
		alert('Please input First Name');
		isError = true;
	}

	if(!lastName) {
		alert('Please input Last Name');
		isError = true;
	}

	if(!userName) {
		alert('Please input User Name');
		isError = true;
	} else if(result) {
		isError = true;
		alert('UserName is matched, please choose another');
	}

	if(!passWord) {
		alert('Please input Password');
		isError = true;

	} else if(passWord.length < 8) {
		alert('Password must be greater than 8 character');
		isError = true;
	}

	if(!passWordConfirm) {
		alert('Please input Password Confirm');
		isError = true;

	} else if(passWordConfirm.length < 8) {
		alert('Password must be greater than 8 character');
		isError = true;

	} else if(passWordConfirm !== passWord){
		alert('PasswordConfirm is not matched');
		isError = true;
	}


	var dataUsers = {
		firstName: firstName,
		lastName: lastName,
		userName: userName,
		passWord: passWord,
	};

	console.log(dataUsers);
	if(isError === false) {
		let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')): [];
		users.push(dataUsers);
		// console.log(users);
		localStorage.setItem('users', JSON.stringify(users));
		alert('Đăng ký thành công')
	}

	$('#input-firstname').val('');
	$('#input-lastname').val('');
	$('#input-username').val('');
	$('#input-password').val('');
	$('#input-password-confirm').val('');

});