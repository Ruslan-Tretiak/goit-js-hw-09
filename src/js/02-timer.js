import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval = null;

function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const currentDate = Date.now();
    const timeRemaining = targetDate - currentDate;
    
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown completed!');
      startButton.disabled = false;
      return;
    }
    
    const time = convertMs(timeRemaining);
    updateTimerDisplay(time);
  }, 1000);
}

function updateTimerDisplay(time) {
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    
    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datePicker.value);
  startCountdown(selectedDate);
  startButton.disabled = true;
});
