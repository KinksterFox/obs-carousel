// Initialize Configuration
let imageConfig = {
    position: "left",
    transition: "image-fade",
    border: {
        visibility: false,
        color: "White",
        width: 3
    },
    glow: {
        visibility: true,
        size: 35,
        opacity: 0.75
    },
    rounding: 10,
    duration: 10
};

let captionConfig = {
    text: {
        fontFamily: "Amatic SC",
        fontSize: 24,
        fontWeight: "Normal",
        position: "bottom",
        color: "White",
        opacity: 1,
        transition: "text-slide"
    },
    shadow: {
        visibility: true,
        color: "Black",
        offset: 1,
        size: 2
    }
};

if (!localStorage.getItem('imageConfig')) {
    setStorage();
} else {
    getStorage();
};

if (!localStorage.getItem('captionConfig')) {
    setStorage();
} else {
    getStorage();
};

function setStorage() {
    localStorage.setItem('imageConfig', JSON.stringify(imageConfig));
    localStorage.setItem('captionConfig', JSON.stringify(captionConfig));
}

function getStorage() {
    imageConfig = JSON.parse(localStorage.getItem('imageConfig'));
    captionConfig = JSON.parse(localStorage.getItem('captionConfig'));
}

// Image Configuration
const imagePositionRadios = document.querySelectorAll('input[name="image-position"]');
imagePositionRadios.forEach((e) => {
    if (e.value == imageConfig.position) {
        e.checked = true;
    };

    e.addEventListener('click', () => {
        main.classList.remove(imageConfig.position);
        imageConfig.position = e.value;

        main.classList.add(imageConfig.position);

        setStorage();
    });
});

const imageTransition = document.getElementById('image-transition');
imageTransition.value = imageConfig.transition;

imageTransition.addEventListener('input', e => {
    document.querySelectorAll('.mySlides').forEach((s) => {
        s.classList.remove(imageConfig.transition);
    })

    imageConfig.transition = imageTransition.value;

    document.querySelectorAll('.mySlides').forEach((s) => {
        s.classList.add(imageConfig.transition);
    })
    setStorage();
});

const imageRounding = document.getElementById('image-radius');
imageRounding.value = imageConfig.rounding;

imageRounding.addEventListener('input', e => {
    imageConfig.rounding = imageRounding.value;
    imageRounding.value = imageConfig.rounding;

    document.querySelectorAll('img').forEach((i) => {
        i.style.borderRadius = `${imageConfig.rounding}px`;
    });
    setStorage();
});

const imageDuration = document.getElementById('image-duration');
imageDuration.value = imageConfig.duration + 's';

imageDuration.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        imageConfig.duration = parseFloat(imageDuration.value);
        imageDuration.value = imageConfig.duration + 's';

        document.querySelectorAll('.mySlides').forEach((i) => {
            i.style.animationDuration = `${imageConfig.duration}s`
        });
        setStorage();
    }
});

const imageBorderVisibility = document.getElementById('image-border-visibility');
imageBorderVisibility.checked = imageConfig.border.visibility;

imageBorderVisibility.addEventListener('click', () => {
    if (imageBorderVisibility.checked == true) {
        document.querySelectorAll('img:last-of-type').forEach((i) => {
            i.style.outline = `${imageConfig.border.width}px solid ${imageConfig.border.color}`
        });
        imageConfig.border.visibility = imageBorderVisibility.checked;
        imageBorderVisibility.checked = imageConfig.border.visibility;
    } else {
        document.querySelectorAll('img:last-of-type').forEach((i) => {
            i.style.outline = 'none';
        });
        imageConfig.border.visibility = imageBorderVisibility.checked;
        imageBorderVisibility.checked = imageConfig.border.visibility;
    }
    setStorage();
});

const imageBorderColor = document.getElementById('image-border-color');
const imageBorderColorBox = document.getElementById('image-border-color-box');
imageBorderColor.value = imageConfig.border.color;
imageBorderColorBox.style.backgroundColor = imageConfig.border.color;

imageBorderColor.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        imageConfig.border.color = imageBorderColor.value;
        imageBorderColorBox.style.backgroundColor = imageConfig.border.color;

        if (imageBorderVisibility.checked == true) {
            document.querySelectorAll('img:last-of-type').forEach((i) => {
                i.style.outline = `${imageConfig.border.width}px solid ${imageConfig.border.color}`
            });
        }
        setStorage();
    }
});

const imageBorderWidth = document.getElementById('image-border-width');
imageBorderWidth.value = imageConfig.border.width;

