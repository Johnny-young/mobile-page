window.onload = function() {

	//轮播图
	var swiper = new Swiper(".swiper-container", {
		autoplay: {
			delay: 3000,
			disableOnInteraction : false,//？？不起作用
		},
		loop: true,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
			loadOnTransitionStart: true,
		},
		pagination: {
			el: ".swiper-pagination"
		},
		observer: true,
		observerParents: true,
	});

	//关闭打开淘宝通知
	document.querySelector(".close").addEventListener("touchend", function(event) {
		event.preventDefault();//阻止默认事件
		this.parentNode.style.display = "none";
	},false);

	//回到顶部
	var timer = null;
	document.body.addEventListener("touchmove", function(event) {
		
		timer != undefined && (clearTimeout(timer));
		timer = setTimeout(function() {
			
		}, 150);

	}, false);

};