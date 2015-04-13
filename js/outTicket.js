$(window).ready(function(){ 
	createPage();
	$("#table").html(data.tableId);
	$("#date").html(data["date"]);
	$("#total").html(data["total"]);
	$("#oid").html(data['orderId']);


	//$("#goBack").tap(function(){ 
	//console.log("此处的跳转需要跳转到index.html 同时需要一些处理");
	//window.onload = "";

	//................................................
	//此处的跳转需要跳转到index.html 同时需要一些处理
	//});
});

function createEle(name,number,price){ 
	var dmsg = document.createElement("div");
	$(dmsg).addClass("msg");

	var dname = document.createElement("span");
	$(dname).text(name).addClass("name");

	var dnumber = document.createElement("span");
	$(dnumber).addClass("number");

	var dprice =document.createElement("span");
	$(dprice).addClass("price");

	var pre1 = document.createElement("label");
	$(pre1).text("份");	
	var pre2 = document.createElement("label");
	$(pre2).text("/份");

	var numberD = document.createElement("label");
	$(numberD).text(number).addClass("a");

	var priceD = document.createElement("label");
	$(priceD).text(price).addClass("a");

	dnumber.appendChild(numberD);
	dnumber.appendChild(pre1);
	dprice.appendChild(priceD);
	dprice.appendChild(pre2);

	dmsg.appendChild(dname);
	dmsg.appendChild(dnumber);
	dmsg.appendChild(dprice);

	document.getElementById('orderId').appendChild(dmsg);

}