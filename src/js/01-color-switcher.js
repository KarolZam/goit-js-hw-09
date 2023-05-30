const buttonStart = document.querySelector('[data-start]');
// console.log(buttonStart);
const buttonStop = document.querySelector('[data-stop]');
// console.log(buttonStop);
const body = document.querySelector('body');
// console.log(body);
let timer = null;

buttonStart.addEventListener('click', event => {
  buttonStart.setAttribute('disabled', '');
  buttonStop.removeAttribute('disabled', '');
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', event => {
  buttonStart.removeAttribute('disabled', '');
  buttonStop.setAttribute('disabled', '');
  clearInterval(timer);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
