function fadeIn(target) {
	var level = 0;
	var inTimer = null;
	inTimer = setInterval( function() {
		level = fadeInAction(target, level, inTimer);
	}, 50);
}
function fadeInAction(target, level, inTimer) {
	level = level + 0.1;
	changeOpacity(target, level);
	if(level>1) clearInterval(inTimer);
	return level;
}
function fadeOut(target) {
	var level = 1;
	var outTimer = null;
	outTimer = setInterval( function() {
		level = fadeOutAction(target, level, outTimer);
	}, 50);
}
function fadeOutAction(target, level, outTimer) {
	level = level - 0.1;
	changeOpacity(target, level);
	if(level < 0) {
		clearInterval(outTimer);
	}
	return level;
}
function changeOpacity(target, level) {
	var obj = target;
	obj.style.opacity = level;
	obj.style.MozOpacity = level;
	obj.style.KhtmlOpacity = level;
	obj.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
	obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
}

// Gallary sticky and scroll animation
// observer define
const options = {}
const observer = new IntersectionObserver((entries, observer) => {
    // console.log(entries)
    entries.forEach((targetElement) => {
		if (!targetElement.isIntersecting) return;
        
		// targetElement.target.style.opacity = 1;
		observer.unobserve(targetElement.target);
    });
}, options)


const observeFunc = () => {
	console.log("hello world");
	
	// define
	// const galleryTarget = document.querySelectorAll(".gallery-item")
	const allTarget = document.querySelectorAll("body *:not(script,style,title)")

	// observe Start
	for ( let i=0; i < allTarget.length; i++ ) {
		observer.observe(allTarget[i])
	}
}


const pageLoadFunc = () => {

	document.addEventListener("DOMContentLoaded", () => {
		observeFunc();
	});

	window.addEventListener('load', () => {
		
		const spinnerClass = document.querySelector('.loading-spinner');
		const containerClass = document.querySelector('.container');

		spinnerClass.classList.add('fade-out');
		containerClass.classList.add('fade-out');

		setTimeout(() => {

			spinnerClass.style.display = 'none';
			// containerId.classList.add('fade-in');
			containerClass.style.display = 'block';
			containerClass.classList.replace('fade-out', 'fade-in');

		}, 1000)
		// loading end start
		
	})
	
}

const init = () => {
	pageLoadFunc();
}

init();