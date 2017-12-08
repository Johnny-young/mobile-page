window.onload = function() {

	var util = require("./util.js");

	toTopToggle();

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

	//toTop按钮显示 or 隐藏
	function toTopToggle() {
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
			toTop = document.querySelector(".to-top");
		if(scrollTop >= 600) {
			toTop.style.display = "block";
			toTop.addEventListener("touchend",backToTop, false);
		}else {
			toTop.style.display = "none";	
			toTop.removeEventListener("touchend", backToTop);
		}

		//body回到顶部
		function backToTop() {
			document.body.scrollTop = 0;
			toTop.style.display = "none";		
		}
	}
	
	(function(win, doc){
		var start_p,curr_p,marginTop,maxHeight,scrollTop,
			topFlag = false, bottomFlag = false,
			layout = doc.querySelector(".layout"),
			body = doc.body,
			scrollTop = body.scrollTop,
			clientHeight = win.innerHeight,
			WinHeight = win.innerHeight,//屏幕的高度
			appFlag = false,//淘宝app通知,默认开启

			//图片延迟加载关联参数
			lazyImgs = doc.getElementsByClassName("lazy-img"),//需要懒加载的图片
			lazyImgArr = [];//存放lazyImg的数组
		
		//存在懒加载图片的情况，实施懒加载
		if(lazyImgs.length) {

			/**
			 * [图片懒加载函数]
			 * @return {[type]} [null]
			 */
			//懒加载图片数组
			for(var i=0,len=lazyImgs.length; i<len; i++) {
				lazyImgArr.push(lazyImgs[i]);
			}

			//初始化
			if(scrollTop > 10) {
				lazyLoad();
			}

			/**
			 * [lazyLoad函数] 
			 * @return {[type]} [null]
			 */
			function lazyLoad() {
				//循环处理需要懒加载的图片
				for(var i=0, len=lazyImgArr.length; i<len; i++) {
					if(lazyImgArr[i] && (lazyImgArr[i].offsetTop-scrollTop < clientHeight + 300)) {
						imgLoad(lazyImgArr[i], i);
					}else{
						break;
					}
				}
				
				/**
				 * [图片进入视野，处理视野内的图片]
				 * @param  {[type]} img [视野内的图片]
				 * @param  {[type]} inx [该图片索引]
				 * @return {[type]}     [null]
				 */
				function imgLoad(img,inx) {
					img.style.backgroundImage = img.getAttribute("data-url");
					img.setAttribute("data-url","");
					img.classList = img.classList.value.split(" ").filter(function(val) {
						return val != "lazy-img";
					}).join(" ");
					lazyImgArr.splice(inx,1);
				}
			}

		}
		
		//关闭打开淘宝通知
		document.querySelector(".close").addEventListener("touchend", function(event) {
			event.preventDefault();//阻止默认事件
			this.parentNode.style.display = "none";
			appFlag = true;
		},false);

		body.addEventListener("touchstart", function(e) {
			curr_p = 0,maxHeight = 0;
			layout.classList != "layout" && (layout.classList = "layout");
			start_p = e.changedTouches[0].pageY;
			bodyHeight = body.clientHeight;
		}, false);

		//滚动页面
		body.addEventListener("touchmove", function(e) {
		
			util.throttle(function () {
				scrollTop = body.scrollTop;
				appFlag && (bodyHeight = body.clientHeight);
				//顶部下拉、底部上拉
				if(scrollTop == 0 || bodyHeight-scrollTop == WinHeight) {
					curr_p = e.changedTouches[0].pageY;
					marginTop = util.getStyle(layout,"marginTop");
				}
			}, 18, 30)();

			//图片懒加载
			lazyLoad && (lazyLoad());

			if(start_p && curr_p) {
				//顶部下拉、底部上拉
				var pullRange = curr_p - start_p;
				pullRange > 0 ? (maxHeight = pullRange <= 400 ? pullRange : 400) : ( maxHeight = pullRange > -400 ? pullRange : -400);
				layout.style.transform = "translateY(" + maxHeight + "px)";	
			}

			//回到顶部
			util.throttle(toTopToggle, 50, 100)();
		} ,false);

		//顶部下拉反弹、底部上拉反弹
		body.addEventListener("touchend", function() {
			if(((curr_p - start_p) > 0 && scrollTop == 0) || ((curr_p - start_p) < 0 && bodyHeight-scrollTop == WinHeight)) {
				layout.classList += " transition";
				layout.style.transform = "translateY(0)";
			}
		}, false);

	}(window, document));
	
	//列表信息滚动播放
	(function(win, doc) {

		var list = doc.querySelector(".list"),
			listLis = list.getElementsByTagName("li"),
			liNum = listLis.length,
			liHeight = parseInt(util.getStyle(listLis[0], "height")),
			listTimer = null,//定时器
			index = 0;//索引
		listTimer = setInterval(function() {

			list.classList += " active";
			list.style.transform = "translateY(" + -liHeight + "px)";
			var innerTimer = setTimeout(function() {
				clearTimeout(innerTimer);
				list.classList = "list";
				list.appendChild(list.firstChild);
				list.style.transform = "translateY(0px)";
			}, 1000);

		}, 2500);

	}(window, document));

	/**
	 * [countDown description] 倒计时
	 * @param  {obj} 	timeObj [时间对象]
	 * @return {function}    [倒计时运行函数]
	 */
	function countDown(timeObj) {

		var time = document.querySelector(".time"),
			hour = time.querySelector(".hour"),
			min = time.querySelector(".minute"),
			sec = time.querySelector(".second"),
			endFlag = false,//倒计时结束标志
			countTimer = null,
			h = parseInt(timeObj.hour),
			m = parseInt(timeObj.minute),
			s = parseInt(timeObj.second);

		//数据写入
		function setTime() {
			hour.innerHTML = util.formateZero(h);
			min.innerHTML = util.formateZero(m);
			sec.innerHTML = util.formateZero(s);
		}

		function numDecline() {
			if(s) {
				s--;
			}else {
				if(m) {
					m--;
					s = 59;
				}else {
					if(h) {
						h--;
						m = 59;
						s = 59;
					}else {
						h = 0;
						m = 0;
						s = 0;
						endFlag = true;
					}
				}
			}
		}

		function getRange(min, max) {
			return Math.round(Math.random()*(max-min) + min);
		}


		//倒计时结束后，产生随机时间，继续倒计时
		function randomStart() {
			if(endFlag) {
				h = getRange(0,23);
				m = getRange(0,59);
				s = getRange(0,59);
				countDown({
					hour: h,
					minute: m,
					second: s,
				})();
			}
		}
		
		return function() {

			//reset
			setTime(h, m, s);

			countTimer = setInterval(function() {
				numDecline(h,m,s);
				setTime(h,m,s);
				endFlag && (clearInterval(countTimer),randomStart(),endFlag=false);
			}, 1000); 
		};
	}

	//启动倒计时
	countDown({
		hour: 0,
		minute: 0,
		second: 10,
	})();



};