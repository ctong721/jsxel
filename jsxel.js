jsxel = {
	color: ["#000000","#1D2B53","#7E2553","#008751",
			"#AB5236","#5F574F","#C2C3C7","#FFF1E8",
			"#FF004D","#FFA300","#FFEC27","#00E436",
			"#29ADFF","#83769C","#FF77AB","#FFCCAA"],
	size: 5,
	
	frame_count: 0,
	
	e: null,
	
	ratio: 1,

	random: function(start,end){
		var temp = start - end + 1;
		return Math.abs(Math.floor(Math.random()*temp)) + start;
	},

	init: function(w,h,s){
		this.size = s;
		c = document.createElement("canvas");
		ctx = c.getContext("2d");
		
		var devicePixelRatio = window.devicePixelRatio || 1;
		var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1; 
		this.ratio = devicePixelRatio / backingStoreRatio;
		
		c.width = w*this.size*this.ratio;
		c.height = h*this.size*this.ratio;
		c.style.width = w*this.size+'px';
		c.style.height = h*this.size+'px';
		ctx.scale(this.ratio, this.ratio);
		
		document.body.appendChild(c);
	},
	
	rect: function(x,y,w,h,col,lw){
		ctx.strokeStyle = col;
		ctx.lineWidth = lw;
		ctx.strokeRect(x,y,w,h);
	},
	
	frect: function(x,y,w,h,col){
		ctx.fillStyle = col;
		ctx.fillRect(x*this.size,y*this.size,w*this.size,h*this.size);
	},
	
	text: function(x,y,t,col,f="20px Verdana"){
		ctx.font = f;
		ctx.strokeStyle = col;
		ctx.strokeText(t,x,y);
	},

	cls: function(col){
		ctx.fillStyle = col;
		ctx.fillRect(0,0,c.width,c.height)
	},
	
	run: function(f,t=100){
		setInterval(function(){
			f();
			jsxel.frame_count++;
		},t);
	},

	touchstart: function(f){
		c.addEventListener("touchstart", function(e){
			jsxel.e = e || event;
			f();
		});
	},

	touchmove: function(f){
		c.addEventListener("touchmove", function(e){
			jsxel.e = e || event;
			f();
		});
	},

	touchend: function(f){
		c.addEventListener("touchend", function(e){
			jsxel.e = e || event;
			f();
		});
	},
	
	drawimg: function(img,x0,y0,w0,h0,x,y,w,h){
		if(x0==null && y0==null && w0==null && h0==null){
			ctx.drawImage(img,x,y,w,h);
		}else{
			ctx.drawImage(img,x0,y0,w0,h0,x,y,w,h);
		}
	},

	//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	sprite: function(img,x0,y0,w0,h0,x,y,w,h,f,ish){
		var i = jsxel.frame_count%f;
		if(ish){
			ctx.drawImage(img,x0+i*w0,y0,w0,h0,x,y,w,h);
		}else{
			ctx.drawImage(img,x0,y0+i*h0,w0,h0,x,y,w,h);
		}
	},

	newimg: function(src){
		var img = new Image();
		img.src = src;
		return img;
	},
	
	imgb64: function(img,x0,y0,w0,h0,w,h,callback){
		//var _img = new Image(w,h);
		var _c = document.createElement("canvas");
		var _ctx = _c.getContext("2d");
		_c.width = w*this.ratio;
		_c.height = h*this.ratio;
		_c.style.width = w+'px';
		_c.style.height = h+'px';
		_ctx.scale(this.ratio, this.ratio);
		
		_ctx.drawImage(img,x0,y0,w0,h0,0,0,w,h);
		//var imgData = _ctx.getImageData(0, 0, w, h);
		//_ctx.putImageData(imgData, 0, 0);
		//_img.src = _c.toDataURL('image/png');
		var _src = _c.toDataURL('image/png');
		callback(_src);
	},
	
	traimg: function(img,cstr){
		//旋转180 rotate(180deg)
		img.style.transform = cstr;
	},
	
	newau: function(src,noloop=false){
		audio = document.createElement("audio");
		audio.setAttribute("src",src);
		audio.setAttribute("loop",noloop);
		return audio;
	},

};
