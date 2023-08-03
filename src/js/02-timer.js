import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDateElement = document.querySelector('#datetime-picker');
const startBtnElement = document.querySelector('button[data-start]');
const dataDaysElement = document.querySelector('[data-days]');
const dataHoursElement = document.querySelector('[data-hours]');
const dataMinutesElement = document.querySelector('[data-minutes]');
const dataSecondsElement = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }
    return (startBtnElement.disabled = false);
  },
};
startBtnElement.disabled = true;
let idInterval;

flatpickr(inputDateElement, options);
startBtnElement.addEventListener('click', countDown);

function countDown() {
  startBtnElement.disabled = true;
  inputDateElement.disabled = true;
  idInterval = setInterval(() => {
    const futureDate = new Date(inputDateElement.value);
    const timeBetweenDate = futureDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeBetweenDate);
    dataDaysElement.textContent = addLeadingZero(days);
    dataHoursElement.textContent = addLeadingZero(hours);
    dataMinutesElement.textContent = addLeadingZero(minutes);
    dataSecondsElement.textContent = addLeadingZero(seconds);
    if (timeBetweenDate < 1000) {
      Notify.success('The timer has expired');
      clearInterval(idInterval);
      inputDateElement.disabled = false;
    }
  }, 1000);
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
