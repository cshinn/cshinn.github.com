var myLat =0;
var myLng =0;
var me;
var wrequest = new XMLHttpRequest();
var trequest = new XMLHttpRequest();
var myOptions = {
			zoom: 11,
			center: new google.maps.LatLng(42.3464,-71.0976),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};
var map;
var memarker;
var tmarkers= new Array();
var cmarker;
var wmarker;
var infowindows= new Array();
var ttimes=new Array();
var alatlng=new Array();
var blatlng=new Array();
var tstops=[["Alewife Station",42.395428,-71.142483,"RALEN",""],
		["Davis Station",42.39674,-71.121815,"RDAVN","RDAVS"],
		["Porter Square Station",42.3884,-71.119149,"RPORN","RPORS"],
		["Harvard Square Station",42.373362,-71.118956,"RHARN","RHARS"],
		["Central Square Station",42.365486,-71.103802,"RCENN","RCENS"],
		["Kendall/MIT Station",42.36249079,-71.08617653,"RKENN","RKENS"],
		["Charles/MGH Station",42.361166,-71.070628,"RMGHN","RMGHS"],
		["Park St. Station",42.35639457,-71.0624242,"RPRKN","RPRKS"],
		["Downtown Crossing Station",42.355518,-71.060225,"RDTCN","RDTCS"],
		["South Station",42.352271,-71.055242,"RSOUN","RSOUS"],
		["Broadway Station",42.342622,-71.056967,"RBRON","RBROS"],
		["Andrew Station",42.330154,-71.057655,"RANDN","RANDS"],
		["JFK/UMass Station",42.320685,-71.052391,"RJFKN","RJFKS"],
		["Savin Hill Station",42.31129,-71.053331,"RSAVN","RSAVS"],
		["Fields Corner Station",42.300093,-71.061667,"RFIEN","RFIES"],
		["Shawmut Station",42.29312583,-71.06573796,"RSHAN","RSHAS"],
		["Ashmont Station",42.284652,-71.064489,"","RASHS"],
		["North Quincy Station",42.275275,-71.029583,"RQUIN","RQUIS"],
		["Wollaston Station",42.2665139,-71.0203369,"RWOLN","RWOLS"],
		["Quincy Center Station",42.251809,-71.005409,"RQUCN","RQUCS"],
		["Quincy Adams Station",42.233391,-71.007153,"RQUAN","RQUAS"],
		["Braintree Station",42.2078543,-71.0011385,"","RBRAS"]];

function drawMap()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	drawT();
	drawCW();
	//drawMe;
}


function drawT (){
	
	for(i=0;i<tstops.length;i++){
		if(i<=16){
			alatlng.push(new google.maps.LatLng(tstops[i][1],tstops[i][2]));
		}
		if(i==12||i>16){
			blatlng.push(new google.maps.LatLng(tstops[i][1],tstops[i][2]));
		}
		/*
		infowindows[i]=new google.maps.InfoWindow();
		
		google.maps.event.addListener(tmarkers[i],"click", function(){
			infowindows[i].setContent(tmarkers[i].title);
			infowindows[i].open(map,tmarkers[i]);
		});
		*/
	}
	drawStops();
	//drawWindows();
	drawLine();
	drawMe();
}
function drawStops(){
	for(i=0;i<tstops.length;i++){
		tmarkers[i]=new google.maps.Marker({
			position:new google.maps.LatLng(tstops[i][1],tstops[i][2]),
			title:tstops[i][0],
			icon: "mbta.png",
			map: map,
		});
	}
}
function drawLine(){
	redline=new google.maps.Polyline({
		clickable:false,
		map:map,
		path:alatlng,
		strokeColor:"red",
		strokeWeight: 8
	});
	redline2=new google.maps.Polyline({
		clickable:false,
		map:map,
		path:blatlng,
		strokeColor:"red",
		strokeWeight: 8
	});
}
/*
function getInfo(){
	trequest.open("GET","http://mbtamap-cedar.herokuapp.com/mapper/redline.json".,true);
	trequest.send();
	
	trequest.onreadystatechange=function(){
		if(trequest.readyState==4 && trequest.status==200){
			tstr=trequest.responseText;
			times=JSON.parse(tstr);
			for(i=0;i<times.length;i++){
				for(j=0;j<tstops.length;j++){
					if(times[i].PlatformKey==tstops[j][3]){
						ttimes.push()
			
}
*/
//drawWindows(){



//}

function drawCW (){
	wrequest.open("GET","http://messagehub.herokuapp.com/a3.json",true);
	wrequest.send();
	
	wrequest.onreadystatechange=function(){
		if(wrequest.readyState==4 && wrequest.status==200){
			str=wrequest.responseText;
			locations = JSON.parse(str);
			if(locations[0].name=="Waldo"){
				drawW(locations[0].loc.latitude,locations[0].loc.longitude);
				if(locations[1].name=="Carmen Sandiego"){
					drawC(locations[1].loc.latitude,locations[1].loc.longitude);
				}
			}
			else if(locations[0].name=="Carmen Sandiego"){
				drawC(locations[0].loc.latitude,locations[0].loc.longitude);
			}	
		}
	}
}

function drawC(lat, lng){
	cmarker=new google.maps.Marker({
		position:new google.maps.LatLng(lat,lng),
		title:"Carmen Sandiego",
		icon: "carmen.png",
		map: map,
	});
}

function drawW(lat, lng){
	wmarker=new google.maps.Marker({
		position: new google.maps.LatLng(lat,lng),
		title:"Waldo",
		icon:"waldo.png",
		map:map,
	});
}

function drawMe(){
	getMyLocation();
	me=new google.maps.LatLng(myLat,myLng);
	memarker=new google.maps.Marker({
		position: me,
		title: "You are here",
		map: map,
	});
}
function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

