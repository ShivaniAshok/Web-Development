const qrFormElem = document.getElementById('qrForm');
const qrImageElem = document.getElementById('qrImage');
const qrContainerElem = document.getElementById('qrContainer');
const qrInputTextElem = document.getElementById('qrInputText');
const generateBtnElem = document.getElementById('generateBtn');

const renderQRCode = (url) => {
  if (!url) return;

  generateBtnElem.innerText = 'Generating QR Code';
  qrImageElem.src = url;

  const onImageLoad = () => {
    const interval = setInterval(() => {
      qrContainerElem.classList.add('show');

      clearInterval(interval);
      generateBtnElem.innerText = 'Generate QR Code';
    }, 500);
  };

  qrImageElem.addEventListener('load', onImageLoad);
};

qrFormElem.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(qrFormElem);
  const data = formData.get('qrText');
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;

  console.log('data: ', data);

  renderQRCode(qrCodeUrl);
});

qrInputTextElem.addEventListener('keyup', () => {
  if (!qrInputTextElem.value.trim()) {
    qrContainerElem.classList.remove('show');
  }
});
