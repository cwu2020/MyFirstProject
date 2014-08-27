/* Full Page vertical Slideshow javascript */

$(document).ready(function(){
    $(this).scrollTop(0); // makes sure user starts at beginning on reload
});

// desktop variables
var delta = 0;
var currentSlideIndex = 0;
var scrollThreshold = 1;
var slidesWrapper = $(".fpvs-wrapper");
var slides = $(".fpvs-slide");
var contentWrapper = $("div.content-wrapper");
var numSlides = slides.length - 1;
var isScrolling = 0;

//This variable is used to prevent event flooding
var preventRefire = false;

function fpvs (e) {
    
    if(preventRefire) return false;

	// --- Scrolling up ---
	if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	

		delta--;

		if ( Math.abs(delta) >= scrollThreshold) {
			prevSlide();
		}
	}

	// --- Scrolling down ---
	else {

		delta++;

		if (delta >= scrollThreshold) {
			nextSlide();
		}
	}

	// Prevent page from scrolling
	return false;

}


function showSlide() {

	// reset
	delta = 0;
	//
	preventRefire = true; // we are scrolling already

	slides.each(function(i, slide) {
		$(slide).toggleClass('active', (i >= currentSlideIndex));
	});

	setTimeout(function(){ // prevent scrolling for the duration of 2 * animation transition (in css file) (because one animation for current and one for next)
		preventRefire = false;
	}, 1800);

}

function prevSlide() {

	currentSlideIndex--;

	if (currentSlideIndex < 0) {
		currentSlideIndex = 0;
	}

	showSlide();
}

function nextSlide() {

	currentSlideIndex++;

	if (currentSlideIndex > numSlides) { 
		currentSlideIndex = numSlides;
		toggleFpvs();
	}
	showSlide();

}

function toggleFpvs() {

	preventRefire = true;

	slidesWrapper.toggleClass('out-of-sight'); // we are scrolling already

	setTimeout(function(){ // prevent scrolling for the duration of 2 * animation transition (in css file) (because one animation for current and one for next)
		preventRefire = false;
		$('body').toggleClass('fpvs-done');
	}, 1800);

}

function watchScroll(e){

    // --- Scrolling up ---
	if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	

		if(preventRefire) return false;

		topPosition = contentWrapper.offset().top;

		if(topPosition >= 0){

			toggleFpvs();

		}

	}

}

slidesWrapper.on({
	'DOMMouseScroll mousewheel': fpvs
});

contentWrapper.on({
	'DOMMouseScroll mousewheel': watchScroll
});


// mobile

// var dragThreshold = 0.15;// "percentage" to drag before engaging
// var dragStart = null;	 // used to determine touch / drag distance
// var percentage = 0;
// var target;
// var previousTarget;

// function touchStart(event) {

// 	if (dragStart !== null) { return; }
// 	if (event.originalEvent.touches) { 
// 		event = event.originalEvent.touches[0];
// 	}

// 	// where in the viewport was touched
// 	dragStart = event.clientY;

// 	// make sure we're dealing with a slide
// 	target = slides.eq(currentSlideIndex)[0];	

// 	// disable transitions while dragging
// 	target.classList.add('no-animation');

// 	previousTarget = slides.eq(currentSlideIndex-1)[0];
// 	previousTarget.classList.add('no-animation');
// }

// function touchMove (event) {

// 	if (dragStart === null) { return; }

// 	if (event.originalEvent.touches) { 
// 		event = event.originalEvent.touches[0];
// 	}

// 	delta = dragStart - event.clientY;
// 	percentage = delta / $(window).height();
// 	// alert(percentage);

// 	// Going down/next. Animate the height of the target element.
// 	if (percentage > 0) {
// 		target.style.height = (100-(percentage*100))+'%';
// 		if (previousTarget) { 
// 			previousTarget.style.height = ''; 	// reset
// 		}
// 	}

// 	// Going up/prev. Animate the height of the _previous_ element.
// 	else if (previousTarget) {
// 		previousTarget.style.height = (-percentage*100)+'%';
// 		target.style.height = '';	// reset
// 	}

// 	// Don't drag element. This is important.
// 	return false;
// }

// function touchEnd () {

// 	dragStart = null;
// 	target.classList.remove('no-animation');
// 	if (previousTarget) { 
// 		previousTarget.classList.remove('no-animation'); 
// 	}

// 	if (percentage >= dragThreshold) {
// 		nextSlide();
// 	}
// 	else if ( Math.abs(percentage) >= dragThreshold ) {
// 		prevSlide();
// 	} else {
// 		// show current slide i.e. snap back
// 		showSlide();
// 	}

// 	percentage = 0;

// }

// $("#projects").on({
// 	'touchstart': touchStart,
// 	'touchmove': touchMove,
// 	'touchend': touchEnd
// });