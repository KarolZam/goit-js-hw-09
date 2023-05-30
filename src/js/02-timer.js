import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// console.log(Notiflix);
const dateTimePicker = document.querySelector('#datetime-picker');
// console.log(dateTimePicker);

const buttonStart = document.querySelector('button');
buttonStart.setAttribute('disabled', '');
// console.log(buttonStart);

let selectedDatesTimestamp = 0;

let comparedTime = 0;

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDatesTimestamp = selectedDates[0].getTime();
    if (selectedDatesTimestamp > new Date().getTime()) {
      // console.log(selectedDates[0]);
      Notiflix.Notify.success('');
      buttonStart.removeAttribute('disabled');
      selectedDatesTimestamp = selectedDates[0].getTime();
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      buttonStart.setAttribute('disabled', '');
    }
  },
});

buttonStart.addEventListener('click', event => {
  comparedTime = selectedDatesTimestamp - new Date().getTime();

  let timeCount = setInterval(function () {
    var now = new Date().getTime();
    var distance = selectedDatesTimestamp - now;
    days.textContent = convertMs(distance).days.toString().padStart(2, '0');
    hours.textContent = convertMs(distance).hours.toString().padStart(2, '0');
    minutes.textContent = convertMs(distance)
      .minutes.toString()
      .padStart(2, '0');
    seconds.textContent = convertMs(distance)
      .seconds.toString()
      .padStart(2, '0');
    stopInterval();
    function stopInterval() {
      if (distance <= 1000) {
        clearInterval(timeCount);
      } else return;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
