/*
	var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
var img=new Image()
img.src="flower.png"
image.onload = function(){cxt.drawImage(img,0,0)}
*/
var zWidth = $(window).width();
var zHeight = $(window).height();

$(window).ready(function(){ 
	initPage();
	addEvent();
});
var index=1;

function deadPhone(msg){ 

	if(msg['msgType']==0){ 
		$("#msgTip").text(msg['msg']);
	}else if(msg['msgType']==1){ 
		$("#sort").show();
		$("#header").show();
		$("#dishesBlock").show();
		$("#tip").hide();
	}
}

function addEvent(){ 
	$("#pay").click(function(){ 
		$("#orders").hide();
		$("#payAndService").hide();
		//$("#name").text("点餐");
		$("#menu").css({ 
			background:'#F4F4F4 url(./images/menu.png)'
		}).text("");
		$("#sort").show();
		$("#dishesBlock").show();
		$("#dishesBlock").empty();
		addMenus(1);
		$(this).hide();
	});
	$("#browse").click(function(){ 
		$("#sort").show();
		$("#header").show();
		$("#dishesBlock").show();
		$("#tip").hide();
		$('body').css("opacity","1");
		$("#menu").hide();
		$(".order").unbind("click");
	});
	$("#begin").click(function(){ 
		$("#sort").show();
		$("#header").show();
		$("#dishesBlock").show();
		$("#tip").hide();
		var phone = $("#phoneInput").val();
		$.ajax({                          //发送手机号
   				type: "POST",
   				url: ".。。。。。。。。。。。。。",
   				data: $('#phoneInput').val(),
   				success: function(msg){
    				deadPhone(msg);
  				 }
		});
	});
	$("#sort li").click(function(){
		$("#sort li").css("color","#333"); 
		index = $(this).attr("index");
		$("#dishesBlock").empty();
		addMenus(index);
		$(this).css("color","red");		
	});
	$("#menu").click(function(){ 
		//隐藏该隐藏的，出现该出现的。
		if($(this).text()==""){
			$("#goBack").show();
			$("#name").text("确认下单");
			$("#sort").hide();
			$("#dishesBlock").hide();
			$("#menu").css({ 
				background:'#F4F4F4',
				fontSize:'14px'
			}).text("清空");

			$("#orders").empty();
			$("#orders").show();
			$("#payAndService").show();
			$("#pay").show();
			var num = 0;
			var cou=0;
			for(var i=0;i<readyDishesData.length;i++){ 
				var name  = readyDishesData[i].hzname;
				var hotdeg  = readyDishesData[i].hdeg;
				var number = readyDishesData[i].hznumber;
				cou+=parseInt(number);
				var price  = readyDishesData[i].hzprice;
				num+=price;
				createOrders(name,hotdeg,price,number);
			}
			addTotal();//添加最后一项
			$(".left span").text(cou+"道菜");
			$(".right span").text(num+"元");	
		}else { 
			$("#orders").empty();
			for(var i=0;i<readyDishesData.length;i++){ 
				var name= readyDishesData[i].hzname;
				modifyFlog(name,1);
			}
			readyDishesData=[];
		}
	});

	$("#goBack").click(function(){ 
		$("#orders").hide();
		$("#payAndService").hide();
		$("#name").text("点餐");
		$("#menu").css({ 
			background:'url(./images/menu.png)'
		}).text("");
		$("#sort").show();
		$("#dishesBlock").show();
		$("#dishesBlock").empty();
		$("#sort li").css("color","#333"); 
		$("#first").css("color",'red');
		addMenus(1);
		$(this).hide();
	});

	$("#service").click(function(){ 
		if(readyDishesData.length<1){return ;}
		var data = document.getElementById("data");
		data.value=getData();
		document.fromdata.submit();
	});

	$("#phoneInput").focus(function(){$(this).val("")});
}

function addTotal(){ 
	var divObj = document.createElement("div");
	$(divObj).addClass("hzdishes");

	var leftObj  = document.createElement("div");
	$(leftObj).addClass("left").text("共：");

	var rightObj  = document.createElement("div");
	$(rightObj).addClass("right").text("共计：");

	var span1= document.createElement("span");
	$(span1).css("color","red");

	var span2= document.createElement("span");
	$(span2).css("color","red");

	rightObj.appendChild(span2);
	leftObj.appendChild(span1);

	divObj.appendChild(rightObj);
	divObj.appendChild(leftObj);

	var parent = document.getElementById("orders");
	parent.appendChild(divObj);
}

function initPage(){ 
	addMenus(1);
	$("#goBack").hide();
	$("#payAndService").hide();
	$("#sort").hide();
	$("#header").hide();
	$("#dishesBlock").hide();
	$("#tip").css({ 
		width:zWidth,
		height:zHeight
	});
	$("#payAndService").css("top","10px");
}

var readyDishesData=[];

