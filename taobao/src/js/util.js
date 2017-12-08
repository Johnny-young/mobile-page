module.exports = {

	//函数节流
	throttle: function(fn, delay,mustDelay) {
		var timer = null;
		var start_t;

		return function() {
			var curr_t = +new Date() ,_this = this,	args = arguments;
			clearTimeout(timer);
			!start_t && (start_t = curr_t);
			if(curr_t - start_t >= mustDelay){
				fn();
			}else {
				timer = setTimeout(function() {
					fn();
				}, delay);
			}
		};
	},
	//获取去元素样式
	getStyle: function(obj,key) {
		return obj.currentStyle ? obj.currentStyle[key] : getComputedStyle(obj,false)[key];
	},
	//1位数字时，十位补0，例如： 1 -> 01
	formateZero: function(num) {
		return num < 10 ? ("0"+num) : (num);
	},

};