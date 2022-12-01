// DOM Initialization
const main = document.getElementById('main-container');
const carousal = document.getElementById('slideshow-container');

// Fetch JSON
async function initializeConfig() {
    const requestUserConfig = './userconfig.json';
    const request = new Request(requestUserConfig);

    const response = await fetch(request);
    const userconfig = await response.json();

    populateConfig(userconfig);
}
initializeConfig();

async function initializeImages() {
    const requestImages = './images.json';
    const request = new Request(requestImages);

    const response = await fetch(request);
    const images = await response.json();

    populateCarousel(images);
}
initializeImages();

// Config
const config = {};

function populateConfig(userconfig) {
    Object.assign(config, userconfig);
    /* addFont(); */
}

// Add Font Family
/* function addFont() {
    const head = document.head;
    const fontSheet = document.createElement('link');
    const font = config.caption.text.fontFamily;

    fontSheet.rel = 'stylesheet';
    fontSheet.href = `https://fonts.googleapis.com/css?family=${font}`

    head.appendChild(fontSheet);
} */

//Carousel
function populateCarousel(obj) {
    const images = obj.images

    main.classList.add(imageConfig.position);

    for (const image of images) {
        function isImage(url) {
            return /\.(jpe?g|png|webp|avif|gif|svg)$/.test(url);
        }

        if (isImage(image.file)) {
            const slide = document.createElement('div');
            slide.classList.add('mySlides', imageConfig.transition);
            slide.style.animationDuration = `${imageConfig.duration}s`

            const img = document.createElement('img');
            img.src = `images/${image.file}`;
            img.style.borderRadius = `${imageConfig.rounding}px`;

            if (imageConfig.border.visibility == true) {
                img.style.outline = `${imageConfig.border.width}px solid ${imageConfig.border.color}`
            }

            const bgGlow = document.createElement('img');
            bgGlow.src = `images/${image.file}`;
            bgGlow.style.borderRadius = `${imageConfig.rounding}px`;
            bgGlow.classList.add('glow');

            if (imageConfig.glow.visibility == true) {
                bgGlow.style.display = 'block';
            };

            bgGlow.style.filter = `blur(${imageConfig.glow.size}px)`;
            bgGlow.style.opacity = imageConfig.glow.opacity;

            slide.appendChild(bgGlow);

            slide.appendChild(img);

            const capContainer = document.createElement('div');
            capContainer.classList.add('caption-container', 'text-padding', captionConfig.text.position);
            capContainer.style.opacity = captionConfig.text.opacity;

            slide.appendChild(capContainer);

            const caption = document.createElement('p');
            caption.classList.add('caption', captionConfig.text.transition);
            caption.textContent = image.caption;
            caption.style.color = captionConfig.text.color;
            caption.style.fontFamily = captionConfig.text.fontFamily;
            caption.style.fontSize = `${captionConfig.text.fontSize}px`;
            caption.style.fontWeight = captionConfig.text.fontWeight;
            caption.style.animationDuration = `${imageConfig.duration}s`;

            if (captionConfig.shadow.visibility == true) {
                caption.style.textShadow = `${captionConfig.shadow.offset}px ${captionConfig.shadow.offset}px ${captionConfig.shadow.size}px ${captionConfig.shadow.color}`;
            } else {
                caption.style.textShadow = 'none';
            }

            capContainer.appendChild(caption);

            carousal.appendChild(slide);
        }
    }
    showSlides();
}

// Carousel Functionality
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName('mySlides');

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = 'block';

    setTimeout(showSlides, imageConfig.duration * 1000);
}

window.addEventListener('load', () => {

})