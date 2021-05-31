webpackJsonp([1],{

/***/ 2:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var linearSliderController = document.querySelector('.linearSliderController'),
	    marker = document.querySelector('.viewedMarker'),
	    gradientMarker = document.querySelector('.gradientMarker');

	var viewedMarker = {

	    update: function update(viewed) {
	        var totalSlides = linearSliderController.getAttribute('data-total'),
	            modifyMarker = viewed * 100 / totalSlides;

	        marker.style.width = modifyMarker + '%';
	        marker.querySelector('.nSlides').textContent = viewed + '/' + totalSlides;
	        if (gradientMarker) gradientMarker.querySelector('.viewed').style.width = modifyMarker + '%';
	    }

	};

	exports['default'] = viewedMarker;
	module.exports = exports['default'];

/***/ }

});