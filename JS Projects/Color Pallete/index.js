const generateBtnElem = document.getElementById('generateBtn');

const singleHexColorGenerator = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

  let hexColor = '#';

  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * hex.length);
    hexColor += hex[random];
  }

  return hexColor;
};

const colorPalleteGenerator = () => {
  const colorPallete = [];

  for (let i = 0; i < 4; i++) {
    colorPallete.push(singleHexColorGenerator());
  }

  return colorPallete;
};

const renderColorPallete = () => {
  const colorsContainer = document.querySelector('.colors_container');
  colorsContainer.innerHTML = '';

  const colorPallete = colorPalleteGenerator();

  colorPallete.forEach((color, i) => {
    const colorDiv = document.createElement('div');
    colorDiv.id = `color${i + 1}`;
    colorDiv.style.backgroundColor = color;
    colorDiv.className = 'colorBox';

    const colorTag = document.createElement('p');
    colorTag.id = `color${i + 1}Tag`;
    colorTag.className = 'colorTag';
    colorTag.innerHTML = color;
    colorDiv.appendChild(colorTag);
    colorsContainer.appendChild(colorDiv);
  });
  console.log('colorPallete: ', colorPallete);

  const copytoClipBoard = (id) => {
    const elem = document.getElementById(id);
    console.log('elem: ', elem);
    navigator.clipboard
      .writeText(elem.innerText)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch((err) => {
        alert('Could not copy');
      });
  };

  const colorTags = document.querySelectorAll('.colorTag');
  console.log('colorTags: ', colorTags);

  colorTags.forEach((colorTag, i) => {
    colorTag.addEventListener('click', () =>
      copytoClipBoard(`color${i + 1}Tag`)
    );
  });
};
renderColorPallete();
generateBtnElem.addEventListener('click', renderColorPallete);
