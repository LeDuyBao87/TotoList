'use strict'

let pageSizes = localStorage.getItem('pageSizes') ? JSON.parse(localStorage.getItem('pageSizes')) : [];
console.log(pageSizes);
//gán event khi click vao nút submit
$('#btn-submit').click(function(event) {
	let inputSize = $('#input-page-size').val();
	//validat input nếu không có giá trị thì hiển thị thông báo và chặn event default của thẻ a
	if(!inputSize){
		alert('Please input pagesize');
		event.preventDefault();
	} else {
		// nếu có giá trị thì gán vào mảng và lưu vào localstorage
		pageSizes.push(inputSize);
		localStorage.setItem('pageSizes', JSON.stringify(pageSizes));
		let curr = localStorage.getItem('pageSizes')
		console.log(curr);
	}	
});