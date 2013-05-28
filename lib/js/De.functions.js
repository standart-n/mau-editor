function deAjax(url) {
	document.getElementById("deAjax").innerHTML="<script id=\"scAjax\" src=\"\" type=\"text/javascript\"></scr"+"ipt>";
	$('#dement').animate({top: '1px'},10,"linear",function(){ sendscipt(url); });
}
function sendscipt(url) {
    scr=document.getElementById("deAjax").getElementsByTagName("script")[0];
    //if(scr.setAttribute)scr.setAttribute("src",url);else scr.src=url;
    script=document.createElement('script'); script.src=url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
function deStyleHiddenObject(object) { deObject=$(object);
	deObject.css({'position': 'absolute'}); deObject.css({'display': 'none'});
	deObject.css({'float': 'left'}); deObject.css({'left': '0'});	
	deObject.css({'top': '0'});	deObject.width(0); deObject.height(0);
}
function deLoadJS(jsFile) { document.write('<script type="text/javascript" src="'+jsFile+ '"></scr' + 'ipt>'); }
function deGet_yes() { alert('YES!'); }
function deGet_no() { alert('NO!'); }
function deGetBrowserType() { Browser = false;
	userAgent = navigator.userAgent.toLowerCase(); 
	if ((userAgent.indexOf("opera") > -1) && (userAgent.indexOf("msie") > -1)) 	  { Browser = "Opera"; }
	if (userAgent.indexOf("opera/9") > -1)                                        { Browser = "Opera"; }
	if (userAgent.indexOf("netscape/7") > -1)                                     { Browser = "Netscape"; }
	if (userAgent.indexOf("netscape/8") > -1)                                     { Browser = "Netscape"; }
	if (userAgent.indexOf("firefox") > -1)                                        { Browser = "Firefox"; }
	if (userAgent.indexOf("msie") > -1)                                           { Browser = "Internet Explorer"; }
	return Browser;
}
function deBrowserDetectLite() {
  var ua        = navigator.userAgent.toLowerCase(); 
  var is_major  = parseInt(navigator.appVersion);
  var is_ie     = ((ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1));
  this.isGecko  = (ua.indexOf('gecko') != -1 && ua.indexOf('safari') == -1);
  this.isIE     = ( (ua.indexOf('msie') != -1) && (ua.indexOf('opera') == -1) && (ua.indexOf('webtv') == -1) ); 
  this.isIE4to5 = (is_ie && (is_major >= 4) && (is_major <= 5) );
}
function dePosition(event) { x=0; y=0;
	if (document.attachEvent != null) { // Internet Explorer & Opera
		x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
		y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	} else if (!document.attachEvent && document.addEventListener) { // Gecko
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	} return {x:x, y:y};
}
function preload() {
	if (document.images) {
		var imgsrc = preload.arguments;
		arr=new Array(imgsrc.length);
		for (var j=0; j<imgsrc.length; j++) {
			arr[j] = new Image;
			arr[j].src = imgsrc[j];
		}
	}
}
function deGetViewportSize() {				
 ua = navigator.userAgent.toLowerCase();
 isOpera = (ua.indexOf('opera')  > -1);
 isIE = (!isOpera && ua.indexOf('msie') > -1);
	deViewportHeight=((document.compatMode || isIE) && !isOpera) ? 
						(document.compatMode == 'CSS1Compat') ? 
							document.documentElement.clientHeight : 
								document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight;

	deViewportWidth=((document.compatMode || isIE) && !isOpera) ? 
						(document.compatMode == 'CSS1Compat') ? 
							document.documentElement.clientWidth : 
								document.body.clientWidth : (document.parentWindow || document.defaultView).innerWidth;
	return {height:deViewportHeight,width:deViewportWidth}
}
function deGetMonitorSize() {
	w=screen.width; h=screen.height;
	aw=screen.availWidth; ah=screen.availHeight;
	cd=screen.colorDepth ; 
    return {height:h,width:w,availWidth:aw,availHeight:ah,colorDepth:cd}
}
function deGetScreenSize() { Browser=deGetBrowserType();
	if (Browser=="Internet Explorer"){ 
		screenHeight=document.documentElement.clientHeight;
		screenWidth=document.documentElement.clientWidth;
		} else {
		screenHeight=window.innerHeight; 
		screenWidth=window.innerWidth; 
	}
	return {height:screenHeight,width:screenWidth}
}
function deGetScrollSize() {
	scrollLeft=(document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
	scrollTop=(document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	return {top:scrollTop,left:scrollLeft}
}
function deGetDocumentSize() {
	Browser=deGetBrowserType();
	if ((Browser!="Internet Explorer") && (Browser!="Opera") && (Browser!="Firefox") && (Browser!="Netscape")) {
		deDocHeight=(document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
	} else {
		deDocHeight=Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, deGetViewportSize().height);
	}
	if ((Browser!="Internet Explorer") && (Browser!="Opera") && (Browser!="Firefox") && (Browser!="Netscape")) {
		deDocWidth=(document.body.scrollWidth > document.body.offsetWidth)?document.body.scrollWidth:document.body.offsetWidth;
	} else {
		deDocWidth=Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollWidth : document.documentElement.scrollWidth, deGetViewportSize().width);
	}
	return {height:deDocHeight,width:deDocWidth}
}
function deMakeMaximumScreen() { window.moveTo(0,0); window.resizeTo(screen.availWidth, screen.availHeight); }
function deShowProperties(obj,objName) { result = "The properties for the " + objName + " object:" + "\n";
  for (var i in obj) {result += i + " = " + obj[i] + "\n";}
  return result;
}
function deGetObjectPosition(object) {	
    deTop=$(object).css('top').replace("px","");		
	deLeft=$(object).css('left').replace("px","");
	return {top:deTop,left:deLeft}
}
function deGetObjectParams(id) {
	deWidth = document.getElementById(id).offsetWidth; 
	deHeight = document.getElementById(id).offsetHeight;
	return {width:deWidth,height:deHeight}
}
function deGetObjectPagePos(id) { elem = document.getElementById(id); l = 0; t = 0;
   while (elem) { l+=elem.offsetLeft; t+=elem.offsetTop; elem=elem.offsetParent; }
   return {"left":l, "top":t};
}
function trim(s) { return rtrim(ltrim(s)); }
function ltrim(s) {	return s.replace(/^\s+/, ''); }
function rtrim(s) {	return s.replace(/\s+$/, ''); }
function deFalseError() { window.onerror=null; }
function deIsValidEmail (email, strict) { 
 if ( !strict ) email = email.replace(/^\s+|\s+$/g, '');
 return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email);
}
function deCheckPassStrength(a){  
  var c = 0;					
  var l = new Array(1, 2, 3, 4, 5);
  var lvl = 0;
  if(a.length<5){c=(c+7)}else if(a.length>4&&a.length<8){c=(c+14)}else if(a.length>7&&a.length<16){c=(c+17)}else if(a.length>15){c=(c+23)}if(a.match(/[a-z]/)){c=(c+9)}
  if(a.match(/[A-Z]/)){c=(c+10)}
  if(a.match(/\d+/)){c=(c+10)}
  if(a.match(/(.*[0-9].*[0-9].*[0-9])/)){c=(c+10)}
  if(a.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){c=(c+10)}
  if(a.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){c=(c+10)}
  if(a.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){c=(c+7)}
  if(a.match(/([a-zA-Z])/)&&a.match(/([0-9])/)){c=(c+7)}
  if(a.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)){c=(c+15)}
  if(c<21){lvl = 0}else
    if(c>20&&c<30){lvl = 1}else
      if(c>29&&c<43){lvl = 2}else
	if(c>42&&c<60){lvl = 3}else{
	  lvl = 4}
  return l[lvl];
}
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
		{ 	string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
		{	string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
		{	prop: window.opera, identity: "Opera" },
		{	string: navigator.vendor, subString: "iCab", identity: "iCab" },
		{	string: navigator.vendor,subString: "KDE", identity: "Konqueror" },
		{	string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
		{	string: navigator.vendor, subString: "Camino", identity: "Camino" },
		{ 	string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
		{	string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
		{ 	string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
		{ 	string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
	],
	dataOS : [ 
		{	string: navigator.platform, subString: "Win", identity: "Windows" },
		{	string: navigator.platform, subString: "Mac", identity: "Mac" },
		{	string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
		{	string: navigator.platform, subString: "Linux", identity: "Linux" }
	]
};
BrowserDetect.init();
function intval( mixed_var, base ) {
var tmp;
	if( typeof( mixed_var ) == 'string' ){
		tmp = parseInt(mixed_var);
		if(isNaN(tmp)){ return 0; } else{ return tmp.toString(base || 10); }
    } else if( typeof( mixed_var ) == 'number' ){
		return Math.floor(mixed_var);
	} else{
		return 0;
	}
}
function floatval(mixed_var) { return (parseFloat(mixed_var) || 0); }
jQuery.preloadImages=function(){
    if (typeof arguments[arguments.length - 1] == 'function') {
        var callback = arguments[arguments.length - 1];
    } else {
        var callback = false;
    }
    if (typeof arguments[0] == 'object') {
        var images = arguments[0];
        var n = images.length;
    } else {
        var images = arguments;
        var n = images.length - 1;
    }
    var not_loaded = n;
    for (var i = 0; i < n; i++) {
        jQuery(new Image()).attr('src', images[i]).load(function() {
            if (--not_loaded < 1 && typeof callback == 'function') {
                callback();
            }
        });
    }
}
