'use strict';

import options from './options';
import viewedMarker from './viewedMarker';
import hsl from './hsl';


let linearSliderController = document.querySelector('.linearSliderController'),
    fullScreenSlider = document.querySelector('.fullScreenSlider'),
    exifBtn = document.querySelector('.exifBtn'),
    parentNaviPoster = 'LI';

const elements = options.hslElements;


const slides = {
    
    slider(target) {
        if (!this.clickedCurrentSlide(target)) {
            let currentSlide = this.getIndexSlide(linearSliderController.querySelector('.current')),
                futureSlide = this.getIndexSlide(target);
            if (futureSlide > currentSlide) {
                this.moveSlidesToLeft(currentSlide, futureSlide);
            } else {
                this.moveSlidesToRight(currentSlide, futureSlide);
            }
            linearSliderController.querySelector('ul').children[currentSlide].querySelector('.label').classList.remove('current');
            linearSliderController.querySelector('ul').children[futureSlide].querySelector('.label').classList.add('current');
            viewedMarker.update(+futureSlide + 1);
            hsl.calculator(elements);
            return futureSlide;
        }
        return false;
    },
    
    clickedCurrentSlide(node) {
        while (node != linearSliderController) {
            if (node.tagName == parentNaviPoster) {
                return node.querySelector('.label').classList.contains('current') ? true : false;
            }
            node = node.parentNode;
        }
    },
    
    getIndexSlide(node) {
        while (node != linearSliderController) {
            if (node.tagName == parentNaviPoster) {
                return node.getAttribute('data-img');
            }
            node = node.parentNode;
        }
    },
    
    moveSlidesToRight(currentSlide, futureSlide) {
        fullScreenSlider.children[currentSlide].className = '';
        fullScreenSlider.children[currentSlide].classList.add('slideRightOut');
        fullScreenSlider.children[futureSlide].className = '';
        fullScreenSlider.children[futureSlide].classList.add('slideRightIn'); 
    },
    
    moveSlidesToLeft(currentSlide, futureSlide) {
        fullScreenSlider.children[currentSlide].className = '';
        fullScreenSlider.children[currentSlide].classList.add('slideLeftOut');
        fullScreenSlider.children[futureSlide].className = '';
        fullScreenSlider.children[futureSlide].classList.add('slideLeftIn');
    }
    
}

export default slides;