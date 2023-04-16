import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('button[type="submit"]');
const delayInput = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

btn.addEventListener('click', evt => {
  evt.preventDefault();

  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i, step.value)
      .then(({ position = i, delay = step.value }) => {
        setTimeout(() => {
          Notify.success(
            `✅ Fulfilled promise ${position + 1} in ${
              Number(delayInput.value) + delay * position
            }ms`
          );
        }, Number(delayInput.value) + delay * position);
      })
      .catch(({ position = i, delay = step.value }) => {
        setTimeout(() => {
          Notify.failure(
            `❌ Rejected promise ${position + 1} in ${
              Number(delayInput.value) + delay * position
            }ms`
          );
        }, Number(delayInput.value) + delay * position);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
