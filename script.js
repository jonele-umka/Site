// let hamburger = document.getElementById('hamburger')
//  hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('is-active')
//  })

const mainHeader = document.querySelector('.main-header');
const sideMenu = document.querySelector('.side-menu');
const sideMenuItems = document.querySelectorAll('.side-menu-item');
const sideMenuCloseDiv = document.querySelector('.side-menu-close-div');

const HEADER_HEIGHT = 70;
const TOP_DISTANCE_TO_HIDE_THE_HEADER = 330;
const SIDE_MENU_WIDTH = 1000;

const DEFAULT_TRANSITION_TIME = 350;

// SHOW/HIDE MAIN HEADER ON SCROLL
const showMainHeader = () => (mainHeader.style.top = '0');
const hideMainHeader = () => (mainHeader.style.top = `-${HEADER_HEIGHT}px`);
let previousScrollPosition = window.pageYOffset;

const toggleMainHeader = (window.onscroll = () => {
	let currentScrollPosition = window.pageYOffset;
	if (
		previousScrollPosition > currentScrollPosition ||
		currentScrollPosition < TOP_DISTANCE_TO_HIDE_THE_HEADER
	)
		showMainHeader();
	else hideMainHeader();
	previousScrollPosition = currentScrollPosition;
});

// TOGGLE SIDE MENU
let sideMenuState = 0;
const openSideMenu = () => {
	sideMenu.style.left = '0';
	setTimeout(
		() => (sideMenuCloseDiv.style.background = 'rgba(0, 0, 0, 0.6)'),
		DEFAULT_TRANSITION_TIME
	);
};

const closeSideMenu = () => {
	sideMenuCloseDiv.style.background = 'rgba(0, 0, 0, 0)';
	setTimeout(
		() => (sideMenu.style.left = `-${SIDE_MENU_WIDTH}px`),
		DEFAULT_TRANSITION_TIME
	);
	sideMenuState = 0;
};

const toggleSideMenu = (n) => {
	sideMenuState += n;
	switch (sideMenuState) {
		case 1:
			openSideMenu();
			break;
		default:
			closeSideMenu();
	}
};


const closeSideMenuSelectingItem = (() =>
	sideMenuItems.forEach((item) =>
		item.addEventListener('click', closeSideMenu)
	))();
sideMenuCloseDiv.addEventListener('click', closeSideMenu);


let but = document.getElementById('button');
but.addEventListener('click', () => {
	but.classList.toggle('is-active');
	
});

let qwe = document.querySelector('.main-header-side-menu-button')
let rty = document.querySelectorAll('.stripes')
qwe.addEventListener('click', () => {
    qwe.classList.toggle('bur')
})


// var rangeSlider = document.getElementById('range-slider');

// var rangeLabel = document.getElementById('bar');

// rangeSlider.addEventListener('input', showSliderValue, false);

// function showSliderValue() {
// 	rangeLabel.innerHTML = rangeSlider.value;
// 	var labelPosition = rangeSlider.value / rangeSlider.max;

// 	if (rangeSlider.value === rangeSlider.min) {
// 		rangeLabel.style.left = labelPosition * 100 + 2 + '%';
// 	} else if (rangeSlider.value === rangeSlider.max) {
// 		rangeLabel.style.left = labelPosition * 100 - 2 + '%';
// 	} else {
// 		rangeLabel.style.left = labelPosition * 100 + '%';
// 	}
// }



class Slider {
	constructor(rangeElement, valueElement, options) {
		this.rangeElement = rangeElement;
		this.valueElement = valueElement;
		this.options = options;

		this.rangeElement.addEventListener('input', this.updateSlider.bind(this));
	}

	init() {
		this.rangeElement.setAttribute('min', options.min);
		this.rangeElement.setAttribute('max', options.max);
		this.rangeElement.value = options.current;

		this.updateSlider();
	}

	updateSlider(newValue) {
		this.valueElement.innerHTML = '$' + this.rangeElement.value;
		this.valueElement.style.left = this.rangeElement.value / 3.05 + '%';
	}
}

let rangeElement = document.getElementById('range');
let valueElement = document.getElementById('value');

let options = {
	min: 0,
	max: 300,
	current: 0,
};

if (rangeElement) {
	let slider = new Slider(rangeElement, valueElement, options);

	slider.init();
}




function init() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        slider.oninput = onSliderInput;

        updateValue(slider);
        updateValuePosition(slider);
        updateLabels(slider);
        updateProgress(slider);

        setTicks(slider);
    }
}

function onSliderInput(event) {
    updateValue(event.target);
    updateValuePosition(event.target);
    updateLabels(event.target);
    updateProgress(event.target);
}

function updateValue(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    value.innerHTML = "<div>" + '$' + slider.value + "</div>";
}

function updateValuePosition(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    const percent = getSliderPercent(slider);

    const sliderWidth = slider.getBoundingClientRect().width;
    const valueWidth = value.getBoundingClientRect().width;
    const handleSize = slider.dataset.handleSize;

    let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

    left = Math.min(left, sliderWidth - valueWidth);
    left = slider.value === slider.min ? 0 : left;

    value.style.left = left + "px";
}

function updateLabels(slider) {
    const value = document.getElementById(slider.dataset.valueId);
    const minLabel = document.getElementById(slider.dataset.minLabelId);
    const maxLabel = document.getElementById(slider.dataset.maxLabelId);

    const valueRect = value.getBoundingClientRect();
    const minLabelRect = minLabel.getBoundingClientRect();
    const maxLabelRect = maxLabel.getBoundingClientRect();

    const minLabelDelta = valueRect.left - (minLabelRect.left);
    const maxLabelDelta = maxLabelRect.left - valueRect.left;

    const deltaThreshold = 32;

    if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
    else minLabel.classList.remove("hidden");

    if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
    else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
    let progress = document.getElementById(slider.dataset.progressId);
    const percent = getSliderPercent(slider);

    progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
    const range = slider.max - slider.min;
    const absValue = slider.value - slider.min;

    return absValue / range;
}

function setTicks(slider) {
    let container = document.getElementById(slider.dataset.tickId);
    const spacing = parseFloat(slider.dataset.tickStep);
    const sliderRange = slider.max - slider.min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let ii = 0; ii < tickCount; ii++) {
        let tick = document.createElement("span");

        tick.className = "tick-slider-tick";

        container.appendChild(tick);
    }
}

function onResize() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        updateValuePosition(slider);
    }
}

window.onload = init;
window.addEventListener("resize", onResize);