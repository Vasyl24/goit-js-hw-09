import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('button[type="submit"]');
const delayInput = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

btn.addEventListener('click', evt => {
  evt.preventDefault();

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, step.value)
      .then(({ position = i, delay = step.value }) => {
        setTimeout(() => {
          Notify.success(
            `✅ Fulfilled promise ${position} in ${
              Number(delayInput.value) + delay * position
            }ms`
          );
        }, Number(delayInput.value) + delay * position);
      })
      .catch(({ position = i, delay = step.value }) => {
        setTimeout(() => {
          Notify.failure(
            `❌ Rejected promise ${position} in ${
              Number(delayInput.value) + delay * position
            }ms`
          );
        }, Number(delayInput.value) + delay * position);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return (promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delayInput.value);
  }));
}
