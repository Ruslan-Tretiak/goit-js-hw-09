const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let changeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function changeColorRandom() {
    body.style.backgroundColor = getRandomHexColor();
} 

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    changeInterval = setInterval(changeColorRandom, 1000);
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(changeInterval);
});

