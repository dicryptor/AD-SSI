// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var icon = Ti.UI.createImageView({
	image : "/general/profile.png",
	width : Alloy.Globals.calculateWidth(125),
	top : Alloy.Globals.calculateHeight(70),
	opacity : 0
});

$.login.add(icon);
////////////////////////////////////////////
$.login.orientationModes = [Ti.UI.PORTRAIT];
$.login.backgroundColor = "#f2f2f2";
$.login.open();
////////////////////////////////////////////

setTimeout(function() {
	icon.animate(Ti.UI.createAnimation({
		duration : 800,
		opacity : 1,
		top : Alloy.Globals.calculateHeight(90)
	}));
}, 500);
