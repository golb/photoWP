webpackJsonp([2],{

/***/ 3:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var hsl = {

	    calculator: function calculator(elements) {
	        elements.forEach(function (element) {
	            //console.log('coordinates', element.getBoundingClientRect());
	            hsl.generateCanvas(element, element.getBoundingClientRect());
	        });
	    },

	    generateCanvas: function generateCanvas(element, coordinates) {
	        var _this = this;

	        var canvas = document.getElementById('hsl_' + element.className);
	        var elementWidth = coordinates.width || coordinates.right - coordinates.left,
	            elementHeight = coordinates.height || coordinates.bottom - coordinates.top;
	        if (!canvas) {
	            var _canvas = document.createElement('canvas');
	            _canvas.setAttribute('id', 'hsl_' + element.className);
	            _canvas.style.position = 'absolute';
	            _canvas.style.top = 0;
	            _canvas.style.left = 0;
	            //canvas.style.zIndex = 100;
	            _canvas.style.display = 'none';
	            _canvas.width = elementWidth;
	            _canvas.height = elementHeight;
	            document.body.appendChild(_canvas);
	        }
	        this.drawInCanvas(coordinates.left, coordinates.top, elementWidth, elementHeight, 'hsl_' + element.className, function (ctx) {
	            //console.log('element', element);
	            var lightnessLines = {};
	            for (var j = 0; j < elementHeight - 1; j++) {
	                var lightnessLine = {};
	                for (var i = 0; i < elementWidth - 1; i++) {
	                    var pixel = ctx.getImageData(i, j, 1, 1);
	                    var data = pixel.data;
	                    var _hsl = _this.rgbHslConverter(data);
	                    lightnessLine[_hsl[2]] = (lightnessLine[_hsl[2]] || 0) + 1;
	                }
	                console.log('lightnessLine', lightnessLine);
	                var grade = _this.gradeLightness(lightnessLine);
	                console.log(grade);
	                lightnessLines[grade] = (lightnessLines[grade] || 0) + 1;
	                //lightnessLines['d'] = 100;
	            }
	            var color = undefined;
	            if ('d' in lightnessLines && !('l' in lightnessLines)) color = '#fff';
	            if ('l' in lightnessLines && !('d' in lightnessLines)) color = '#000';
	            if ('l' in lightnessLines && 'd' in lightnessLines) {
	                if (lightnessLines.d > lightnessLines.l) {
	                    console.log('пишем белым3');
	                    color = '#fff';
	                } else {
	                    console.log('пишем черным4');
	                    color = '#000';
	                }
	            }
	            console.log('lightnessLines', lightnessLines);
	            console.log('color', color);
	            element.style.color = color;
	            element.style.fill = color;
	            element.setAttribute('data-color', color);
	        });
	    },

	    drawInCanvas: function drawInCanvas(x, y, w, h, idCanvas, callback) {
	        var canvas = document.getElementById(idCanvas);
	        var ctx = canvas.getContext('2d');
	        var img = new Image();
	        //img.src = 'file:///Users/romanufimov/business/html/amerika/public/img/redis_8.jpg';
	        var poster = document.querySelector('.fullScreenSlider').querySelector('.slideLeftIn') || document.querySelector('.fullScreenSlider').querySelector('.slideRightIn');
	        img.src = getComputedStyle(poster).backgroundImage.slice(4, -1);
	        img.onload = function () {
	            ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
	            callback(ctx);
	        };
	    },

	    rgbHslConverter: function rgbHslConverter(rgb) {
	        var r = rgb[0] / 255,
	            g = rgb[1] / 255,
	            b = rgb[2] / 255;

	        var maxColor = Math.max(r, g, b),
	            minColor = Math.min(r, g, b);

	        var l = (maxColor + minColor) / 2,
	            s = 0,
	            h = 0;
	        if (maxColor != minColor) {
	            if (l < 0.5) {
	                s = (maxColor - minColor) / (maxColor + minColor);
	            } else {
	                s = (maxColor - minColor) / (2.0 - maxColor - minColor);
	            }

	            if (r == maxColor) {
	                h = (g - b) / (maxColor - minColor);
	            } else if (g == maxColor) {
	                h = 2.0 + (b - r) / (maxColor - minColor);
	            } else {
	                h = 4.0 + (r - g) / (maxColor - minColor);
	            }
	        }
	        h *= 60;
	        if (h < 0) h += 360;
	        s *= 100, l *= 100;
	        return [Math.round(h), Math.round(s), Math.round(l)];
	    },

	    gradeLightness: function gradeLightness(objLs) {
	        var dividend = 0,
	            divider = 0;
	        for (var l in objLs) {
	            dividend += +l * objLs[l];
	            divider += objLs[l];
	        }
	        var grade = Math.round(dividend / divider);
	        console.log('dividend', dividend);
	        console.log('divider', divider);
	        if (grade > 45) {
	            //console.log('пишем белым - яркость строки', grade);
	            return 'l';
	        } else {
	            //console.log('пишем черным - яркость строки', grade);
	            return 'd';
	        }
	    }
	};

	exports['default'] = hsl;
	module.exports = exports['default'];

/***/ }

});