function createDishes(name,hotdeg,price,flog){ 
	var dishes  = document.createElement("div");
	$(dishes).addClass("dishes");

	var dName = document.createElement("span");
	$(dName).addClass("oName").text(name);

	var hotDeg = document.createElement("img");
	$(hotDeg).addClass("hotdeg").attr("src","./images/h"+hotdeg+".png");

	var dPrice= document.createElement("span");
	$(dPrice).addClass("price").text("￥:"+price+"元");

	var dOrder = document.createElement("img");
	$(dOrder).addClass("order");
	dOrder.src ="./images/no.png";
	$(dishes).click(function(){
		var flogs = true;
			for(var i=0;i<readyDishesData.length;i++){ 
				if(name == readyDishesData[i].hzname){
					modifyFlog(name,1);
					flogs = false;
					dOrder.src="./images/no.png";
					readyDishesData.splice(i,1); 
				}			
			}
			if(flogs){
				modifyFlog(name);
				dOrder.src="./images/ok.png";
				json = { 
					hzname :name,
					hzprice:price,
					hznumber:'1',
					hdeg:hotdeg
				}
				readyDishesData.push(json);
			}
	});

	if(flog){ 	
		dOrder.src="./images/ok.png";
	}

	dishes.appendChild(dName);
	dishes.appendChild(hotDeg);
	dishes.appendChild(dPrice);
	dishes.appendChild(dOrder);

	var parent = document.getElementById("dishesBlock");
	parent.appendChild(dishes);
}



function modifyFlog(name,flog){
	for(var j=1;j<7;j++){ 
		var sortName = sortDishes[j-1];
		var length = eval('jsonData.contentData.'+sortName+'.length;');/********************/
		for(var i=0;i<length;i++){ 
			var foodname = 	eval('jsonData.contentData.'+sortName+'['+i+'].foodname;');
			if(foodname == name){
				if(!flog){ 
					eval('jsonData.contentData.'+sortName+'['+i+'].flog=1;');
				}else{ 
					eval('jsonData.contentData.'+sortName+'['+i+'].flog=0;');
				}
			}
		}
	}
}

function createOrders(name,hotdeg,price,number){ 
	var dishes  = document.createElement("div");
	$(dishes).addClass("dishes")//.css("marginTop","50px");

	var dName = document.createElement("span");
	$(dName).addClass("oName1").text(name);

	//var hotDeg = document.createElement("img");
	//$(hotDeg).addClass("hotdeg").attr("src","./images/h"+hotdeg+".png");

	var dPrice= document.createElement("span");
	$(dPrice).addClass("price1").text("￥:"+price+"元");

	var order = document.createElement("div");
	$(order).addClass("order1");
	var reduce = document.createElement("span");
	$(reduce).addClass("reduce").text("-");
	$(reduce).click(function(){ 
		if(parseInt($(count).text())>=1){
			$(count).text(parseInt($(count).text())-1);
			if($(count).text()==0){ 
				modifyFlog(name,1);
			}
		} 
		var num=0,cou=0;
		for(var i=0;i<readyDishesData.length;i++){ 
			if(readyDishesData[i].hzname == name){ 
				readyDishesData[i].hznumber = parseInt(readyDishesData[i].hznumber)-1;
			}
			if(readyDishesData[i].hznumber == 0){ 
				readyDishesData.splice(i,1);
			}
			num+=readyDishesData[i].hzprice*parseInt(readyDishesData[i].hznumber);
			cou+=parseInt(readyDishesData[i].hznumber);
		}
		$(".left span").text(cou+"道菜");
		$(".right span").text(num+"元");	
	});

	var count = document.createElement("span");
	$(count).addClass("count").text(number);
	var add = document.createElement("span");
	$(add).addClass("add").text("+");
	$(add).click(function(){ 
		$(count).text(parseInt($(count).text())+1);
		var num=0,cou=0;
		for(var i=0;i<readyDishesData.length;i++){ 
			if(readyDishesData[i].hzname == name){ 
				readyDishesData[i].hznumber = parseInt(readyDishesData[i].hznumber)+1;
			}
			
			num+=readyDishesData[i].hzprice*parseInt(readyDishesData[i].hznumber);
			cou+=parseInt(readyDishesData[i].hznumber);
		}
		$(".left span").text(cou+"道菜");
		$(".right span").text(num+"元");
	});


	order.appendChild(reduce);
	order.appendChild(count);
	order.appendChild(add);

	dishes.appendChild(dName);
	//dishes.appendChild(hotDeg);
	dishes.appendChild(dPrice);
	dishes.appendChild(order);

	var parent = document.getElementById("orders");
	parent.appendChild(dishes);
}
function getData(){ 
	var fromData="";
	for(var i=0;i<readyDishesData.length;i++){ 
		var name = readyDishesData[i].hzname;
		var price = readyDishesData[i].hzprice;
		var number = readyDishesData[i].hznumber;

		fromData += name+" "+price+" "+number+":";
	}
	return getJSonData(fromData);
}

function getJSonData(fromData){ 
	 var temp  = fromData.split(':');
	 var json = {};
	 json['content']=[];
	 json['total'] =$(".right span").text();
	 for(var i=0;i<temp.length;i++){ 
		 var temp1 = temp[i].split(' ');
		 var t = { 
		 	'name':temp1[0],
		 	'price':temp1[1],
		 	'count':temp1[2]
		 }
		 json['content'].push(t); 
	 }
	 json['content'].splice(json['content'].length-1,1)
	 var last=JSON.stringify(json);
	return last;
}