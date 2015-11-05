/**
 * 幻灯片功能
 * 使用方法 var hcslider = new hcslider();
 * hcslider.run();
*/
function hcslider(args){
	args = args || {};
	var id = args.id || "hcslider";
	this.speed = args.speed || 400;//控制切换速度
	this.wrap = $("#"+id);//包裹幻灯的id
	this.current = 0;//当前显示的幻灯片
	this.slides = this.wrap.children();
	this.length = this.slides.length;

};

hcslider.prototype = {

	//初始化alt，转化为div嵌套在里面

	initAlt:function(){
		for(var i=0 ; i<this.length ; i++){
			var alt = $(this.slides[i]).find('img').attr("alt");
			$(this.slides[i]).append("<span class='alt'>"+alt+"</span>");
		}
	},

	//幻灯片reset状态
	reset:function(){
		$(this.slides).fadeOut();
		$('.alt').animate({"top":"-100px"},200);
	},

	//显示上一个幻灯片
	prev:function(){
		this.setc('prev');
		this.reset();
		$(this.slides[this.current]).fadeIn(this.speed);
		$(this.slides[this.current]).find('.alt').animate({"top":"300px"},200);
	},

	//显示下一个幻灯片
	next:function(){
		this.setc('next');
		this.reset();
		var current = $(this.slides[this.current]);
		var dataSrc = current.find("img").attr("data-src");
		var src = current.find("img").attr("src");
		if(!src){
			current.find("img").attr("src",dataSrc);
		}		
		current.fadeIn(this.speed);
		current.find('.alt').animate({"top":"300px"},200);		
	},

	/**
	 *保证current不超出边界,名称为set current，简写为setc，参数为action，简写为a
	*/
	setc:function(a){
		switch(a){

			case "next":
				if(this.current >= this.length -1)
					this.current = 0;
				else
					this.current += 1;
			break;

			case "prev":
				if(this.current <= 0)
					this.current = this.length - 1;
				else
					this.current -= 1;
			break;
		}
	},

	/**
	 * 初始化操作
	*/
	run:function(){
		//加入换页标签
		var arrows = "<span id='to-left' class='fa fa-angle-left'></span><span id='to-right' class='fa fa-angle-right'></span>";
		this.wrap.append(arrows);

		//初始化alt标签
		this.initAlt();
		
		//隐藏其他幻灯片
		$(this.slides).fadeOut(0);
		//显示当前幻灯片
		var current = $(this.slides[this.current]);
		var dataSrc = current.find("img").attr("data-src");
		var src = current.find("img").attr("src");
		if(!src){
			current.find("img").attr("src",dataSrc);
		}
		current.fadeIn(200);
		current.find('.alt').animate({"top":"300px"},400);


		//绑定事件
		var self = this;
		$("#to-left").click(function(){
			self.prev();
		});
		$("#to-right").click(function(){
			self.next();
		});
	}
}

//require.js模块
define(['jquery'],function($){
	return {"hcslider":hcslider};
});