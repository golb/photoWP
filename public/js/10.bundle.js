webpackJsonp([10],{

/***/ 5:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var naviTabs = document.querySelector('.linearSliderController').querySelector('ul');

	var arrows = {

	    slideNavs: function slideNavs(target, offsetX) {
	        var slidesLength = offsetX * naviTabs.children.length,
	            currentOffset = +naviTabs.getAttribute('data-offset');

	        if (target.classList.item(1) == 'left' && currentOffset != 0) {
	            offsetX = offsetX + currentOffset;
	            naviTabs.style.transform = 'translateX(' + offsetX + 'px)';
	            naviTabs.setAttribute('data-offset', offsetX);
	        }

	        if (target.classList.item(1) == 'right') {
	            if (currentOffset == 0 && slidesLength > document.documentElement.clientWidth) {
	                naviTabs.style.transform = 'translateX(-' + offsetX + 'px)';
	                naviTabs.setAttribute('data-offset', '-' + offsetX);
	            } else if (currentOffset != 0 && slidesLength > document.documentElement.clientWidth) {
	                currentOffset = Math.abs(currentOffset);
	                if (slidesLength - offsetX - currentOffset >= document.documentElement.clientWidth) {
	                    offsetX = offsetX + currentOffset;
	                    naviTabs.style.transform = 'translateX(-' + offsetX + 'px)';
	                    naviTabs.setAttribute('data-offset', '-' + offsetX);
	                }
	            }
	        }
	    }

	};

	exports['default'] = arrows;
	module.exports = exports['default'];

/***/ }

});