'use strict';


const hsl = {

    calculator(elements) {
        elements.forEach((element) => {
            //console.log('coordinates', element.getBoundingClientRect());
            hsl.generateCanvas(element, element.getBoundingClientRect());
        });
    },
    
    generateCanvas(element, coordinates) {
        let canvas = document.getElementById('hsl_' + element.className);
        let elementWidth = coordinates.width || coordinates.right - coordinates.left,
            elementHeight = coordinates.height || coordinates.bottom - coordinates.top;
        if (!canvas) {
            let canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'hsl_' + element.className);
            canvas.style.position = 'absolute';
            canvas.style.top = 0;
            canvas.style.left = 0;
            //canvas.style.zIndex = 100;
            canvas.style.display = 'none';
            canvas.width = elementWidth;
            canvas.height = elementHeight;
            document.body.appendChild(canvas);
        }
        this.drawInCanvas(coordinates.left, coordinates.top, elementWidth, elementHeight, 'hsl_' + element.className, (ctx) => {
            //console.log('element', element);
            let lightnessLines = {};
            for (let j = 0; j < elementHeight - 1; j++) {
                let lightnessLine = {};
                for (let i = 0; i < elementWidth - 1; i++) {
                    let pixel = ctx.getImageData(i, j, 1, 1);
                    let data = pixel.data;
                    let hsl = this.rgbHslConverter(data);
                    lightnessLine[hsl[2]] = (lightnessLine[hsl[2]] || 0) + 1;
                }
                console.log('lightnessLine', lightnessLine);
                let grade = this.gradeLightness(lightnessLine);
                console.log(grade);
                lightnessLines[grade] = (lightnessLines[grade] || 0) + 1;
                //lightnessLines['d'] = 100;
            }
            let color;
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
    
    drawInCanvas(x, y, w, h, idCanvas, callback) {
        let canvas = document.getElementById(idCanvas);
        let ctx = canvas.getContext('2d');
        let img = new Image();
        //img.src = 'file:///Users/romanufimov/business/html/amerika/public/img/redis_8.jpg';
        let poster = document.querySelector('.fullScreenSlider').querySelector('.slideLeftIn') || document.querySelector('.fullScreenSlider').querySelector('.slideRightIn');
        img.src = getComputedStyle(poster).backgroundImage.slice(4, -1);
        img.onload = () => {
            ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
            callback(ctx);
        }
    }, 
    
    rgbHslConverter(rgb) {
        let r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;

        let maxColor = Math.max(r, g, b),
            minColor = Math.min(r, g, b);
        
        let l = (maxColor + minColor) / 2,
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
        s *= 100,
        l *= 100;
        return [Math.round(h), Math.round(s), Math.round(l)];
    },
    
    gradeLightness(objLs) {
        let dividend = 0, 
            divider = 0;
        for (let l in objLs) {
            dividend += +l * objLs[l];
            divider += objLs[l];
        }
        let grade = Math.round(dividend / divider);
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
}


export default hsl;