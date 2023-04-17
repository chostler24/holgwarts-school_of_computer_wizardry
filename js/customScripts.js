$(document).ready(function () {
	console.log('Linked Custom!');

	// Lightbox elements
	const lightbox = document.getElementById('lightbox');
	const close = document.getElementById('close');

	// Open the lightbox
	function openLightbox() {
		lightbox.style.display = 'block';
		console.log('Open lightbox');
	}

	// Close the lightbox
	close.onclick = function() {
		lightbox.style.display = 'none';
	}

	// Close the lightbox if the user clicks outside of it
	window.onclick = function(event) {
		if (event.target == lightbox) {
			lightbox.style.display = 'none';
		}
	}

	// Add event listener to nav button
	const CTAs = document.querySelectorAll('.CTA');

	CTAs.forEach(function(CTA) {
		CTA.addEventListener('click', openLightbox);
	});
});