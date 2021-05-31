'use strict';

let linearSliderController = document.querySelector('.linearSliderController'),
    marker = document.querySelector('.viewedMarker'),
    gradientMarker = document.querySelector('.gradientMarker');


const viewedMarker = {
    
    update(viewed) {
        let totalSlides = linearSliderController.getAttribute('data-total'),
            modifyMarker = viewed * 100 / totalSlides;

        marker.style.width = modifyMarker + '%';
        marker.querySelector('.nSlides').textContent = viewed + '/' + totalSlides;
        if (gradientMarker) gradientMarker.querySelector('.viewed').style.width = modifyMarker + '%';
    } 
    
}


export default viewedMarker;