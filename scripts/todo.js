'use strict'
let $todolist = $('#todo-list');

const checkUserCurr = function(){
	let [userArr] = localStorage.getItem('userArr') ? JSON.parse(localStorage.getItem('userArr')) : [];
	let taskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];

	let ulContent = '';

	// console.log(userArr.userName);
	let todolist = taskList.filter((tasks, index) =>{
		return (tasks.owner === userArr.userName);
	});
	// console.log(todolist);

	if(todolist.length > 0){
		todolist.forEach((todoListDetail, index) => {
			index++;
			let taskID = index;
			if(todoListDetail.isDone == false){
				ulContent += `<li  class='liTask t${index}' >${todoListDetail.task}<span class="close" onclick='deleteTask(${taskID})'>×</span></li>`;
				$todolist.html(ulContent);
			} else {
				ulContent += `<li  class='liTask t${index} checked' >${todoListDetail.task}<span class="close" onclick='deleteTask(${taskID})'>×</span></li>`;
				$todolist.html(ulContent);
			}
			
			$('.liTask').click(function(event) {
				$(this).toggleClass('checked');
				// console.log(this)

				let className = this.className;
				let idValue = className.slice(8, 9);

				if(todolist[idValue-1].isDone == false){
					(todolist[idValue-1].isDone = true);
					// console.log(todolist[idValue-1]);
					localStorage.setItem('taskList', JSON.stringify(taskList))
					
				} else if((todolist[idValue-1].isDone = true)) {
					(todolist[idValue-1].isDone = false);
					// console.log(todolist[idValue-1]);
					localStorage.setItem('taskList', JSON.stringify(taskList))
					
				}
			})	
		});
	} else {
		$todolist.html(`<li class='liTask' >No Task	<span class="close">×</span></li>`);
		// console.log('No Task');
	}
}

$('#btn-add').click(function(event) {
	let inputTask = $('#input-task').val();
	let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
	let taskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];
	let [userArr] = localStorage.getItem('userArr') ? JSON.parse(localStorage.getItem('userArr')) : [];
	let ulContent = '';

	// console.log(inputTask);
	if(inputTask){
		
		let todolist = taskList.filter((tasks, index) =>{
			return (tasks.owner === userArr.userName);
		});
		// console.log(todolist);

		let temp = {
			task: inputTask,
			owner: userArr.userName,
			isDone: false,

		};
		taskList.push(temp);
		// console.log(todolist)
		localStorage.setItem('taskList', JSON.stringify(taskList))

		checkUserCurr();
	} else {
		alert('Please input task');
	}
	$('#input-task').val('');
});


function deleteTask(id) {
	let taskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];
	taskList.splice(id, 1);
	localStorage.setItem('taskList', JSON.stringify(taskList));
	checkUserCurr();
	
}

