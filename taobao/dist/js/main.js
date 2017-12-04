/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	eval("window.onload = function() {\r\n\r\n\t//轮播图\r\n\tvar swiper = new Swiper(\".swiper-container\", {\r\n\t\tautoplay: {\r\n\t\t\tdelay: 3000,\r\n\t\t\tdisableOnInteraction : false,//？？不起作用\r\n\t\t},\r\n\t\tloop: true,\r\n\t\tlazy: {\r\n\t\t\tloadPrevNext: true,\r\n\t\t\tloadPrevNextAmount: 2,\r\n\t\t\tloadOnTransitionStart: true,\r\n\t\t},\r\n\t\tpagination: {\r\n\t\t\tel: \".swiper-pagination\"\r\n\t\t},\r\n\t\tobserver: true,\r\n\t\tobserverParents: true,\r\n\t});\r\n\r\n\t//关闭打开淘宝通知\r\n\tdocument.querySelector(\".close\").addEventListener(\"touchend\", function(event) {\r\n\t\tevent.preventDefault();//阻止默认事件\r\n\t\tthis.parentNode.style.display = \"none\";\r\n\t},false);\r\n\r\n\t//回到顶部\r\n\tvar timer = null;\r\n\tdocument.body.addEventListener(\"touchmove\", function(event) {\r\n\t\t\r\n\t\ttimer != undefined && (clearTimeout(timer));\r\n\t\ttimer = setTimeout(function() {\r\n\t\t\t\r\n\t\t}, 150);\r\n\r\n\t}, false);\r\n\r\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz9jNDViIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRiIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvL+i9ruaSreWbvlxyXG5cdHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLnN3aXBlci1jb250YWluZXJcIiwge1xyXG5cdFx0YXV0b3BsYXk6IHtcclxuXHRcdFx0ZGVsYXk6IDMwMDAsXHJcblx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uIDogZmFsc2UsLy/vvJ/vvJ/kuI3otbfkvZznlKhcclxuXHRcdH0sXHJcblx0XHRsb29wOiB0cnVlLFxyXG5cdFx0bGF6eToge1xyXG5cdFx0XHRsb2FkUHJldk5leHQ6IHRydWUsXHJcblx0XHRcdGxvYWRQcmV2TmV4dEFtb3VudDogMixcclxuXHRcdFx0bG9hZE9uVHJhbnNpdGlvblN0YXJ0OiB0cnVlLFxyXG5cdFx0fSxcclxuXHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0ZWw6IFwiLnN3aXBlci1wYWdpbmF0aW9uXCJcclxuXHRcdH0sXHJcblx0XHRvYnNlcnZlcjogdHJ1ZSxcclxuXHRcdG9ic2VydmVyUGFyZW50czogdHJ1ZSxcclxuXHR9KTtcclxuXHJcblx0Ly/lhbPpl63miZPlvIDmt5jlrp3pgJrnn6VcclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTsvL+mYu+atoum7mOiupOS6i+S7tlxyXG5cdFx0dGhpcy5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHR9LGZhbHNlKTtcclxuXHJcblx0Ly/lm57liLDpobbpg6hcclxuXHR2YXIgdGltZXIgPSBudWxsO1xyXG5cdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHJcblx0XHR0aW1lciAhPSB1bmRlZmluZWQgJiYgKGNsZWFyVGltZW91dCh0aW1lcikpO1xyXG5cdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdH0sIDE1MCk7XHJcblxyXG5cdH0sIGZhbHNlKTtcclxuXHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);