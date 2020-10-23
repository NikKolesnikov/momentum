// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// Show Time
function showTime() {
    let today = new Date(),
        weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        day = today.getDate(),
        month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Output Time
    time.innerHTML = `${weekDay[today.getDay() - 1]}<span>, </span>${month[today.getMonth()]}<span> </span>${day}</br>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        // Night
        document.body.style.backgroundImage = "url('./assets/images/night/01.jpg')";
        greeting.textContent = 'Good Night'
        document.body.style.color = 'white';
    } else if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('./assets/images/morning/01.jpg')";
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        // Afternoon
        const base = 'https://raw.githubusercontent.com/NikKolesnikov/momentum/assets/images/night/';
        const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
        let i = 0;
        
        function viewBgImage(data) {
          const body = document.body;
          const src = data;
          const img = document.createElement('img');
          img.src = src;
          img.onload = () => {      
            body.style.backgroundImage = `url(${src})`;
          }; 
        }
        
        function getImage() {
          const index = i % images.length;
          const imageSrc = base + images[index];
          viewBgImage(imageSrc);
          i++;
          btn.disabled = true;
          setTimeout(function() { btn.disabled = false }, 1000);
        } 
        
        const btn = document.querySelector('.btn');
        btn.addEventListener('click', getImage);



        document.body.style.backgroundImage = "url('./assets/images/day/01.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        //Evening
        document.body.style.backgroundImage = "url('./assets/images/evening/01.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


// Смена фона
// const base = "url('./assets/images/day/')";
// const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
// let i = 0;

// function viewBgImage(data) {
//   const body = document.querySelector('body');
//   const src = data;
//   const img = document.createElement('img');
//   img.src = src;
//   img.onload = () => {      
//     body.style.backgroundImage = `url(${src})`;
//   }; 
// }

// function getImage() {
//   const index = i % images.length;
//   const imageSrc = base + images[index];
//   viewBgImage(imageSrc);
//   i++;
//   btn.disabled = true;
//   setTimeout(function() { btn.disabled = false }, 1000);
// } 

// const btn = document.querySelector('.btn');
// btn.addEventListener('click', getImage);
// Смена фона

// Цитата
const blockquote = document.querySelector('.blockquote');
const figcaption = document.querySelector('.figcaption');
// const btn = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
// btn.addEventListener('click', getQuote);
// Цитата


// Прогноз погоды
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
// Прогноз погоды

// Run
showTime();
setBgGreet();
getName();
getFocus();