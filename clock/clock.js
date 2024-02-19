document.addEventListener("DOMContentLoaded", () => {
const breakDecrementBtn = document.querySelector("#break-decrement");
const breakIncrementBtn = document.querySelector("#break-increment");
const sessionDecrementBtn = document.querySelector("#session-decrement");
const sessionIncrementBtn = document.querySelector("#session-increment");

const startPauseBtn = document.querySelector("#start_stop");
const timeLeftEl = document.querySelector("#time-left")
const timerLabelEl = document.querySelector("#timer-label");
const resetBtn = document.querySelector("#reset");

const breakLengthEl = document.querySelector("#break-length");
const sessionLengthEl = document.querySelector("#session-length");
let breakLength;
let sessionLength;

let runID;
let moveID;
let timeLeft;
let audio;
let sessionID;
let timer;

/* START *************************************************************/
breakLength = 5;
breakLengthEl.innerHTML = breakLength;
sessionLength = 25;
sessionLengthEl.innerHTML = sessionLength;
timeLeftEl.style.color = "white";

runID = false;
moveID = false;
timeLeft = sessionLength * 60;
TimeLeft();
audio = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
audio.volume = 1;
sessionID = "session";
timerLabelEl.innerHTML = "Session";
clearInterval(timer);

/* UPDATE ************************************************************/
breakDecrementBtn.addEventListener("click", () => {
	if(runID === false) {
		if(breakLength > 1) {
			breakLength--;
			breakLengthEl.innerHTML = breakLength;
		}
	}
});

breakIncrementBtn.addEventListener("click", () => {
	if(runID === false) {
		if(breakLength < 60) {
			breakLength++;
			breakLengthEl.innerHTML = breakLength;
		}
	}
});

sessionDecrementBtn.addEventListener("click", () => {
	if(runID === false) {
		if(sessionLength > 1) {
			sessionLength--;
			sessionLengthEl.innerHTML = sessionLength;
			timeLeft = sessionLength * 60;
			TimeLeft();
		}
	}
});

sessionIncrementBtn.addEventListener("click", () => {
	if(runID === false) {
		if(sessionLength < 60) {
			sessionLength++;
			sessionLengthEl.innerHTML = sessionLength;
			timeLeft = sessionLength * 60;
			TimeLeft();
		}
	}
});

startPauseBtn.addEventListener("click", () => {
	if(!moveID) {
		runID = true;
		moveID = true;
		clearInterval(timer);
		timer = setInterval(Move, 1000);
	} else {
		moveID = false;
		clearInterval(timer);
	}
});

resetBtn.addEventListener("click", () => {
	breakLength = 5;
	breakLengthEl.innerHTML = breakLength;
	sessionLength = 25;
	sessionLengthEl.innerHTML = sessionLength;
	timeLeftEl.style.color = "white";
	
	runID = false;
	moveID = false;
	timeLeft = sessionLength * 60;
	TimeLeft();
	audio = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
	audio.volume = 1;
	sessionID = "session";
	timerLabelEl.innerHTML = "Session";
	clearInterval(timer);
});

function Move() {
	if(timeLeft > 0) {
		timeLeft--;
	} else {
		clearInterval(timer);
		PlayAudio();
		setTimeout(PlayAudio, 400);
		setTimeout(PlayAudio, 800);
		setTimeout(PlayAudio, 1200);
		if(sessionID === "session") {
			sessionID = "break";
			timerLabelEl.innerHTML = "Break";
			clearInterval(timer);
			timeLeft = breakLength * 60;
			timer = setInterval(Move, 1000);
		} else {
			sessionID = "session";
			timerLabelEl.innerHTML = "Session";
			clearInterval(timer);
			timeLeft = sessionLength * 60;
			timer = setInterval(Move, 1000);
		}
	}
	if(timeLeft < 60) {
		timeLeftEl.style.color = "#812C2C";
	} else {
		timeLeftEl.style.color = "white";
	}
	
	
	TimeLeft();
}

function TimeLeft() {
	if(Math.floor(timeLeft / 60) < 10) {
		timeLeftEl.innerHTML = `0${Math.floor(timeLeft / 60)}`;
	} else {
		timeLeftEl.innerHTML = `${Math.floor(timeLeft / 60)}`;
	}
	
	if(timeLeft % 60 < 10) {
		timeLeftEl.innerHTML += `:0${timeLeft % 60}`;
	} else {
		timeLeftEl.innerHTML += `:${timeLeft % 60}`;
	}
}

function PlayAudio() {
	audio.play();
}
});