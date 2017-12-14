function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.login = Ti.UI.createWindow({
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var icon = Ti.UI.createImageView({
        image: "/general/profile.png",
        width: Alloy.Globals.calculateWidth(125),
        top: Alloy.Globals.calculateHeight(70),
        opacity: 0
    });
    $.login.add(icon);
    $.login.orientationModes = [ Ti.UI.PORTRAIT ];
    $.login.backgroundColor = "#f2f2f2";
    $.login.open();
    setTimeout(function() {
        icon.animate(Ti.UI.createAnimation({
            duration: 800,
            opacity: 1,
            top: Alloy.Globals.calculateHeight(90)
        }));
    }, 500);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;