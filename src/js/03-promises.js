import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function showNotification(position, delay, isFulfilled) {
  if (isFulfilled) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
      position: 'topRight',
      timeout: 2000,
    });
  } else {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
      position: 'topRight',
      timeout: 2000,
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  if (step < 0 || delay < 0 || amount <= 0) {
    Notiflix.Notify.failure('Invalid input values', {
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  let currentDelay = delay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        showNotification(position, delay, true);
      })
      .catch(({ position, delay }) => {
        showNotification(position, delay, false);
      });

    currentDelay += step;
  }

  // Reset input fields after promises are created
  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
