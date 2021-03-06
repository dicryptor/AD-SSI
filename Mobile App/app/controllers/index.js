var width150 = Alloy.Globals.calculateWidth(150);
var width200 = Alloy.Globals.calculateWidth(200);

var height30 = Alloy.Globals.calculateHeight(30);
////////////////////////////////////////////
var wifiscanner = require("com.whitepagecreation.wifiscanner");
var deviceid = "";
var permissions = ['android.permission.READ_PHONE_STATE', 'android.permission.ACCESS_FINE_LOCATION', 'android.permission.ACCESS_COARSE_LOCATION'];
var dialog = Ti.UI.createAlertDialog({
	message : '',
	ok : 'Okay',
	title : 'Oops!'
});

function requestDevId() {
	Ti.Android.requestPermissions(permissions, function(e) {
		if (e.success) {
			Ti.API.info("SUCCESS");
			if (Alloy.Globals.CheckInternetConnection) {
				deviceid = wifiscanner.getDeviceID();
				Ti.App.Properties.setString("deviceid", deviceid);
			} else {
				dialog.message = "Your device does not have internet. The system will try again to get your device id after 5 seconds.";
				dialog.title = "No internet connection";
				dialog.show();

				setTimeout(function() {
					requestDevId();
				}, 5000);
			}
		} else {
			Ti.API.info("ERROR: " + e.error);
		}
	});
}

////////////////////////////////////////////
var blocker = Ti.UI.createView({
	opacity : 0.5,
	backgroundColor : "#000",
	zIndex : 10,
	height : "100%",
	width : "100%",
	top : 0
});

var activityIndicator = Ti.UI.createActivityIndicator({
	color : '#000000',
	font : {
		fontFamily : "SourceSansPro-Regular",
		fontSize : Alloy.Globals.calculateHeight(20),
		fontWeight : 'bold'
	},
	message : 'Loading...',
	style : Ti.UI.ActivityIndicatorStyle.PLAIN,
	height : Ti.UI.SIZE,
	width : "50%",
});

var verticalView = Ti.UI.createView({
	layout : "vertical",
	height : Ti.UI.SIZE,
	width : "100%",
	top : Alloy.Globals.calculateHeight(150)
});
var psblogo = Ti.UI.createImageView({
	image : "/general/logo.jpg",
	width : width200
});
var tapview = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : "100%",
});
var fingerprint = Ti.UI.createImageView({
	image : "/general/fingerprint.png",
	width : Alloy.Globals.calculateWidth(150)
});
var tapme = Ti.UI.createLabel({
	text : "SIGN IN",
	font : {
		fontSize : Alloy.Globals.calculateHeight(20),
		fontWeight : "bold",
		fontFamily : "SourceSansPro-Regular"
	},
	color : "#404040",
	height : height30,
	width : "80%",
	backgroundColor : "#fff",
	textAlign : "center",
	opacity : 0
});
tapview.add(fingerprint);
tapview.add(tapme);
verticalView.add(psblogo);
verticalView.add(tapview);
////////////////////////////////////////////

////////////////////////////////////////////
var pressme = Ti.UI.createLabel({
	text : "<< swipe left to register",
	font : Alloy.Globals.font1,
	color : "#cb204c",
	height : height30,
	width : "80%",
	bottom : -height30,
	textAlign : "center",
	opacity : 0
});
////////////////////////////////////////////

////////////////////////////////////////////
$.index.add(blocker);
$.index.add(verticalView);
$.index.add(pressme);
$.index.add(activityIndicator);

blocker.hide();
////////////////////////////////////////////

////////////////////////////////////////////
$.index.orientationModes = [Ti.UI.PORTRAIT];
$.index.backgroundColor = "#fff";
$.index.open();
////////////////////////////////////////////

setTimeout(function() {
	tapme.animate(Ti.UI.createAnimation({
		duration : 800,
		opacity : 1
	}));
}, 500);

setTimeout(function() {
	pressme.animate(Ti.UI.createAnimation({
		duration : 800,
		opacity : 1,
		bottom : Alloy.Globals.calculateHeight(15)
	}));

	tapview.addEventListener("click", function() {

		if (!Alloy.Globals.CheckInternetConnection) {
			dialog.message = "Your device does not have internet connection. Please try again later.";
			dialog.title = "No internet connection";
			dialog.show();
			return false;
		}

		var wifis = wifiscanner.scanWifi();
		Ti.API.log("scannded wifis : " + wifis);
		var arraywifis = wifis.split(",");

		//validate
		Ti.API.log("check wifi if inside array");
		for ( x = 0; x < arraywifis.length; x++) {
			var split = arraywifis[x].split("|");

			if (Alloy.Globals.schoolwifiids.indexOf(split[1]) > -1) {
				Ti.API.log("school catch");
				Alloy.createController("login", {
					deviceid : deviceid
				});
				return false;
			}

			if (Alloy.Globals.teamwifis.indexOf(split[1]) > -1) {
				Ti.API.log("team catch");
				Alloy.createController("login", {
					deviceid : deviceid
				});
				return false;
			}

		}

		//show alert dialog
		dialog.message = "You are not in campus. Please try again.";
		dialog.title = "Sign in failed";
		dialog.show();
	});

	//test
	//tapview.fireEvent("click");
}, 1300);

function registerFunc(e) {
	if (e.direction == "left") {
		Alloy.createController("register", {
			deviceid : deviceid
		});
	}
}

$.index.addEventListener("swipe", registerFunc);

if (Ti.App.Properties.getString("deviceid", "none") == "none") {
	Ti.API.log("get ID");
} else {
	deviceid = Ti.App.Properties.getString("deviceid", "none");
	Ti.API.log("have ID");
}

if (Ti.App.Properties.getBool("loggedin")) {
	//if (true) {
	Ti.API.log("logged in");
	Alloy.createController("dashboard");
}

requestDevId();
