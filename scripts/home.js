'use strict'

function loadUser() {
	
	let [userArr] = localStorage.getItem('userArr') ? JSON.parse(localStorage.getItem('userArr')) : [];
	// console.log(userArr);

	if (userArr) {
		$('#login-modal').attr('hidden', 'hidden');
		$('#welcome-message').text(`Welcome back ${userArr.firstName}`);
		$('#main-content').removeAttr('hidden');
	} 
	else {
		$('#main-content').attr('hidden', 'hidden');
		$('#login-modal').removeAttr('hidden');
	}

	$('#btn-logout').click(function(event) {
		userArr = [];
		localStorage.setItem('userArr', JSON.stringify(userArr));

	});

}

