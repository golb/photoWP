webpackJsonp([6],{

/***/ 7:
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
	    logo = document.querySelector('.logo'),
	    maskMap = document.querySelector('.maskmap'),
	    mapExif = document.getElementById('mapid');

	var arrPath = [lens, controller, sensors, transformers, cameraBody, calloutsBody, calloutsLens, calloutsIso];
	var arrHideEls = [btnText, linearSliderController, naviArrows, gradientMarker];

	var exif = {

	    showInfographics: function showInfographics(wrapper) {
	        var curColor = logo.getAttribute('data-color');
	        if (!exifCross.classList.contains('show')) {
	            initSvgStrokes();
	            //drawGrids();
	            initMap();
	            initGradient();
	            exifCross.classList.toggle('show');
	            exifCross.classList.remove('hide');
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
	        exifBtn.classList.toggle('todown');
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

	var drawGrids = function drawGrids() {
	    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	    g.setAttributeNS(null, 'id', 'grids');
	    g.setAttributeNS(null, 'stroke', '#FFF');
	    for (var i = 0; i < document.documentElement.clientWidth / 26; i++) {
	        // vertical grids
	        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	        path.setAttributeNS(null, 'id', 'grid-vertical-' + i);
	        path.setAttributeNS(null, 'd', 'M' + i * 26 + ',0 L' + i * 26 + ',' + document.documentElement.clientHeight);
	        if (i % 4 === 0) {
	            path.setAttributeNS(null, 'stroke-opacity', '.094');
	        } else {
	            path.setAttributeNS(null, 'stroke-opacity', '.043');
	        }
	        g.appendChild(path);
	    }
	    for (var i = 0; i < document.documentElement.clientHeight / 26; i++) {
	        // horizontal grids
	        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	        path.setAttributeNS(null, 'id', 'grid-horizontal-' + i);
	        path.setAttributeNS(null, 'd', 'M0,' + i * 26 + ' L' + document.documentElement.clientWidth + ',' + i * 26);
	        if (i % 4 === 0) {
	            path.setAttributeNS(null, 'stroke-opacity', '.113');
	        } else {
	            path.setAttributeNS(null, 'stroke-opacity', '.041');
	        }
	        g.appendChild(path);
	    }
	    document.getElementById('camera').appendChild(g);
	};

	var initMap = function initMap() {
	    setHeight();
	    var mymap = L.map('mapid').setView([51.505, -0.09], 18);
	    L.tileLayer('https://api.mapbox.com/styles/v1/rembrand/cj2ixzeeq00382slpin7dy4n2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVtYnJhbmQiLCJhIjoiY2oyaXZuc3piMDAybTJ3bnNyYWJvYzNtdyJ9.IrC4yX1t0qcejtyZYEEVgg', {
	        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	        maxZoom: 18,
	        id: 'mapbox.mapbox-terrain-v2',
	        accessToken: 'pk.eyJ1IjoicmVtYnJhbmQiLCJhIjoiY2oyaXZuc3piMDAybTJ3bnNyYWJvYzNtdyJ9.IrC4yX1t0qcejtyZYEEVgg'
	    }).addTo(mymap);
	};

	var toggleHideElements = function toggleHideElements() {
	    for (var i = 0; i < arrHideEls.length; i++) {
	        arrHideEls[i].classList.toggle('hide');
	    }
	};

	var setHeight = function setHeight() {
	    mapExif.style.height = document.documentElement.clientHeight + 'px';
	};

	var initGradient = function initGradient() {
	    maskMap.style.zIndex = '401';
	};

	exports['default'] = exif;
	module.exports = exports['default'];

/***/ }

});