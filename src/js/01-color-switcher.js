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

function centerButtons() {
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.position = 'fixed';
  buttonContainer.style.top = '50%';
  buttonContainer.style.left = '50%';
  buttonContainer.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(buttonContainer);

  buttonContainer.appendChild(startButton);
  buttonContainer.appendChild(stopButton);
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

centerButtons();