imageBorderWidth.addEventListener('input', e => {
    imageConfig.border.width = parseInt(imageBorderWidth.value);
    imageBorderWidth.value = imageConfig.border.width;

    if (imageBorderVisibility.checked == true) {
        document.querySelectorAll('img:last-of-type').forEach((i) => {
            i.style.outline = `${imageConfig.border.width}px solid ${imageConfig.border.color}`
        });
    };
    setStorage();
});

const imageGlowVisibility = document.getElementById('image-glow-visibility');
imageGlowVisibility.checked = imageConfig.glow.visibility;

imageGlowVisibility.addEventListener('click', () => {
    if (imageGlowVisibility.checked == true) {
        document.querySelectorAll('.glow').forEach((i) => {
            i.style.display = 'block';
        });
        imageConfig.glow.visibility = imageGlowVisibility.checked;
        imageGlowVisibility.checked = imageConfig.glow.visibility;
    } else {
        document.querySelectorAll('.glow').forEach((i) => {
            i.style.display = 'none';
        });
        imageConfig.glow.visibility = imageGlowVisibility.checked;
        imageGlowVisibility.checked = imageConfig.glow.visibility;
    };
    setStorage();
});

const imageGlowSize = document.getElementById('image-glow-size');
imageGlowSize.value = imageConfig.glow.size;

imageGlowSize.addEventListener('input', e => {
    imageConfig.glow.size = imageGlowSize.value;
    imageGlowSize.value = imageConfig.glow.size;

    if (imageGlowVisibility.checked == true) {
        document.querySelectorAll('.glow').forEach((i) => {
            i.style.filter = `blur(${imageConfig.glow.size}px)`;
        });
    };
    setStorage();
});

const imageGlowOpacity = document.getElementById('image-glow-opacity');
imageGlowOpacity.value = imageConfig.glow.opacity;

imageGlowOpacity.addEventListener('input', e => {
    imageConfig.glow.opacity = imageGlowOpacity.value;
    imageGlowOpacity.value = imageConfig.glow.opacity;

    if (imageGlowVisibility.checked == true) {
        document.querySelectorAll('.glow').forEach((i) => {
            i.style.opacity = imageConfig.glow.opacity;
        });
    }
    setStorage();
});

// Caption Configuration
const captionPositionRadios = document.querySelectorAll('input[name="caption-position"]');
captionPositionRadios.forEach((e) => {
    if (e.value == captionConfig.text.position) {
        e.checked = true;
    };

    e.addEventListener('click', () => {
        document.querySelectorAll('.caption-container').forEach((c) => {
            c.classList.remove(captionConfig.text.position);
        });

        captionConfig.text.position = e.value;

        document.querySelectorAll('.caption-container').forEach((c) => {
            c.classList.add(captionConfig.text.position);
        });
        setStorage();
    });
});

const textTransitionRadios = document.querySelectorAll('input[name="text-transition"]');
textTransitionRadios.forEach((e) => {
    if (e.value == captionConfig.text.transition) {
        e.checked = true;
    };

    e.addEventListener('click', () => {
        document.querySelectorAll('.caption').forEach((c) => {
            c.classList.remove(captionConfig.text.transition);
        });

        captionConfig.text.transition = e.value;

        document.querySelectorAll('.caption').forEach((c) => {
            c.classList.add(captionConfig.text.transition);
        });
        setStorage();
    });
});

const fontFamily = document.getElementById('font-family');
fontFamily.value = captionConfig.text.fontFamily;

const head = document.head;
const fontSheet = document.createElement('link');

let font = captionConfig.text.fontFamily;
fontSheet.rel = 'stylesheet';
fontSheet.href = `https://fonts.googleapis.com/css?family=${font}`

head.appendChild(fontSheet);

fontFamily.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        captionConfig.text.fontFamily = fontFamily.value;

        location.reload();
    };
    setStorage();
});

const fontSize = document.getElementById('font-size');
fontSize.value = captionConfig.text.fontSize;

fontSize.addEventListener('input', e => {
    captionConfig.text.fontSize = parseInt(fontSize.value);
    fontSize.value = captionConfig.text.fontSize;

    document.querySelectorAll('.caption').forEach((c) => {
        c.style.fontSize = `${captionConfig.text.fontSize}px`;
    });
    setStorage();
});

const fontWeight = document.getElementById('font-weight');
fontWeight.value = captionConfig.text.fontWeight;

fontWeight.addEventListener('input', e => {
    captionConfig.text.fontWeight = fontWeight.value;
    fontWeight.value = captionConfig.text.fontWeight;

    document.querySelectorAll('.caption').forEach((c) => {
        c.style.fontWeight = captionConfig.text.fontWeight;
    });
    setStorage();
});

