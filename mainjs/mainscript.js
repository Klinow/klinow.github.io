var originalTitle = document.title;
let loadery = document.querySelector(".loading");
let body = document.querySelector("body");
const items = document.querySelectorAll(".item");
let index = 0;
let timer;
window.onload = function() {
	loadery.style.display = "none";
	body.style.overflow = "visible"
}

window.addEventListener('blur', function() {
	document.title = 'Error';
});
window.addEventListener('focus', function() {
	document.title = originalTitle;
});






$(function() {
	// 给 '汉堡菜单' 添加单击事件
	$(".ham").click(function(e) {
		// 加上阻止事件冒泡，确保点击事件不会传播到父元素
		e.stopPropagation();

		// 增删 .open
		let toggle = $(".ham");
		// 这里分情况: 是为了点击其他位置关闭弹出层时，不发生相互影响 
		if (toggle.hasClass("active")) {
			// 已经open就关上
			toggle.removeClass("active");
			$(".i-side-nav").removeClass("open");
			// 关闭全屏阴影
			$(".i-shade")[0].style.display = 'none';
		} else {
			// 没有open就打开(toggle按钮样式变化)
			toggle.addClass("active");
			// 侧边导航菜单打开
			$(".i-side-nav").addClass("open");
			// 打开全屏阴影，去除i-shadenav的display:none
			$(".i-shade")[0].style.display = 'block';
		}
	});

	// 添加点击弹出框之外的地方时关闭弹出框
	$(document).click(function(e) {
		let target = e ? e.target : window.event.srcElement;
		// 点击不是弹出框或者toggle按钮才关闭弹出框（也不包含toggla按钮，是因为会扰乱toggle按钮自身增删.open的逻辑）
		if (target.id != "i-side-nav" && !$(target).hasClass("ham") && target.id != "header") {
			$(".i-side-nav").removeClass("open");
			$(".ham").removeClass("active");
			$(".i-shade")[0].style.display = 'none';
		}
	});
});







function clearClasses() {
	items.forEach(item => item.classList.remove("active"));
}

function move() {
	clearClasses();
	items[index].classList.add("active");
}

function rightBtnClick() {
	index = (index + 1) % items.length;
	move();
}

timer = setInterval(rightBtnClick, 3000);

const container = items[0].parentNode;

container.addEventListener("mouseover", () => {
	clearInterval(timer);
	timer = setInterval(rightBtnClick, 3000);
});

container.addEventListener("mouseleave", () => {
	clearInterval(timer);
	timer = setInterval(rightBtnClick, 3000);
});







var elementToCheck = document.getElementById('main-a');

window.addEventListener('scroll', function() {
	var elementTop = elementToCheck.getBoundingClientRect().top;
	var topNav = document.getElementById('topnav');
	if (elementTop >= 0) {
		topNav.style.top = '0';
	} else {
		topNav.style.top = '-60px';
	}
});





function search() {
	const searchInput = document.getElementById('searchInput').value.toLowerCase();
	const resultsContainer = document.getElementById('results');
	resultsContainer.innerHTML = '';

	if (searchInput.trim() === '') {
		return; // If the input is empty, do not display any results
	}

	fetch('./mainjs/wenzhang.json') // Replace 'your_external_data.json' with the actual path to your JSON file
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				const name = data[key].name.toLowerCase();

				if (name.includes(searchInput)) {
					const listItem = document.createElement('li');
					listItem.className = 'result-item';
					listItem.textContent = name;
					listItem.setAttribute('data-url', data[key].url);
					listItem.addEventListener('click', redirectToURL);
					resultsContainer.appendChild(listItem);
				}
			}
		})
		.catch(error => console.error('Error fetching data:', error));
}

function redirectToURL(event) {
	const selectedUrl = event.currentTarget.getAttribute('data-url');
	window.location.href = selectedUrl;
}






$(document).ready(function() {
	// 点击搜索图标时显示搜索框
	$('.search').on('click', function() {
		$(".search-c")[0].style.display = 'block';
	});

	// 点击搜索框背景时隐藏搜索框
	$('.search-c').on('click', function(e) {
		if (e.target === this) {
			$(".search-c")[0].style.display = 'none';
		}
	});

	// 阻止搜索框内部点击事件冒泡到父级，防止触发上面的隐藏事件
	$('.search-z').on('click', function(e) {
		e.stopPropagation();
	});

});






function updateBeijingDateTime() {
	// 获取当前时间的 Date 对象
	var now = new Date();

	// 设置时区为东八区（北京时间）
	now.toLocaleString('en-US', {
		timeZone: 'Asia/Shanghai'
	});

	// 格式化日期
	var year = now.getFullYear();
	var month = (now.getMonth() + 1 < 10) ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
	var day = (now.getDate() < 10) ? "0" + now.getDate() : now.getDate();

	// 格式化时间
	var hours = (now.getHours() < 10) ? "0" + now.getHours() : now.getHours();
	var minutes = (now.getMinutes() < 10) ? "0" + now.getMinutes() : now.getMinutes();
	var seconds = (now.getSeconds() < 10) ? "0" + now.getSeconds() : now.getSeconds();

	// 构建日期时间字符串
	var dateTimeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

	// 将日期时间显示在页面上
	document.getElementById("beijing-date-time").innerHTML = dateTimeString;
}

// 每秒更新一次日期时间
setInterval(updateBeijingDateTime, 1000);

// 页面加载时立即更新日期时间
updateBeijingDateTime();





