var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'register';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.register = Ti.UI.createWindow(
  { id: "register" });

  $.__views.register && $.addTopLevelView($.__views.register);
  exports.destroy = function () {};




  _.extend($, $.__views);



  var args = $.args;
  var deviceid = args.deviceid || "";

  var campusimg = Ti.UI.createImageView({
    image: "/general/psbcampus.jpg",
    width: "100%",
    top: 0,
    height: Ti.UI.SIZE,
    opacity: 0 });


  var scrollview = Ti.UI.createScrollView({
    layout: "vertical",
    width: "90%",
    scrollType: "vertical",
    height: Ti.UI.SIZE,
    backgroundColor: "#fff",
    zIndex: 1,
    borderRadius: 2 });


  var header = Ti.UI.createLabel({
    text: "Student Registration Form",
    font: {
      fontSize: Alloy.Globals.calculateHeight(26),
      fontFamily: "SourceSansPro-Bold" },

    top: Alloy.Globals.calculateHeight(15),
    color: "#cb204c",
    bottom: Alloy.Globals.calculateHeight(15),
    height: Ti.UI.SIZE,
    width: "90%" });


  var containers = [];

  for (x = 0; x < 5; x++) {
    containers[x] = Ti.UI.createView({
      height: Ti.UI.SIZE,
      bottom: Alloy.Globals.calculateHeight(15),
      backgroundColor: "#f2f2f2",
      width: "90%" });

  }

  var firstname = Ti.UI.createTextField({
    color: "#000",
    hintText: "Enter First Name",
    hintTextColor: "#b3b3b3",
    font: {
      fontSize: Alloy.Globals.calculateHeight(18),
      fontFamily: "SourceSansPro-Regular" },

    height: Ti.UI.SIZE,
    width: "100%",
    value: "",
    backgroundFocusedColor: "transparent",
    textAlign: "center" });


  var lastname = Ti.UI.createTextField({
    color: "#000",
    hintText: "Enter Last Name",
    hintTextColor: "#b3b3b3",
    font: {
      fontSize: Alloy.Globals.calculateHeight(18),
      fontFamily: "SourceSansPro-Regular" },

    height: Ti.UI.SIZE,
    width: "100%",
    value: "",
    backgroundFocusedColor: "transparent",
    textAlign: "center" });


  var studentid = Ti.UI.createTextField({
    color: "#000",
    hintText: "Enter Student ID",
    hintTextColor: "#b3b3b3",
    font: {
      fontSize: Alloy.Globals.calculateHeight(18),
      fontFamily: "SourceSansPro-Regular" },

    height: Ti.UI.SIZE,
    width: "100%",
    value: "",
    backgroundFocusedColor: "transparent",
    textAlign: "center" });


  var batch = Ti.UI.createTextField({
    color: "#000",
    hintText: "Enter Batch Number",
    hintTextColor: "#b3b3b3",
    font: {
      fontSize: Alloy.Globals.calculateHeight(18),
      fontFamily: "SourceSansPro-Regular" },

    height: Ti.UI.SIZE,
    width: "100%",
    value: "",
    backgroundFocusedColor: "transparent",
    textAlign: "center" });


  var devid = Ti.UI.createTextField({
    color: "#000",
    font: {
      fontSize: Alloy.Globals.calculateHeight(18),
      fontFamily: "SourceSansPro-Regular" },

    height: Ti.UI.SIZE,
    width: "100%",
    value: deviceid,
    backgroundFocusedColor: "transparent",
    textAlign: "center",
    editable: false });


  scrollview.add(header);

  containers[0].add(firstname);
  scrollview.add(containers[0]);

  containers[1].add(lastname);
  scrollview.add(containers[1]);

  containers[2].add(studentid);
  scrollview.add(containers[2]);

  containers[3].add(batch);
  scrollview.add(containers[3]);

  containers[4].add(devid);
  scrollview.add(containers[4]);

  var buttons = Ti.UI.createView({
    height: Ti.UI.SIZE,
    width: "90%",
    bottom: -Alloy.Globals.calculateHeight(50) });


  var backbtncon = Ti.UI.createView({
    height: Alloy.Globals.calculateHeight(50),
    width: Alloy.Globals.calculateHeight(50),
    left: 0,
    backgroundColor: "#cb204c",
    borderRadius: 2 });


  backbtncon.addEventListener("click", function () {
    $.register.close();
  });

  var backbtn = Ti.UI.createImageView({
    image: "/general/arrow.png",
    width: Alloy.Globals.calculateHeight(40),
    height: Ti.UI.SIZE,
    transform: Ti.UI.create2DMatrix().rotate(180) });


  backbtncon.add(backbtn);
  buttons.add(backbtncon);

  var submitbtn = Ti.UI.createLabel({
    text: "Register",
    font: {
      fontSize: Alloy.Globals.calculateHeight(20),
      fontFamily: "SourceSansPro-Regular" },

    height: Alloy.Globals.calculateHeight(50),
    backgroundColor: "#fff",
    borderRadius: 2,
    width: Alloy.Globals.calculateWidth(270),
    right: 0,
    color: "#cb204c",
    textAlign: "center" });


  var dialog = Ti.UI.createAlertDialog({
    message: '',
    ok: 'Okay',
    title: 'Oops!' });


  if (deviceid == "" || deviceid == null) {
    dialog.message = "We are unable to retrieve your device ID. Please try again!";
    dialog.show();
  }

  submitbtn.addEventListener("click", function () {

    if (firstname.value == "" || firstname.value == null) {
      dialog.message = "First name is required. Please try again!";
      dialog.show();
      return false;
    }

    if (lastname.value == "" || lastname.value == null) {
      dialog.message = "Last name is required. Please try again!";
      dialog.show();
      return false;
    }

    if (studentid.value == "" || studentid.value == null) {
      dialog.message = "Student ID is required. Please try again!";
      dialog.show();
      return false;
    }

    if (batch.value == "" || batch.value == null) {
      dialog.message = "Batch is required. Please try again!";
      dialog.show();
      return false;
    }

    if (devid.value == "" || devid.value == null) {
      dialog.message = "Device ID is required. Please try again!";
      dialog.show();
      return false;
    }

    if (Alloy.Globals.CheckInternetConnection == false) {
      dialog.message = "Your device does not have internet connection. Please try again.";
      dialog.title = "No internet connection";
      dialog.show();
      return false;
    }

    blocker.show();
    activityIndicator.show();

    var url = "https://cu-psb-ssi.appspot.com/register";
    var client = Ti.Network.createHTTPClient({

      onload: function (e) {
        Ti.API.log("Received text : " + this.responseText);
        var json = JSON.parse(this.responseText);

        firstname.value = "";
        lastname.value = "";
        studentid.value = "";
        batch.value = "";

        if (json.status.indexOf("Duplicate") >= 0) {
          dialog.message = "Your device is already tied with a student. Please try with a different device.";
          dialog.title = "Registration failed";
          dialog.show();
        } else {
          dialog.message = "Thank you for registering. Redirecting you to sign in page!";
          dialog.title = "Registration is successful";
          dialog.show();

          setTimeout(function () {
            $.register.close();
          }, 2000);
        }

        blocker.hide();
        activityIndicator.hide();
      },

      onerror: function (e) {
        Ti.API.log(e.error);

        dialog.message = "Something went wrong. Please try again later.";
        dialog.title = "Oops!";
        dialog.show();


        blocker.hide();
        activityIndicator.hide();
      },
      timeout: 5000 });


    client.open("POST", url);
    client.setRequestHeader('Content-type', 'application/json');
    client.send(JSON.stringify({
      id_imei: devid.value,
      first_name: firstname.value,
      last_name: lastname.value,
      student_id: studentid.value,
      batch: batch.value,
      role: "student" }));

  });

  buttons.add(submitbtn);

  var blocker = Ti.UI.createView({
    opacity: 0.5,
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 10 });


  var activityIndicator = Ti.UI.createActivityIndicator({
    color: '#cb204c',
    font: {
      fontFamily: "SourceSansPro-Regular",
      fontSize: Alloy.Globals.calculateHeight(20),
      fontWeight: 'bold' },

    message: 'Registering...',
    style: Ti.UI.ActivityIndicatorStyle.DARK,
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE });


  $.register.add(campusimg);
  $.register.add(scrollview);
  $.register.add(buttons);
  $.register.add(blocker);
  $.register.add(activityIndicator);
  blocker.hide();
  activityIndicator.hide();


  $.register.orientationModes = [Ti.UI.PORTRAIT];
  $.register.backgroundColor = "#f2f2f2";
  $.register.open();
  $.register.addEventListener("swipe", function (e) {
    if (e.direction == "right") {
      $.register.close();
    }
  });


  setTimeout(function () {
    campusimg.animate(Ti.UI.createAnimation({
      duration: 800,
      opacity: 1 }));

  }, 500);

  setTimeout(function () {
    buttons.animate(Ti.UI.createAnimation({
      duration: 300,
      bottom: Alloy.Globals.calculateHeight(40) }));

  }, 1300);









  _.extend($, exports);
}

module.exports = Controller;