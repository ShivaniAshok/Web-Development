const calculateFormElem = document.getElementById('calculateForm');
const resultElem = document.getElementById('result');

const calculateMarks = (event) => {
  event.preventDefault(); //Prevent form from reloading the page
  const maxMarks = 400; //since 4 subjs

  const formData = new FormData(calculateFormElem);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = Number(value);
  });
  console.log(data);

  const totalMarks = data.maths + data.hindi + data.english + data.science;
  console.log(totalMarks);

  let percentage = (totalMarks / maxMarks) * 100;
  percentage = percentage.toFixed(2);
  console.log(percentage);

  resultElem.innerText = `You have got ${totalMarks} out of ${maxMarks} and your percentage is ${percentage}%`;
};
