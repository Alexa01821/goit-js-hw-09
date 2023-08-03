import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElement = document.querySelector('form');
formElement.addEventListener('submit', onCreatePromiseByForm);

function onCreatePromiseByForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let currentDelay = Number(delay.value);
  let currentStep = Number(step.value);
  let currentAmount = Number(amount.value);
  for (let i = 1; i <= currentAmount; i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += currentStep;
    event.currentTarget.reset();
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
