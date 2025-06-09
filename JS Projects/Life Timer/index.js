let isDOBOpen = false;
let dateOfBirth;

const settingsIconElem = document.getElementById('settingsIcon');
const settingsContentElem = document.getElementById('settingsContent');
const initialTextElem = document.getElementById('initialText');
const afterDOBBtnElem = document.getElementById('afterDOBBtn');
const dobButtonElem = document.getElementById('dobButton');
const dobInputElem = document.getElementById('dobInput');

const yearElem = document.getElementById('year');
const monthElem = document.getElementById('month');
const dayElem = document.getElementById('day');
const hourElem = document.getElementById('hour');
const minuteElem = document.getElementById('minute');
const secondElem = document.getElementById('second');

const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

const toggleDOBSelector = () => {
  if (isDOBOpen) {
    settingsContentElem.classList.add('hide');
  } else {
    settingsContentElem.classList.remove('hide');
  }
  isDOBOpen = !isDOBOpen;
};

const updateAge = () => {
  let currentDate = new Date();
  console.log(currentDate);

  let dateDiff = currentDate - dateOfBirth;
  console.log(dateDiff); //gives in seconds

  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365.25)); //year=diff/(millisec*secs*mins*hrs*days)
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 30.44)) % 12);
  const day = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30.44);
  const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((dateDiff / (1000 * 60)) % 60);
  const second = Math.floor((dateDiff / 1000) % 60);

  console.log(
    'years: ',
    year,
    '\nmonths: ',
    month,
    '\ndays: ',
    day,
    '\nhours: ',
    hour,
    '\nminutes: ',
    minute,
    '\nseconds: ',
    second
  );

  yearElem.innerHTML = makeTwoDigitNumber(year);
  monthElem.innerHTML = makeTwoDigitNumber(month);
  dayElem.innerHTML = makeTwoDigitNumber(day);
  hourElem.innerHTML = makeTwoDigitNumber(hour);
  minuteElem.innerHTML = makeTwoDigitNumber(minute);
  secondElem.innerHTML = makeTwoDigitNumber(second);
};

const localStorageGetter = () => {
  const year = localStorage.getItem('year');
  const month = localStorage.getItem('month');
  const date = localStorage.getItem('date');

  if (year && month && date) {
    dateOfBirth = new Date(year, month, date);
  }
  updateAge();
};

const contentToggler = () => {
  updateAge();
  if (dateOfBirth) {
    initialTextElem.classList.add('hide');
    afterDOBBtnElem.classList.remove('hide');
  } else {
    initialTextElem.classList.remove('hide');
    afterDOBBtnElem.classList.add('hide');
  }
};

const setDOBHandler = () => {
  const dateString = dobInputElem.value;
  dateOfBirth = dateString ? new Date(dateString) : null;
  console.log(dateOfBirth);

  if (dateOfBirth) {
    localStorage.setItem('year', dateOfBirth.getFullYear());
    localStorage.setItem('month', dateOfBirth.getMonth());
    localStorage.setItem('date', dateOfBirth.getDate());
  }

  contentToggler();
  setInterval(() => updateAge(), 1000);
};
localStorageGetter();

settingsIconElem.addEventListener('click', toggleDOBSelector);
dobButtonElem.addEventListener('click', setDOBHandler);
