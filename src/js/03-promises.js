import Notiflix from 'notiflix';
const delay = document.querySelector(`[name="delay"]`);
const step = document.querySelector(`[name="step"]`);
const amount = document.querySelector(`[name="amount"]`);
const form = document.querySelector('.form');
let shouldResolve = 0;
let position = 0;

const createPromise = delay =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve('');
      } else {
        reject('');
      }
    }, delay - step.value);
  });

const resolveHandler = result => (
  (position += 1),
  Notiflix.Notify.success(
    `✅ Fulfilled promise ${position} in ${new Date().getTime() - clickTime}ms`
  )
);
const rejectHandler = result => (
  (position += 1),
  Notiflix.Notify.failure(
    `❌ Rejected promise ${position} in ${new Date().getTime() - clickTime}ms`
  )
);
let counter = 0;
let clickTime = 0;

form.addEventListener('submit', event => {
  counter = 0;
  position = 0;
  event.preventDefault();
  clickTime = new Date().getTime();

  let inter = setInterval(function () {
    if (counter < amount.value) {
      createPromise(delay.value).then(resolveHandler).catch(rejectHandler);
      counter++;
    } else clearInterval(inter);
  }, step.value);
});
