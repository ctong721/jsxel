w = 15;
h = 25;
s = 48/2;
x = 0;
y = 0;
p1 = f(w,h,500,20);
user = [{'name':'u1','x':3,'y':4,'zt':1,'color':8,'eat':0,'fx':0},
	{'name':'u2','x':3,'y':5,'zt':1,'color':4,'eat':0,'fx':0},
	{'name':'u3','x':3,'y':6,'zt':1,'color':5,'eat':0,'fx':0}]

function f(w,h,s,e){
	var point = [];
	for(i=0;i<w;i++){
		var tmp = [];
		for(j=0;j<h;j++){
			tmp[j] = 0;
		}
		point[i] = tmp;
	}
	for(i=0;i<w;i++){
		for(j=0;j<h;j++){
			point[i][j] = jsxel.random(9,12);
		}
	}
	for(i=0;i<s;i++){
		point[jsxel.random(0,w)][jsxel.random(0,h)] = 11;
	}
	for(i=0;i<e;i++){
		point[jsxel.random(0,w)][jsxel.random(0,h)] = 9;
	}
	return point;
}

function move(p1,user){
	for(i=0;i<user.length;i++){
		var zt = [0,0,0,0];
		var cz = [];
		var zx = -1;
		
		zt[0] = (user[i].x+1<w)?p1[user[i].x+1][user[i].y]:0;
		zt[1] = (user[i].y+1<h)?p1[user[i].x][user[i].y+1]:0;
		zt[2] = (user[i].x-1>=0)?p1[user[i].x-1][user[i].y]:0;
		zt[3] = (user[i].y-1>=0)?p1[user[i].x][user[i].y-1]:0;
		for(j=0;j<4;j++){
			if(zt[j]==11||zt[j]==9){
				cz.push(j);
			}
		}
		//console.log("cz len:"+cz.length);
		if(cz.length != 0){
			zx = cz[jsxel.random(-1,cz.length)];
		}
		//console.log("zx:"+zx);
		if(zx >= 0){
			if(zx == 0){
				user[i].x = user[i].x+1;
				user[i].fx = 0;
			}else if(zx == 1){
				user[i].y = user[i].y+1;
				user[i].fx = 1;
			}else if(zx == 2){
				user[i].x = user[i].x-1;
				user[i].fx = 2;
			}else if(zx == 3){
				user[i].y = user[i].y-1;
				user[i].fx = 3;
			}
		}
		
		if(user[i].zt==1 && p1[user[i].x][user[i].y] == 9){
			user[i].eat = user[i].eat+1;
			p1[user[i].x][user[i].y] = 11;
		}
		for(j=0;j<user.length;j++){
			if(j != i){
				if(user[i].x == user[j].x){
					if(user[i].y == user[j].y){
						if(user[i].eat > user[j].eat){
							user[j].zt = 0;
						}else if(user[i]['eat']<user[j]['eat']){
							user[i].zt = 0;
						}
					}
				}
			}
		}
	}
}


window.onload = function(){
	jsxel.init(w,h,s);
	img = jsxel.newimg("1.png");

	jsxel.touchstart(function(){
		x = Math.floor(jsxel.e.touches[0].pageX);
		y = Math.floor(jsxel.e.touches[0].pageY);
	});
	jsxel.touchmove(function(){
		x = Math.floor(jsxel.e.touches[0].pageX);
		y = Math.floor(jsxel.e.touches[0].pageY);
	});
	function draw(){
		jsxel.cls("#ffffff");
		move(p1,user);
		for(i=0;i<w;i++){
			for(j=0;j<h;j++){
				jsxel.frect(i,j,1,1,jsxel.color[p1[i][j]]);
			}	
		}
		for(i=0;i<user.length;i++){
			if(user[i].zt == 1){
				if(user[i].fx==0) jsxel.sprite(img,48*3,0,48,48,user[i].x*s,user[i].y*s,s,s,4,false);
				if(user[i].fx==1) jsxel.sprite(img,0,0,48,48,user[i].x*s,user[i].y*s,s,s,4,false);
				if(user[i].fx==2) jsxel.sprite(img,48,0,48,48,user[i].x*s,user[i].y*s,s,s,4,false);
				if(user[i].fx==3) jsxel.sprite(img,48*2,0,48,48,user[i].x*s,user[i].y*s,s,s,4,false);
			}
		}
		jsxel.text(10,30,jsxel.frame_count,jsxel.color[1])
		jsxel.text(100,30,user[0].eat,jsxel.color[user[0].color]);
		jsxel.text(150,30,user[1].eat,jsxel.color[user[1].color]);
		jsxel.text(200,30,user[2].eat,jsxel.color[user[2].color]);
		jsxel.text(250,30,x,jsxel.color[1]);
		jsxel.text(300,30,y,jsxel.color[1]);
	}
	jsxel.run(draw,300);
};
