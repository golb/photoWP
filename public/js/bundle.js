/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "public/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _options = __webpack_require__(1);

	var _options2 = _interopRequireDefault(_options);

	var fullScreenSlider = document.querySelector('.fullScreenSlider'),
	    linearSliderController = document.querySelector('.linearSliderController'),
	    naviArrows = document.querySelector('.naviArrows'),
	    exifBtn = document.querySelector('.exifBtn');

	var offsetX = _options2['default'].offsetX;
	var elements = _options2['default'].hslElements;

	var initial = function initial() {
	    initialFullscreenSlides();
	    initialArrows();
	    initialSliderController();
	    initialViewedMarker();
	    initialHslCalculator();
	    if (exifBtn) checkExif();
	};

	var initialFullscreenSlides = function initialFullscreenSlides() {
	    fullScreenSlider.children[0].classList.add('slideLeftIn');
	};

	var initialArrows = function initialArrows() {
	    linearSliderController.querySelector('ul').setAttribute('data-offset', 0);
	};

	var initialSliderController = function initialSliderController() {
	    var totalSlides = linearSliderController.getAttribute('data-total');
	    linearSliderController.querySelector('ul').style.width = offsetX * totalSlides + 'px';
	    for (var i = 0; i < totalSlides; i++) {
	        linearSliderController.querySelector('ul').children[i].style.width = offsetX + 'px';
	    }
	};

	var initialViewedMarker = function initialViewedMarker() {
	    __webpack_require__.e/* nsure */(1, function (require) {
	        var viewedMarker = __webpack_require__(2);
	        setTimeout(viewedMarker.update(1), 150);
	    });
	};

	var initialHslCalculator = function initialHslCalculator() {
	    __webpack_require__.e/* nsure */(2, function (require) {
	        var hsl = __webpack_require__(3);
	        hsl.calculator(elements);
	    });
	};

	var checkExif = function checkExif(elImage) {
	    __webpack_require__.e/* nsure */(3, function (require) {
	        var EXIF = __webpack_require__(4);
	        if (elImage === undefined) {
	            elImage = fullScreenSlider.children[0];
	        } else {
	            elImage = fullScreenSlider.children[elImage];
	        }
	        var img = new Image();
	        img.src = getComputedStyle(elImage).backgroundImage.slice(4, -1);
	        img.onload = function () {
	            EXIF.getData(img, function () {
	                if (!isEmptyObject(EXIF.getAllTags(this))) {
	                    var make = EXIF.getTag(this, "Make");
	                    var model = EXIF.getTag(this, "Model");
	                    var iso = EXIF.getTag(this, "ISOSpeedRatings");
	                    var focal = EXIF.getTag(this, "FocalLength");
	                    var aperture = EXIF.getTag(this, "ApertureValue");
	                    var artist = EXIF.getTag(this, "Artist");
	                    var exposure = EXIF.getTag(this, "ExposureTime");
	                    var allMetaData = EXIF.getAllTags(this);
	                    console.log('allMetaData', allMetaData);
	                    if (make == 'Canon' || make == 'canon') {
	                        make = '';
	                    } else {
	                        make = make + ' ';
	                    }
	                    document.getElementById('Aperture').children[0].textContent = 'Aperture f/' + (aperture.numerator / aperture.denominator).toFixed(1);
	                    document.getElementById('Camera').children[0].textContent = make + model;
	                    document.getElementById('ISO').children[0].textContent = 'ISO ' + iso;
	                    document.getElementById('Focal-Length').children[0].textContent = 'Focal Length ' + focal.numerator / focal.denominator + 'mm';
	                    document.getElementById('Exposure').children[0].textContent = 'Exposure ' + exposure.numerator + '/' + exposure.denominator;
	                    exifBtn.classList.remove('hide');
	                } else {
	                    exifBtn.classList.add('hide');
	                }
	            });
	        };
	    });
	};

	var isEmptyObject = function isEmptyObject(obj) {
	    for (var i in obj) {
	        if (obj.hasOwnProperty(i)) {
	            return false;
	        }
	    }
	    return true;
	};

	var linearSliderControllerHandler = function linearSliderControllerHandler(e) {
	    __webpack_require__.e/* nsure */(4, function (require) {
	        var slides = __webpack_require__(5);
	        var futureSlide = slides.slider(e.target);
	        if (futureSlide) checkExif(futureSlide);
	    });
	};

	var naviArrowsHandler = function naviArrowsHandler(e) {
	    __webpack_require__.e/* nsure */(5, function (require) {
	        var arrows = __webpack_require__(6);
	        arrows.slideNavs(e.target, offsetX);
	    });
	};

	var exifBtnHandler = function exifBtnHandler(e) {
	    __webpack_require__.e/* nsure */(6, function (require) {
	        var exif = __webpack_require__(7);
	        exif.showInfographics(fullScreenSlider);
	    });
	};

	document.addEventListener("DOMContentLoaded", initial);
	if (linearSliderController) linearSliderController.addEventListener('click', linearSliderControllerHandler, false);
	if (naviArrows) naviArrows.addEventListener('click', naviArrowsHandler, false);
	if (exifBtn) exifBtn.addEventListener('click', exifBtnHandler, false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var options = {

	    offsetX: 288,
	    hslElements: [document.querySelector('.exifBtn'), document.querySelector('.logo')]

	};

	exports['default'] = options;
	module.exports = exports['default'];

/***/ }
/******/ ]);