const fontColor = document.getElementById('font-color');
const fontColorBox = document.getElementById('font-color-box');
fontColor.value = captionConfig.text.color;
fontColorBox.style.backgroundColor = captionConfig.text.color;

fontColor.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        captionConfig.text.color = fontColor.value;
        fontColor.value = captionConfig.text.color;
        fontColorBox.style.backgroundColor = captionConfig.text.color;

        document.querySelectorAll('.caption').forEach((c) => {
            c.style.color = captionConfig.text.color;
        });
        setStorage();
    }
});

const fontOpacity = document.getElementById('font-opacity');
fontOpacity.value = captionConfig.text.opacity;

fontOpacity.addEventListener('input', e => {
    captionConfig.text.opacity = fontOpacity.value;
    fontOpacity.value = captionConfig.text.opacity;

    document.querySelectorAll('.caption-container').forEach((c) => {
        c.style.opacity = captionConfig.text.opacity;
    });
    setStorage();
});

const ShadowVisibility = document.getElementById('text-shadow-visibility');
ShadowVisibility.checked = captionConfig.shadow.visibility;

ShadowVisibility.addEventListener('click', () => {
    if (ShadowVisibility.checked == true) {
        document.querySelectorAll('.caption').forEach((c) => {
            c.style.textShadow = `${captionConfig.shadow.offset}px ${captionConfig.shadow.offset}px ${captionConfig.shadow.size}px ${captionConfig.shadow.color}`;
        });
        captionConfig.shadow.visibility = ShadowVisibility.checked;
        ShadowVisibility.checked = captionConfig.shadow.visibility;
    } else {
        document.querySelectorAll('.caption').forEach((c) => {
            c.style.textShadow = 'none';
        });
        captionConfig.shadow.visibility = ShadowVisibility.checked;
        ShadowVisibility.checked = captionConfig.shadow.visibility;
    };
    setStorage();
});

const shadowColor = document.getElementById('text-shadow-color');
const shadowColorBox = document.getElementById('text-shadow-color-box');
shadowColor.value = captionConfig.shadow.color;
shadowColorBox.style.backgroundColor = captionConfig.shadow.color;


shadowColor.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        captionConfig.shadow.color = shadowColor.value;
        shadowColor.value = captionConfig.shadow.color;
        shadowColorBox.style.backgroundColor = captionConfig.shadow.color;

        if (ShadowVisibility.checked == true) {
            document.querySelectorAll('.caption').forEach((c) => {
                c.style.textShadow = `${captionConfig.shadow.offset}px ${captionConfig.shadow.offset}px ${captionConfig.shadow.size}px ${captionConfig.shadow.color}`;
            });
        }
        setStorage();
    }
});

const shadowOffset = document.getElementById('text-shadow-offset');
shadowOffset.value = captionConfig.shadow.offset;

shadowOffset.addEventListener('input', e => {
    captionConfig.shadow.offset = shadowOffset.value;
    shadowOffset.value = captionConfig.shadow.offset;

    if (ShadowVisibility.checked == true) {
        document.querySelectorAll('.caption').forEach((c) => {
            c.style.textShadow = `${captionConfig.shadow.offset}px ${captionConfig.shadow.offset}px ${captionConfig.shadow.size}px ${captionConfig.shadow.color}`;
        });
    };
    setStorage();
});

const shadowSize = document.getElementById('text-shadow-size');
shadowSize.value = captionConfig.shadow.size;

shadowSize.addEventListener('input', e => {
    captionConfig.shadow.size = shadowSize.value;
    shadowSize.value = captionConfig.shadow.size;

    if (ShadowVisibility.checked == true) {
        document.querySelectorAll('.caption').forEach((c) => {
            c.style.textShadow = `${captionConfig.shadow.offset}px ${captionConfig.shadow.offset}px ${captionConfig.shadow.size}px ${captionConfig.shadow.color}`;
        });
    };
    setStorage();
});

const Ranges = document.querySelectorAll('.range-wrap');
Ranges.forEach(wrap => {
    const range = wrap.querySelector('input');
    const bubble = wrap.querySelector('.bubble');

    range.addEventListener('mouseover', () => {
        bubble.style.opacity = 1;
    });

    range.addEventListener('mouseout', () => {
        bubble.style.opacity = 0;
    });

    if (bubble.classList.contains('percent')) {
        range.addEventListener('input', () => {
            setBubblePercent(range, bubble);
        });
        setBubblePercent(range, bubble);
    }

    if (bubble.classList.contains('px')) {
        range.addEventListener('input', () => {
            setBubblePx(range, bubble);
        });
        setBubblePx(range, bubble);
    }
});

function setBubblePercent(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = Math.round(val * 100) + '%';

    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

function setBubblePx(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val + 'px';

    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}