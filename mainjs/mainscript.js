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