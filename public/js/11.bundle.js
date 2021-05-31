webpackJsonp([11],{

/***/ 6:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var exifBtn = document.querySelector('.exifBtn'),
	    btnText = document.querySelector('.exifBtn').querySelector('.btnText'),
	    exifCross = document.querySelector('.exifBtn').querySelector('.cross'),
	    exifData = document.querySelector('.exifData'),
	    lens = document.getElementById('lens').querySelectorAll('path'),
	    controller = document.getElementById('controller').querySelectorAll('path'),
	    sensors = document.getElementById('sensors').querySelectorAll('path'),
	    transformers = document.getElementById('transformers').querySelectorAll('path'),
	    cameraBody = document.getElementById('camera-body').querySelectorAll('path'),
	    calloutsBody = document.getElementById('callouts-body').querySelectorAll('path'),
	    calloutsLens = document.getElementById('callouts-lens').querySelectorAll('path'),
	    calloutsIso = document.getElementById('callouts-iso').querySelectorAll('path'),
	    linearSliderController = document.querySelector('.linearSliderController'),
	    naviArrows = document.querySelector('.naviArrows'),
	    gradientMarker = document.querySelector('.gradientMarker'),
	    logo = document.querySelector('.logo');

	var arrPath = [lens, controller, sensors, transformers, cameraBody, calloutsBody, calloutsLens, calloutsIso];
	var arrHideEls = [btnText, linearSliderController, naviArrows, gradientMarker];

	var exif = {

	    getData: function getData(wrapper, elementImg) {
	        var curColor = logo.getAttribute('data-color');
	        if (!exifCross.classList.contains('show')) {
	            initSvgStrokes();
	            exifCross.classList.toggle('show');
	            exifCross.classList.remove('hide');

	            // here was exif

	            logo.style.color = '#fff';
	            logo.style.fill = '#fff';
	        } else {
	            exifCross.classList.toggle('hide');
	            exifCross.classList.remove('show');
	            logo.style.color = curColor;
	            logo.style.fill = curColor;
	        }

	        wrapper.classList.toggle('downPane');
	        exifData.classList.toggle('show');
	        toggleHideElements();
	        //exifBtn.classList.toggle('todown');
	    }

	};

	var initSvgStrokes = function initSvgStrokes() {
	    for (var i = 0; i < arrPath.length; i++) {
	        [].forEach.call(arrPath[i], function (path) {
	            var lengthPath = path.getTotalLength();
	            path.style.strokeDasharray = lengthPath + ' ' + lengthPath;
	            path.style.strokeDashoffset = lengthPath;
	        });
	    }
	};

	var toggleHideElements = function toggleHideElements() {
	    for (var i = 0; i < arrHideEls.length; i++) {
	        arrHideEls[i].classList.toggle('hide');
	    }
	};

	exports['default'] = exif;
	module.exports = exports['default'];

/***/ }

});