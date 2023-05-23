// Функція для підрахунку різниці між датами у мілісекундах
function getMillisecondsDiff(date1, date2) {
  return Math.abs(date1 - date2);
}

// Функція для форматування числа з додаванням ведучого нуля
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Елементи інтерфейсу
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Початкові значення
let countdownIntervalId = null;
let countdownEndDate = null;

// Обробник події при виборі дати і часу
datetimePicker.addEventListener('change', () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  // Перевірка чи вибрана дата є в майбутньому
  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
    countdownEndDate = selectedDate;
  }
});

// Обробник події при натисканні кнопки "Start"
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  countdownIntervalId = setInterval(updateCountdown, 1000);
  updateCountdown();
});

// Оновлення значень таймера
function updateCountdown() {
  const currentDate = new Date();
  const diff = getMillisecondsDiff(countdownEndDate, currentDate);
  const { days, hours, minutes, seconds } = convertMs(diff);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);

  // Перевірка чи досягнуто кінцевої дати
  if (diff <= 0) {
    clearInterval(countdownIntervalId);
    startButton.disabled = false;
  }
}

// Функція для підрахунку часу
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
