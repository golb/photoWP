'use strict';

let naviTabs = document.querySelector('.linearSliderController').querySelector('ul');


const arrows = {

    slideNavs(target, offsetX) {
        let slidesLength = offsetX * naviTabs.children.length,
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
                if ((slidesLength - offsetX - currentOffset) >= document.documentElement.clientWidth) {
                    offsetX = offsetX + currentOffset;
                    naviTabs.style.transform = 'translateX(-' + offsetX + 'px)';
                    naviTabs.setAttribute('data-offset', '-' + offsetX);
                }
            }
        }      
    }

}


export default arrows;