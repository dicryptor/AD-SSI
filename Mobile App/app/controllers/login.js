// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var deviceid = args.deviceid || "";

var dialog = Ti.UI.createAlertDialog({
	message : '',
	ok : 'Okay',
	title : 'Oops!'
});

var icon = Ti.UI.createImageView({
	image : "/general/profile.png",
	width : Alloy.Globals.calculateWidth(125),
	top : Alloy.Globals.calculateHeight(70),
	opacity : 0
});

var bgview = Ti.UI.createView({
	backgroundColor : "#f2f2f2",
	width : "100%",
	top : 0,
	height : Alloy.Globals.calculateHeight(325)
});

var header = Ti.UI.createLabel({
	text : "Sign In",
	font : {
		fontSize : Alloy.Globals.calculateHeight(26),
		fontFamily : "SourceSansPro-Bold",
	},
	top : Alloy.Globals.calculateHeight(200),
	color : "#fff",
	bottom : Alloy.Globals.calculateHeight(15),
	height : Ti.UI.SIZE,
	width : "90%",
	textAlign : "center"
});

var form = Ti.UI.createView({
	width : "100%",
	backgroundColor : "#fff",
	height : Ti.UI.SIZE,
	layout : "vertical",
	top : Alloy.Globals.calculateHeight(260),
	borderRadius : 2
});

var fieldcontainer = Ti.UI.createView({
	height : Ti.UI.SIZE,
	top : Alloy.Globals.calculateHeight(15),
	bottom : Alloy.Globals.calculateHeight(15),
	backgroundColor : "#f2f2f2",
	width : "90%"
});

var fieldcontainer2 = Ti.UI.createView({
	height : Ti.UI.SIZE,
	bottom : Alloy.Globals.calculateHeight(15),
	backgroundColor : "#f2f2f2",
	width : "90%"
});

var studentid = Ti.UI.createTextField({
	color : "#000",
	hintText : "Enter Student ID",
	hintTextColor : "#b3b3b3",
	font : {
		fontSize : Alloy.Globals.calculateHeight(18),
		fontFamily : "SourceSansPro-Regular"
	},
	height : Ti.UI.SIZE,
	width : "100%",
	value : "",
	backgroundFocusedColor : "transparent",
	textAlign : "center"
});

var devid = Ti.UI.createTextField({
	color : "#000",
	font : {
		fontSize : Alloy.Globals.calculateHeight(18),
		fontFamily : "SourceSansPro-Regular"
	},
	height : Ti.UI.SIZE,
	width : "100%",
	value : deviceid,
	backgroundFocusedColor : "transparent",
	textAlign : "center",
	editable : false
});

var blocker = Ti.UI.createView({
	opacity : 0.5,
	backgroundColor : "#000",
	height : "100%",
	width : "100%",
	top : 0,
	left : 0,
	zIndex : 10
});

var activityIndicator = Ti.UI.createActivityIndicator({
	color : '#cb204c',
	font : {
		fontFamily : "SourceSansPro-Regular",
		fontSize : Alloy.Globals.calculateHeight(20),
		fontWeight : 'bold'
	},
	message : 'Signing in...',
	style : Ti.UI.ActivityIndicatorStyle.DARK,
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE
});

var buttons = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : "90%",
	bottom : -Alloy.Globals.calculateHeight(50)
});

var backbtncon = Ti.UI.createView({
	height : Alloy.Globals.calculateHeight(50),
	width : Alloy.Globals.calculateHeight(50),
	left : 0,
	backgroundColor : "#cb204c",
	borderRadius : 2
});

backbtncon.addEventListener("click", function() {
	$.login.close();
});

var submitbtn = Ti.UI.createLabel({
	text : "Submit",
	font : {
		fontSize : Alloy.Globals.calculateHeight(20),
		fontFamily : "SourceSansPro-Regular"
	},
	height : Alloy.Globals.calculateHeight(50),
	backgroundColor : "#fff",
	borderRadius : 2,
	width : Alloy.Globals.calculateWidth(270),
	right : 0,
	color : "#cb204c",
	textAlign : "center"
});

var backbtn = Ti.UI.createImageView({
	image : "/general/arrow.png",
	width : Alloy.Globals.calculateHeight(40),
	height : Ti.UI.SIZE,
	transform : Ti.UI.create2DMatrix().rotate(180)
});

backbtncon.add(backbtn);
buttons.add(backbtncon);
buttons.add(submitbtn);

fieldcontainer.add(studentid);
fieldcontainer2.add(devid);
form.add(fieldcontainer);
form.add(fieldcontainer2);

$.login.add(bgview);
$.login.add(icon);
$.login.add(header);
$.login.add(form);
$.login.add(buttons);
$.login.add(blocker);
$.login.add(activityIndicator);
blocker.hide();
activityIndicator.hide();
////////////////////////////////////////////
$.login.orientationModes = [Ti.UI.PORTRAIT];
$.login.backgroundColor = "#f2f2f2";
$.login.open();
$.login.addEventListener("swipe", function(e) {
	if (e.direction == "right") {
		$.login.close();
	}
});
////////////////////////////////////////////

setTimeout(function() {
	icon.animate(Ti.UI.createAnimation({
		duration : 800,
		opacity : 1,
		top : Alloy.Globals.calculateHeight(90)
	}));
	bgview.animate(Ti.UI.createAnimation({
		duration : 800,
		backgroundColor : "#cb204c"
	}));
}, 500);

setTimeout(function() {
	form.animate(Ti.UI.createAnimation({
		duration : 800,
		width : "90%"
	}));
	buttons.animate(Ti.UI.createAnimation({
		duration : 300,
		bottom : Alloy.Globals.calculateHeight(40)
	}));
}, 1300);

submitbtn.addEventListener("click", function() {
	if (studentid.value == "" || studentid.value == null) {
		dialog.message = "Student ID is required. Please try again!";
		dialog.show();
		return false;
	}

	if (devid.value == "" || devid.value == null) {
		dialog.message = "Device ID is required. Please try again!";
		dialog.show();
		return false;
	}

	if (!Alloy.Globals.CheckInternetConnection) {
		dialog.message = "Your device does not have internet connection. Please try again later.";
		dialog.title = "No internet connection";
		dialog.show();
		return false;
	}

	blocker.show();
	activityIndicator.show();

	var url = "https://cu-psb-ssi.appspot.com/signin";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.log("Received text : " + this.responseText);
			var json = JSON.parse(this.responseText);

			if (json.status == "success") {
				Ti.App.Properties.setBool("loggedin", true);
				Ti.App.Properties.setString("firstname", json.first_name);
				Ti.App.Properties.setString("lastname", json.last_name);
				Ti.App.Properties.setString("studentid", studentid.value);

				studentid.value = "";
				//go to dashboard
				Alloy.createController("dashboard");
			} else {
				studentid.value = "";
				dialog.message = "User has entered the wrong student ID or your logging into the wrong device. Please try again later.";
				dialog.title = "Sign in failed!";
				dialog.show();
			}

			blocker.hide();
			activityIndicator.hide();
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.log(e.error);

			dialog.message = "Something went wrong. Please try again later.";
			dialog.title = "Oops!";
			dialog.show();

			//show error
			blocker.hide();
			activityIndicator.hide();
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("POST", url);
	client.setRequestHeader('Content-type', 'application/json');
	client.send(JSON.stringify({
		id_imei : devid.value,
		student_id : studentid.value,
		signinout : "signin"
	}));
});
