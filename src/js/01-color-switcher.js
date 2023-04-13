function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let colorInterval = null;
stop.disabled = true;

start.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;

  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stop.addEventListener('click', () => {
  start.disabled = false;
  stop.disabled = true;
  clearInterval(colorInterval);
});
