'use strict'
//lấy giá trị trên localstorage lưu vào mảng để xử lý
let size = localStorage.getItem('pageSizes') ? JSON.parse(localStorage.getItem('pageSizes')) : [4];
//gán các giá trị vào biến
var urlRequest = 'https://newsapi.org/v2/everything?q=apple&from=2022-04-25&to=2022-04-25&sortBy=popularity&apiKey=a7389a2ab0f34b1c9d1c3fedc2906cfc';
var currPage = parseInt($('#page-num').text());
var defNews = size ? size.pop() : 5;
let btnPre = $('#btn-prev');
let btnNext = $('#btn-next');

console.log(size);
console.log(size.pop());
console.log(defNews);

var iTemp = defNews*(currPage-1);
var numberOfNew = defNews*currPage;
//fetch api để lấy dữ liệu trả về
fetch(urlRequest)
.then(response => {return response.json();})
.then(data => {
	var newsArr = data.articles;
	console.log(newsArr);
	let length = newsArr.length;
	let numOfPage = length/defNews;
	console.log(numOfPage)
	//map dữ liệu vào mảng và render ra
	var newsList = newsArr.map(function(news) {
		return 	`<div style='display: flex; margin-bottom: 30px; border:1px solid #dfdfdf'>
		<div>
		<img src="${news.urlToImage}" style="width: 400px; height: 250px;" alt="">
		</div>
		<div style='padding: 0 20px;'>
		<h5>${news.title}</h5>
		<p style='font-size: 11px;'>${news.description}</p>
		<button class='btn btn-primary'>View</button>
		</div>
		</div>`});

	var nContent = '';
	//duyệt mảng để hiển thị đúng số lượng new/page	
	for(let i = 1 + iTemp; i <= numberOfNew; i++){
		nContent += newsList[i-1];
		document.getElementById('news-container').innerHTML = nContent;
	}
})
.catch(err => {alert('có lỗi');})

//check nuut prev
function checkPage(){
	currPage == 1 ?	btnPre.attr('hidden', 'hidden') : btnPre.removeAttr('hidden');
	btnNext.removeAttr('hidden');
}

$('#btn-next').mousedown(function(event) {
	checkPage();
});

//tạo sự kiện trên nút next
$('#btn-next').click(function(event) {
	let tmp = $('#page-num').text();
	parseInt(tmp);
	//fetch api để lấy dữ liệu về
	fetch(urlRequest)
	.then(response => {return response.json();})
	.then(data => {
		checkPage();

		var newsArr = data.articles;
		//tính toán giá trị page và news để render đúng news của page sau
		let length = newsArr.length;
		let numOfPage = length/defNews;
		//nếu số trang hiện tại nhỏ hơn số lượng trang thì tiến lên và render ra news
		if(tmp < numOfPage){
			tmp++;
			$('#page-num').text(tmp);
			currPage = parseInt($('#page-num').text());
			iTemp = defNews*(currPage-1);
			console.log(tmp);
			numberOfNew = defNews*currPage;
			var newsList = newsArr.map(function(news) {
				return 	`<div style='display: flex; margin-bottom: 30px; border:1px solid #dfdfdf'>
				<div>
				<img src="${news.urlToImage}" style="width: 400px; height: 250px;" alt="">
				</div>
				<div style='padding: 0 20px;'>
				<h5>${news.title}</h5>
				<p style='font-size: 11px;'>${news.description}</p>
				<button class='btn btn-primary'>View</button>
				</div>
				</div>`	});
			var nContent = '';
			//duyệt mảng số new và render ra new
			for(let i = 1 + iTemp; i <= numberOfNew; i++){

				nContent += newsList[i-1];
				document.getElementById('news-container').innerHTML = nContent;
			}
			checkPage();
		} else{
			btnNext.attr('hidden', 'hidden')

		}
	})
	.catch(err => {alert('có lỗi');})
})


$('#btn-prev').click(function(event) {
	checkPage();
	let tmp = $('#page-num').text();
	parseInt(tmp);
	//nếu số trang hiện tại lớn hơn số lượng trang thì lùi về và render ra news
	if(tmp > 1) {
		btnNext.removeAttr('hidden');

		tmp--;
		$('#page-num').text(tmp);
		currPage = parseInt($('#page-num').text());
		iTemp = defNews*(currPage-1);
		numberOfNew = defNews*currPage;

		fetch(urlRequest)
		.then(response => {
			return response.json();
		})
		.then(data => {
			var newsArr = data.articles;
			var newsList = newsArr.map(function(news) {
				return 	`<div style='display: flex; margin-bottom: 30px; border:1px solid #dfdfdf'>
				<div>
				<img src="${news.urlToImage}" style="width: 400px; height: 250px;" alt="">
				</div>
				<div style='padding: 0 20px;'>
				<h5>${news.title}</h5>
				<p style='font-size: 11px;'>${news.description}</p>
				<button class='btn btn-primary'>View</button>
				</div>
				</div>`
			});
		//duyệt mảng số new và render ra new
		var nContent = '';
		for(let i = 1 + iTemp; i <= numberOfNew; i++){
			nContent += newsList[i-1];
			document.getElementById('news-container').innerHTML = nContent;
		}
		checkPage();
		
	})

		.catch(err => {alert('có lỗi');})
	} else{
		btnPre.attr('hidden', 'hidden')
		
	}
})
