const bodyElement = document.querySelector('body');
const btnStartElement = document.querySelector('button[data-start]');
const btnStopElement = document.querySelector('button[data-stop]');
btnStopElement.disabled = true;
let idInterval;

btnStartElement.addEventListener('click', onClickBtnStart);
btnStopElement.addEventListener('click', onClickBtnStop);

function onClickBtnStart() {
  idInterval = setInterval(() => {
    bodyElement.style.background = getRandomHexColor();
  }, 1000);
  btnStartElement.disabled = true;
  btnStopElement.disabled = false;
}

function onClickBtnStop() {
  clearInterval(idInterval);
  btnStartElement.disabled = false;
  btnStopElement.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
