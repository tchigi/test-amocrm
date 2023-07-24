const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const NUMBER_UP_TO_SIX_PATTERN = ['0', '1', '2', '3', '4', '5'];
const NUMBER_UP_TO_NINE_PATTERN = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let interval;
  let secondsActual;

  return (seconds) => {
    clearInterval(interval);

    secondsActual = seconds;

    timerEl.innerText = formatTime(new Date(seconds * 1000)); // показ начального времени

    interval = setInterval(() => {
      secondsActual--;

      timerEl.innerText = formatTime(new Date(secondsActual * 1000));

      if (timerEl.innerText === '00:00:00') {
        clearInterval(interval);
        timerEl.innerText = "Время закончилось.";
      }
      }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const value = e.target.value;
  const isStringValid = getIsStringValid(e.target.value) === -1;
  const setValue = (value) => {
    e.target.value = value;
  }

  if (!isStringValid) {
    mutationString(setValue, value);
  }
});

buttonEl.addEventListener('click', () => {
  const [h = 0, m = 0, s = 0] = inputEl.value.split(':');
  const date = new Date(1970, 0, 1, h, m, s);
  const seconds = date / 1000;

  animateTimer(seconds);

  inputEl.value = '';
});

function mutationString(setValue, value) {
  if (
    (value.length === 3 || value.length === 6)
    && NUMBER_UP_TO_SIX_PATTERN.includes(value[value.length - 1])
  ) {
    return setValue(value.slice(0, -1) + ':' + value[value.length - 1]);
  }

  return setValue(value.slice(0, getIsStringValid(value)));
}

function getIsStringValid(string) {
  for (let index = 0; index < string.length; index++) {
    if (index > 7) {
      return index;
    }

    if (
      (index === 0 || index === 1 || index === 4 || index === 7)
      && !NUMBER_UP_TO_NINE_PATTERN.includes(string[index])
    ) {
      return index;
    }

    if ((index === 2 || index === 5) && string[index] !== ':') {
      return index;
    }

    if ((index === 3 || index === 6) && !NUMBER_UP_TO_SIX_PATTERN.includes(string[index])) {
      return index;
    }
  }

  return -1;
}

function formatTime(date) {
  let hh = date.getHours();

  if (hh < 10) {
    hh = '0' + hh;
  }

  let mm = date.getMinutes();

  if (mm < 10) {
    mm = '0' + mm;
  }

  let ss = date.getSeconds();

  if (ss < 10) {
    ss = '0' + ss;
  }

  return `${hh}:${mm}:${ss}`
}
