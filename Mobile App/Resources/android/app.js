var Alloy = require("/alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Device = {
    version: Ti.Platform.version,
    versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
    versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
    width: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
    height: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
    dpi: Ti.Platform.displayCaps.dpi,
    orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait"
};

Alloy.Globals.Device.width = Alloy.Globals.Device.width / (Alloy.Globals.Device.dpi / 160);

Alloy.Globals.Device.height = Alloy.Globals.Device.height / (Alloy.Globals.Device.dpi / 160);

Alloy.Globals.calculateHeight = function(elHeight) {
    var defaultPer = elHeight / 667 * 100;
    var newHeight = defaultPer / 100 * Alloy.Globals.Device.height;
    newHeight = Math.round(newHeight);
    return newHeight;
};

Alloy.Globals.calculateWidth = function(elWidth) {
    var defaultPer = elWidth / 375 * 100;
    var newWidth = defaultPer / 100 * Alloy.Globals.Device.width;
    newWidth = Math.round(newWidth);
    return newWidth;
};

Alloy.Globals.font1 = {
    fontSize: Alloy.Globals.calculateHeight(16),
    fontFamily: "SourceSansPro-Regular"
};

Alloy.Globals.CheckInternetConnection = function() {
    Ti.API.info("Checking for internet connection...");
    return !!Ti.Network.online;
};

Alloy.Globals.schoolwifiids = [ "00:1e:10:0e:f8:a7", "14:cc:20:cb:ce:00", "00:24:6c:49:23:80", "00:24:6c:49:24:40", "00:24:6c:49:25:d0", "00:24:6c:49:45:c0", "24:de:c6:9f:6a:60", "d8:c7:c8:77:e8:a0", "00:24:6c:49:24:90", "00:24:6c:49:24:a0", "00:24:6c:49:46:00", "00:24:6c:49:47:40", "00:24:6c:49:22:80", "00:24:6c:49:35:c0", "00:24:6c:49:46:20", "00:24:6c:49:47:30", "00:24:6c:49:47:50", "00:24:6c:49:47:60", "00:24:6c:49:48:00", "00:24:6c:49:49:30", "00:24:6c:49:49:50", "00:24:6c:49:4b:30" ];

Alloy.createController("index");