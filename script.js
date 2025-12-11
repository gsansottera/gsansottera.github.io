function setCookie(cookie_name, cookie_value, cookie_validity_in_days) {
  
  const d = new Date();
    
  let now = d.getTime()

  d.setTime(now + (cookie_validity_in_days * 24 * 60 * 60 * 1000));
    
  let expires = "expires=" + d.toUTCString();
    
  document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";

  console.log("ok, I'm setting:", cookie_name, "=", cookie_value);
}
  
function getCookie(cname) {

  let name = cname + "=";
  
  // a list of cookies: ca[0] contains the first, ca[1] the second and so on
  let ca = document.cookie.split(';');
  
  // iterate over all cookies
  for(let i = 0; i < ca.length; i++) {
    
    // pick up the cookie
    let c = ca[i];
    
    // trim some extra space at the beginning
    while (c.charAt(0) == ' ') {
      // begin from position 1: we're chopping off the space in front
      c = c.substring(1);
    }
    
    // now, does the present cookie begin by name?
    if (c.indexOf(name) == 0) {

      // bingo, we found it, we return it to the caller
      return c.substring(name.length, c.length);
    }
  }
  
  // we couldn't find anything...
  return "";
}


window.onload = function() {
  handleCookieBanner();
};

  
// ---------- COOKIE BANNER ----------
function handleCookieBanner() {
    const consentBox = document.getElementById("consentBox");  // overlay
    const acceptBtn = document.querySelector(".consentButton");
    const rejectBtn = document.querySelector(".rejectButton");

    let consent = getCookie("cookie_consent");

    // If the user has already given consent, hide the banner immediately
    if (consent !== "") {
        consentBox.classList.add("hide");
        return;
    }

    // Accept button
    acceptBtn.onclick = () => {
        setCookie("cookie_consent", "accepted", 30);
        consentBox.classList.add("hide");

        checkCookie();
    };

    // Reject button
    rejectBtn.onclick = () => {
        alert("Cookies rejected. Some functionality may be limited.");

        setCookie("cookie_consent", "rejected", 30);
        consentBox.classList.add("hide");
    };
}

function checkCookie() {
  /* if the username exists already inside the cookie 
      then salute the returning user
  */

  console.log("Now, the available cookies are:", document.cookie);

  // is there a username cookie already?
  let user = getCookie("username");

  // existing user
  if (user != "") {
    // returning user: salute them
    document.getElementById('salutation').innerText = 'Hello ' + user + ', good to see you again!'
    document.getElementById('salutation').style.backgroundColor = "antiquewhite";

  // new user
  } else {

    user = prompt("Thanks for visiting! Please enter your name:", "");

    if (user != "" && user != null) {

      // keep name for 1 day
      setCookie("username", user, 1);

      // keep user position for 12h
      let their_location = prompt("Great, and where are you today?", "In the lab");
      setCookie("last_self_localised_at", their_location, 0.5);


      // returning user: salute them
      document.getElementById('salutation').innerText = 'Hello ' + user + ', welcome to MYTURLE!'

      document.getElementById('salutation').style.backgroundColor = "antiquewhite";
    }
  }
}

//CAROUSEL JAVA

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentSlide = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if(currentSlide < slides.length - 1) {
    currentSlide++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if(currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});

//Adoption button JavaScript

  const adoptForm = document.getElementById('adopt-form');

  adoptForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for adopting a turtle!');
    adoptForm.reset();
  });

