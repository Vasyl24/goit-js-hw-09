import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const start = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');
start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (new Date() >= selectedDates[0]) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });

      start.disabled = true;
    } else {
      start.disabled = false;

      start.addEventListener('click', function convertMs(ms) {
        start.disabled = true;

        // Number of milliseconds per unit of time
        countdown = setInterval(() => {
          ms = selectedDates[0] - new Date();
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;

          // Remaining days
          days.textContent = addLeadingZero(Math.floor(ms / day));
          // Remaining hours
          hours.textContent = addLeadingZero(Math.floor((ms % day) / hour));
          // Remaining minutes
          minutes.textContent = addLeadingZero(
            Math.floor(((ms % day) % hour) / minute)
          );

          // Remaining seconds
          seconds.textContent = addLeadingZero(
            Math.floor((((ms % day) % hour) % minute) / second)
          );
        }, 1000);
      });
    }
  },
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);

timer.style.display = 'flex';

for (let field of fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.marginRight = '14px';
  field.style.fontWeight = '600';
}

for (let value of values) {
  value.style.fontSize = '30px';
}

for (let label of labels) {
  label.style.textTransform = 'uppercase';
  label.style.fontSize = '14px';
}
