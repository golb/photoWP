'use strict';

import options from './options';

let fullScreenSlider = document.querySelector('.fullScreenSlider'),
    linearSliderController = document.querySelector('.linearSliderController'),
    naviArrows = document.querySelector('.naviArrows'),
    exifBtn = document.querySelector('.exifBtn');

const offsetX = options.offsetX;
const elements = options.hslElements;


const initial = () => {
    initialFullscreenSlides();
    initialArrows();
    initialSliderController();
    initialViewedMarker();
    initialHslCalculator();
    if (exifBtn) checkExif();
}

const initialFullscreenSlides = () => {
    fullScreenSlider.children[0].classList.add('slideLeftIn');
}

const initialArrows = () => {
    linearSliderController.querySelector('ul').setAttribute('data-offset', 0);
}

const initialSliderController = () => {
    let totalSlides = linearSliderController.getAttribute('data-total');
    linearSliderController.querySelector('ul').style.width = offsetX * totalSlides + 'px';
    for (let i = 0; i < totalSlides; i++) {
        linearSliderController.querySelector('ul').children[i].style.width = offsetX + 'px';
    }
}

const initialViewedMarker = () => {
    require.ensure([], function (require) {
        let viewedMarker = require('./viewedMarker');
        setTimeout(viewedMarker.update(1), 150);
    });
}

const initialHslCalculator = () => {
    require.ensure([], function (require) {
        let hsl = require('./hsl');
        hsl.calculator(elements);
    });
}

const checkExif = (elImage) => {
    require.ensure([], function (require) {
        let EXIF = require('./exifyIt');
        if (elImage === undefined) {
            elImage = fullScreenSlider.children[0];
        } else {
            elImage = fullScreenSlider.children[elImage];
        }
        let img = new Image();
        img.src = getComputedStyle(elImage).backgroundImage.slice(4, -1);
        img.onload = () => {
            EXIF.getData(img, function () {
                if (!isEmptyObject(EXIF.getAllTags(this))) {
                    let make = EXIF.getTag(this, "Make");
                    let model = EXIF.getTag(this, "Model");
                    let iso = EXIF.getTag(this, "ISOSpeedRatings");
                    let focal = EXIF.getTag(this, "FocalLength");
                    let aperture = EXIF.getTag(this, "ApertureValue");
                    let artist = EXIF.getTag(this, "Artist");
                    let exposure = EXIF.getTag(this, "ExposureTime");
                    let allMetaData = EXIF.getAllTags(this);
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
        }
    });
}

const isEmptyObject = (obj) => {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}


const linearSliderControllerHandler = (e) => {
    require.ensure([], function (require) {
        let slides = require('./slides');
        let futureSlide = slides.slider(e.target);
        if (futureSlide) checkExif(futureSlide);
    });    
}

const naviArrowsHandler = (e) => {
    require.ensure([], function (require) {
        let arrows = require('./arrows');
        arrows.slideNavs(e.target, offsetX);
    });
}

const exifBtnHandler = (e) => {
    require.ensure([], function (require) {
        let exif = require('./exif');
        exif.showInfographics(fullScreenSlider);
    });
}

document.addEventListener("DOMContentLoaded", initial);
if (linearSliderController) linearSliderController.addEventListener('click', linearSliderControllerHandler, false);
if (naviArrows) naviArrows.addEventListener('click', naviArrowsHandler, false);
if (exifBtn) exifBtn.addEventListener('click', exifBtnHandler, false);