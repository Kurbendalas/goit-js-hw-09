function getMillisecondsDiff(date1, date2) {
  return Math.abs(date1 - date2);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Elements in the interface
const datetimePicker = document.getElementById('datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Initial values
let countdownIntervalId = null;
let countdownEndDate = null;

function setCountdownEndDate(dateString) {
  countdownEndDate = new Date(dateString);
}

function startCountdown() {
  countdownIntervalId = setInterval(updateCountdown, 1000);
  updateCountdown();
  datetimePicker.disabled = true;
  resetButton.style.display = 'none';
}

function stopCountdown() {
  clearInterval(countdownIntervalId);
  datetimePicker.disabled = false;
  resetButton.style.display = 'block';
}

function resetCountdown() {
  clearInterval(countdownIntervalId);
  countdownEndDate = null;
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  datetimePicker.disabled = false;
  resetButton.style.display = 'none';
}

const resetButton = document.createElement('button');
resetButton.textContent = 'Reset';
resetButton.style.display = 'none';
resetButton.addEventListener('click', resetCountdown);

document.body.appendChild(resetButton);

flatpickr(datetimePicker, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  minDate: 'today',
  onChange: function (selectedDates, dateStr) {
    const selectedDate = new Date(dateStr);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
    } else {
      setCountdownEndDate(dateStr);
      startCountdown();
    }
  },
});

function updateCountdown() {
  const currentDate = new Date();
  const diff = getMillisecondsDiff(countdownEndDate, currentDate);

  if (diff <= 0) {
    stopCountdown();
    resetCountdown(); // Optionally reset the countdown after reaching 00:00:00:00
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Показать кнопку Reset
resetButton.style.display = 'block';
