function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startButtonClickHandler() {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopButtonClickHandler() {
  stopButton.disabled = true;
  startButton.disabled = false;

  clearInterval(intervalId);
}

startButton.addEventListener('click', startButtonClickHandler);
stopButton.addEventListener('click', stopButtonClickHandler);
