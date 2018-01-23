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
  this.__controllerPath = 'dashboard';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.dashboard = Ti.UI.createWindow(
  { id: "dashboard" });

  $.__views.dashboard && $.addTopLevelView($.__views.dashboard);
  exports.destroy = function () {};




  _.extend($, $.__views);



  var args = $.args;


  setInterval(function () {
    if (!Alloy.Globals.CheckInternetConnection) {
      dialog.message = "Your device does not have internet connection. Please try again later.";
      dialog.title = "No internet connection";
      dialog.show();
      return false;
    }

    var wifis = wifiscanner.scanWifi();
    Ti.API.log("scannded wifis : " + wifis);
    var arraywifis = wifis.split(",");


    Ti.API.log("check wifi if inside array");
    for (x = 0; x < arraywifis.length; x++) {
      var split = arraywifis[x].split("|");

      if (Alloy.Globals.schoolwifiids.indexOf(split[1]) > -1) {
        Ti.API.log("school catch");
        return false;
      }

      if (Alloy.Globals.teamwifis.indexOf(split[1]) > -1) {
        Ti.API.log("team catch");
        return false;
      }
    }


    dialog.message = "You are not in campus. Signing out...";
    dialog.title = "Sign out";
    dialog.show();

    Ti.App.Properties.setBool("loggedin", false);
    Ti.App.Properties.removeProperty("firstname");
    Ti.App.Properties.removeProperty("lastname");
    Ti.App.Properties.removeProperty("studentid");

    $.dashboard.close();
  }, 30 * 1000);

  var scrollview = Ti.UI.createScrollView({
    width: "100%",
    scrollType: "vertical",
    top: 0,
    layout: "vertical" });


  var headerview = Ti.UI.createView({
    top: -Alloy.Globals.calculateHeight(50),
    opacity: 0,
    backgroundColor: "#fff",
    width: "100%",
    height: Ti.UI.SIZE,
    zIndex: 15 });


  var welcomeview = Ti.UI.createView({
    left: 0,
    width: "75%",
    layout: "vertical",
    height: Ti.UI.SIZE,
    top: Alloy.Globals.calculateHeight(25),
    bottom: Alloy.Globals.calculateHeight(25) });


  var welcomelabel = Ti.UI.createLabel({
    text: "Welcome back,",
    height: Ti.UI.SIZE,
    width: "90%",
    font: {
      fontSize: Alloy.Globals.calculateHeight(22),
      fontFamily: "SourceSansPro-Bold" },

    color: "#000",
    bottom: Alloy.Globals.calculateHeight(5) });


  var uname = Ti.App.Properties.getBool('loggedin') ? Ti.App.Properties.getString('lastname') + ", " + Ti.App.Properties.getString('firstname') : "NA";
  var username = Ti.UI.createLabel({
    text: uname,

    height: Ti.UI.SIZE,
    width: "90%",
    font: {
      fontSize: Alloy.Globals.calculateHeight(18),
      fontFamily: "SourceSansPro-Bold" },

    color: "#cb204c" });



  welcomeview.add(username);

  var logoutBtnCon = Ti.UI.createView({

    backgroundColor: "#cb204c",
    right: -Alloy.Globals.calculateWidth(20),
    height: Ti.UI.SIZE,
    width: Alloy.Globals.calculateHeight(100),
    borderRadius: 2,
    transform: Ti.UI.create2DMatrix().rotate(270) });


  var logoutBtn = Ti.UI.createLabel({
    text: "LOGOUT",
    font: {
      fontSize: Alloy.Globals.calculateHeight(16),
      fontFamily: "SourceSansPro-Regular" },

    color: "#fff" });


  logoutBtnCon.add(logoutBtn);

  headerview.add(welcomeview);
  headerview.add(logoutBtnCon);


  var lessonstodayview = Ti.UI.createView({
    width: "100%",
    height: Ti.UI.SIZE,
    backgroundColor: "#cb204c",
    top: Alloy.Globals.calculateHeight(78) });


  var lessonheader = Ti.UI.createLabel({
    text: "No. of lessons today: ",
    font: {
      fontSize: Alloy.Globals.calculateHeight(22),
      fontFamily: "SourceSansPro-Bold" },

    top: Alloy.Globals.calculateHeight(30),
    bottom: Alloy.Globals.calculateHeight(30),
    color: "#fff",
    left: "5%" });

  lessonstodayview.add(lessonheader);

  var lessonnumbercon = Ti.UI.createView({
    height: Alloy.Globals.calculateHeight(50),
    width: Alloy.Globals.calculateHeight(50),
    borderRadius: Alloy.Globals.calculateHeight(25),
    backgroundColor: "#fff",
    right: Alloy.Globals.calculateWidth(100) });

  lessonstodayview.add(lessonnumbercon);

  var lessonnumber = Ti.UI.createLabel({
    text: "2",
    font: {
      fontSize: Alloy.Globals.calculateHeight(22),
      fontFamily: "SourceSansPro-Bold" },

    color: "#cb204c" });

  lessonnumbercon.add(lessonnumber);


  scrollview.add(lessonstodayview);

  $.dashboard.add(headerview);
  $.dashboard.add(scrollview);

  $.dashboard.orientationModes = [Ti.UI.PORTRAIT];
  $.dashboard.backgroundColor = "#f2f2f2";
  $.dashboard.open();
  $.dashboard.addEventListener("swipe", function (e) {
    if (e.direction == "right") {

    }
  });

  setTimeout(function () {
    headerview.animate(Ti.UI.createAnimation({
      duration: 800,
      opacity: 1,
      top: Alloy.Globals.calculateHeight(0) }));

  }, 500);

  logoutBtnCon.addEventListener("click", function () {
    if (!Alloy.Globals.CheckInternetConnection) {
      dialog.message = "Your device does not have internet connection. Please try again later.";
      dialog.title = "No internet connection";
      dialog.show();
      return false;
    }

    Ti.API.log("loggin out");

    var url = "https://cu-psb-ssi.appspot.com/signin";
    var client = Ti.Network.createHTTPClient({

      onload: function (e) {
        Ti.API.log("Received text : " + this.responseText);
        var json = JSON.parse(this.responseText);

        if (json.status == "success") {
          Ti.App.Properties.setBool("loggedin", false);
          Ti.App.Properties.setString("firstname", "");
          Ti.App.Properties.setString("lastname", "");
          Ti.App.Properties.setString("studentid", "");

          $.dashboard.close();
        }
      },

      onerror: function (e) {
        Ti.API.log(e.error);
      },
      timeout: 5000 });


    client.open("POST", url);
    client.setRequestHeader('Content-type', 'application/json');
    if (Ti.App.Properties.getString("studentid", "none") != "none") {
      client.send(JSON.stringify({
        id_imei: Ti.App.Properties.getString("deviceid"),
        student_id: Ti.App.Properties.getString("studentid"),
        signinout: "signout" }));

    } else {
      $.dashboard.close();
    }
  });




























  _.extend($, exports);
}

module.exports = Controller;