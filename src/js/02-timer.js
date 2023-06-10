import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const datetimePicker = document.getElementById('datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let countdownIntervalId = null;
let countdownEndDate = null;

startButton.disabled = true;

startButton.addEventListener('click', onStartBtnClick);

function onStartBtnClick(event) {
  startCountdown();
}

function startCountdown() {
  countdownEndDate = flatpickrInstance.selectedDates[0];
  countdownIntervalId = setInterval(updateCountdown, 1000);
  datetimePicker.disabled = true;
  startButton.disabled = true;
}

function stopCountdown() {
  clearInterval(countdownIntervalId);
  datetimePicker.disabled = false;
  startButton.disabled = false;
}

function resetCountdown() {
  clearInterval(countdownIntervalId);
  countdownEndDate = null;
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  datetimePicker.disabled = false;
  startButton.disabled = false;
}

const flatpickrInstance = flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function updateCountdown() {
  const currentDate = new Date().getTime();
  const selectedDates = countdownEndDate.getTime();
  const diff = selectedDates - currentDate;

  const { days, hours, minutes, seconds } = convertMs(diff);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);

  if (diff < 1000) {
    stopCountdown();
    resetCountdown();
    Notify.success('Countdown completed');
    return;
  }
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
