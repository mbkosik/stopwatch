const playBtn = document.querySelector(".stopwatch__buttons--play");
const pauseBtn = document.querySelector(".stopwatch__buttons--pause");
const stopBtn = document.querySelector(".stopwatch__buttons--stop");
const clearBtn = document.querySelector(".stopwatch__buttons--clear");
const archiveBtn = document.querySelector(".stopwatch__buttons--archive");

const fullTime = document.querySelector(".stopwatch__time--current");
const savedTime = document.querySelector(".stopwatch__time--saved");
const timeList = document.querySelector(".stopwatch__time-list");

const timeCounterSec = document.querySelector(".stopwatch__time--current span.s");
const timeCounterMin = document.querySelector(".stopwatch__time--current span.m");

const timeSavedSec = document.querySelector(".stopwatch__time--saved span.s");
const timeSavedMin = document.querySelector(".stopwatch__time--saved span.m");

let timeSec = 0; 
let timeMin = 0; 

let currentMin = 0; 
let currentSec = 0; 

let stage = 0; 

let play = false;
let pause = false;
let stop = false;


function startCount() {
    if (play === false) {
        counting(); 
    } else {
        return; 
    }
}

function pauseCount() {
    if (play === true) {
        pause = true; 
        saveTime();
    } else {
        return; 
    }
}

function stopCount() {
    if (play === true) {
        stop = true; 
        saveTime(); 
    } else {
        stop = true;
        startCount(); 
    }
}

function clearCount() {
    stopCount(); 
    timeList.classList.remove("active"); 
    timeList.textContent = "";
    timeSavedSec.textContent = "";
    timeSavedMin.textContent = ""; 
    savedTime.classList.remove("active");
}

function showArchive() {
    timeList.classList.add("active");
}

function saveTime() {
    stage++;
    if (currentMin <= 9) {
        timeSavedMin.textContent = `0${currentMin}`
    } else {
        timeSavedMin.textContent = currentMin;
    }

    if (currentSec <= 9) {
        timeSavedSec.textContent = `0${currentSec}`
    } else {
        timeSavedSec.textContent = currentSec;
    }
    savedTime.classList.add("active");
    let newListElement = document.createElement("li");
    newListElement.innerHTML = `<strong>Etap ${stage}</strong> ${savedTime.textContent}`;
    timeList.appendChild(newListElement); 
    currentSec = 0; 
    currentMin = 0; 
    if (stop === true) {
        let fullTimeElement = document.createElement("li");
        fullTimeElement.innerHTML = `<strong>Pełny czas</strong> ${fullTime.textContent}`
        timeList.appendChild(fullTimeElement);
    }
}

const counting = () => {

    if (pause === true) {
        pause = false; 
        play = false; 
        return; 
    }

    if (stop === true) {
        stop = false; 
        play = false; 
        timeSec = 0; 
        timeMin = 0; 
        timeCounterMin.textContent = "00";
        timeCounterSec.textContent = "00";
        stage = 0;
        return; 
    }

    play = true; 

    if (timeSec === 59) {
        timeSec = -1;
        timeMin++;
        if (timeMin <= 9) {
            timeCounterMin.textContent = `0${timeMin}`
        } else {
            timeCounterMin.textContent = timeMin;
        }
    }

    if (currentSec == 59) {
        currentSec = -1; 
        currentMin++;
    }
 
    timeSec++;
    currentSec++;
    if (timeSec <= 9) {
        timeCounterSec.textContent = `0${timeSec}`
    } else {
        timeCounterSec.textContent = timeSec;
    }

    setTimeout(counting, 500)
}


playBtn.addEventListener("click", startCount);
pauseBtn.addEventListener("click", pauseCount);
stopBtn.addEventListener("click", stopCount);
clearBtn.addEventListener("click", clearCount);
archiveBtn.addEventListener("click", showArchive);

// WYŚWIETLANIE POP-UPA z INSTRUKCJĄ

const infoBtn = document.querySelector(".fa-question");
const modalCloseBtn = document.querySelector(".modal__close");
const modal = document.querySelector(".shadow__modal");

const showModal = (e) => {
    if (e.target === infoBtn) {
        modal.classList.add("active");
    } else if (e.target === modalCloseBtn || e.target === modal) {
        modal.classList.remove("active");
    }
}

window.addEventListener("click", showModal);

// ZMIANA MOTYWU KOLORU

const changeColorBtn = document.querySelector(".fa-paint-brush");
let root = document.documentElement;

let colorsArray = ["#F05941", "#FFD369", "#27496D"];
let i = 0;

const changeColor = () => {
    if (i === colorsArray.length - 1) {
        i = -1; 
    }
    i++; 
    root.style.setProperty('--main-color', colorsArray[i]);
    console.log(i);
}

changeColorBtn.addEventListener("click", changeColor);