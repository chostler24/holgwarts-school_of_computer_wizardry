var visited = getCookie("visited");
if (visited != "true") {
	setCookie("visited", "true", 30);
	console.log("New Visitor!!!!!!!!");
	// Show a simple checkbox for 'I am not a muggle'
	showCheckbox();
} else {
	console.log("Old Visitor.")
	// Load the DOM element
	loadDOMElement();
}


// 🍪
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function showCheckbox() {
	// Create popup with checkbox and label
	var popup = document.createElement("div");
	popup.innerHTML = '<label><input type="checkbox"><img src="images/MuggleCheck.png"></label>';
	popup.style.position = "fixed";
	popup.style.top = "50%";
	popup.style.left = "50%";
	popup.style.transform = "translate(-50%, -50%)";
	popup.style.backgroundColor = "white";
	popup.style.padding = "20px";
	popup.style.border = "1px solid black";
	popup.style.visibility = "visible";
	document.body.appendChild(popup);

	// Bind click event to checkbox
	var checkbox = popup.querySelector("input[type=checkbox]");
	checkbox.addEventListener("click", function () {
		document.body.removeChild(popup);
		// load the DOM element
		loadDOMElement();
	});
}


function loadDOMElement() {
	const body = document.querySelector('body');

	document.body.style.visibility = "visible";
	// Add lightbox to the document
	const newElement = document.createElement("div");
	newElement.id = "lightbox";
	newElement.innerHTML = `<div id="lightbox-content">
		<span id="close">&times;</span>
		<div class="form-block w-form">
		<h2>Request Your Hogwarts Information Packet Today!</h2>
		<form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" class="form"><label for="name">Name</label><input type="text" class="w-input" maxlength="256" name="name-3" data-name="Name 3" placeholder="" id="name-3"><label>Legacy Status</label><select id="Alumni" name="Alumni" data-name="Alumni" class="w-select">
			<option value="">Select one...</option>
			<option value="True">My Parents are Hogwarts Alum</option>
			<option value="False">My Parents are not Hogwarts Alum</option>
			</select><label for="email-3">Street Address (For Owl)</label><input type="address" class="w-input" maxlength="256" name="email-3" data-name="Email 3" placeholder="" id="email-3" required=""><label>House Preference</label><select id="House" name="House" data-name="House" class="w-select">
			<option value="">Select one...</option>
			<option value="Gryffindor">Gryffindor</option>
			<option value="Slytherin">Slytherin</option>
			<option value="Hufflepuff">Hufflepuff</option>
			<option value="Ravenclaw">Ravenclaw</option>
			</select><label>When Should One Tickle a Sleeping Dragon?</label><select id="Dragon" name="Dragon" data-name="Dragon" class="w-select">
			<option value="">Select one...</option>
			<option value="False">Always</option>
			<option value="False">Sometimes</option>
			<option value="True">Never</option>
			</select><input type="submit" value="Submit" data-wait="Please wait..." class="w-button"></form>
		<div class="w-form-done">
			<div>Thank you! Your submission has been received!</div>
		</div>
		<div class="w-form-fail">
			<div>Oops! Something went wrong while submitting the form.</div>
		</div>
		</div>
	</div>`;
	document.body.appendChild(newElement);

	// Add the Header and Footer to the document

	function loadHeaderAndFooter() {
		var xhrHeader = new XMLHttpRequest();
		xhrHeader.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.body.insertAdjacentHTML("afterbegin", this.responseText);
				var scriptTag = document.createElement("script");
				scriptTag.src = "js/webflow.js";
				document.body.appendChild(scriptTag);
				lightBoxInitializer();
			}
		};
		xhrHeader.open("GET", "header.html", true);
		xhrHeader.send();

		var xhrFooter = new XMLHttpRequest();
		xhrFooter.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.body.insertAdjacentHTML("beforeend", this.responseText);
			}
		};
		xhrFooter.open("GET", "footer.html", true);
		xhrFooter.send();
	}

	loadHeaderAndFooter();

	function lightBoxInitializer() {
		// Lightbox element assignment
		const lightbox = document.getElementById('lightbox');
		const close = document.getElementById('close');

		// Open the lightbox
		function openLightbox() {
			lightbox.style.display = 'block';
			console.log('Open lightbox');
		}

		// Close the lightbox
		close.onclick = function () {
			lightbox.style.display = 'none';
		}

		// Close the lightbox if the user clicks outside of it
		window.onclick = function (event) {
			if (event.target == lightbox) {
				lightbox.style.display = 'none';
			}
		}

		// Add event listener to nav button
		const CTAs = document.querySelectorAll('.CTA');

		CTAs.forEach(function (CTA) {
			CTA.addEventListener('click', openLightbox);
		});
	}
};