function allfeature() {
  let cards = document.querySelectorAll(".elem");
  let fullcards = document.querySelectorAll(".fullelem");
  let btn = document.querySelectorAll(".close");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      fullcards.forEach((fcard) => {
        fcard.style.display = "none";
      });
      fullcards[index].style.display = "block";
      fullcards[index].style.position = "absolute";

      localStorage.setItem("openCard", index);
    });
  });

  btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      fullcards[btn.id].style.display = "none";
      localStorage.removeItem("openCard");
    });
  });

  let savedCard = localStorage.getItem("openCard");

  if (savedCard !== null) {
    fullcards.forEach((fcard) => {
      fcard.style.display = "none";
    });

    fullcards[savedCard].style.display = "block";
  }
}

allfeature();

function todolist() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("local storage is empty");
  }

  function renderTask() {
    let alltask = document.querySelector(".alltasks");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += ` <div class="task" id = ${idx}>
  <h2>${elem.task}</h2>
  <button class = "taskcomplete" id =${idx}>Task completed</button>
  </div>`;
    });
    alltask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".taskcomplete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector("form");
  let input = document.querySelector("#input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: input.value,
    });
    renderTask();
    input.value = "";
  });
}

todolist();

function dailyplanner() {
  // let planner = document.querySelector(".planner");

  // let arr = new Array(18).fill(0)
  // let sum = ''
  // arr.forEach((_,idx)=>{
  // sum +=`<div class="plantask" id = ${idx}>
  //             <p id = ${idx}>${idx+6}:00 - ${idx+7}:00</p>
  //             <input type="text" placeholder="..." />
  //           </div>
  //           `

  // })

  // planner.innerHTML  = sum;
  // console.log(sum);

  let planner = document.querySelector(".planner");

  let sum = "";

  for (let i = 0; i < 18; i++) {
    sum += `
    <div class="plantask" id="${i}">
      <p>${i + 6}:00 - ${i + 7}:00</p>
      <input type="text" placeholder="..." />
    </div>
  `;
  }

  planner.innerHTML = sum;
  let input = document.querySelectorAll(".plantask input");
  let storedata;
  try {
    storedata = JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    storedata = [];
  }
  input.forEach((elem, idx) => {
    if (storedata[idx] !== undefined) {
      elem.value = storedata[idx];
    }
  });

  input.forEach((elem, index) => {
    elem.addEventListener("input", function () {
      storedata[index] = elem.value;

      localStorage.setItem("tasks", JSON.stringify(storedata));

      console.log(storedata);
    });
  });
}
dailyplanner();

function motivation() {
  let quote = document.querySelector(".mainquote");
  let author = document.querySelector(".author");

  async function motivation() {
   try{
    let api = await fetch(
      `https://motivational-spark-api.vercel.app/api/quotes/random`,
    );
    let realdata = await api.json();

    author.textContent = realdata.author;
    quote.innerHTML = realdata.quote;
    console.log(realdata.author);

    if(!api.Response.ok){
      throw new error("Unable to Fetch data")
    }

  }catch(err){
      console.log(err)
    } 
  }

  motivation();
}
motivation();

function pomodoro() {
  let timer = document.querySelector(".timer h2");
  let startbtn = document.querySelector(".start");
  let pausebtn = document.querySelector(".pause");
  let resetbtn = document.querySelector(".reset");
  let session = document.querySelector(".session h1");

  let iswork = true;
  let time = 25 * 60;
  let interval = null;

  function displaytime() {
    let minuts = String(Math.floor(time / 60)).padStart(2, "0");
    let seconds = String(time % 60).padStart(2, "0");
    console.log(time);
    timer.innerHTML = `${minuts}:${seconds}`;
  }
  displaytime();

  function start() {
    if (interval) return;

    interval = setInterval(() => {
      if (time > 0) {
        time--;
        displaytime();
      } else {
        pause();
        switchsession();
      }
    }, 1000);
  }

  function pause() {
    clearInterval(interval);
    interval = null;
  }

  function reset() {
    pause();
    isWork = true;
    time = 25 * 60;
    session.textContent = "Work Session";
    session.style.backgroundColor = "var(--green)";
    displaytime();
  }

  function switchsession() {
    iswork = !iswork;

    if (iswork) {
      time = 25 * 60;
      session.textContent = "Work Session";
      session.style.backgroundColor = "var(--green)";
    } else {
      time = 5 * 60;
      session.textContent = "Break Time";
      session.style.backgroundColor = "var(--skyBlue)";
    }
    displaytime();
  }

  startbtn.addEventListener("click", start);
  pausebtn.addEventListener("click", pause);
  resetbtn.addEventListener("click", reset);
}

pomodoro();

function weatherfunctionality() {
  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2feel = document.querySelector(".header2 h4");
  var precipitation = document.querySelector(".header2 .precipitation");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");

  let apikey = `7e13e8dfa9134a46bb4131356260503`;
  let city = `Bhopal`;
  async function weather() {
try{
    let api = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`,
    );
    let data = await api.json();
    console.log(data);

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    humidity.innerHTML = `Humidity:${data.current.humidity}%`;
    header2feel.innerHTML = `Feels like:${data.current.feelslike_c}°C`;
    precipitation.innerHTML = `Precipitation:${data.current.precip_in}%`;
    wind.innerHTML = `Wind:${data.current.gust_kph}km/h`;

    if(!api.Response.ok){
      throw new error("Unable to Fetch data")
    }

    }catch(err){
       console.log(err);
    }
  }

  weather();

  let date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let Datee = date.getDate();
  let day = days[date.getDay()];
  let minuts = date.getMinutes();
  let hour = date.getHours();
  let AMPM = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;

  String(minuts).padStart(2, "0");
 

  header1Date.innerHTML = String(Datee).padStart(2, "0");
  header1Time.innerHTML = `${day}, ${hour}:${minuts} ${AMPM}`;

  setInterval(() => {
    weatherfunctionality();
  }, 1000 * 60);
}
weatherfunctionality();
