const qrFormElem = document.getElementById('qrForm');
const qrImageElem = document.getElementById('qrImage');
const qrContainerElem = document.getElementById('qrContainer');
const qrInputTextElem = document.getElementById('qrInputText');

const renderQRCode = (url) => {
  if (!url) return;

  qrImageElem.src = url;
  qrContainerElem.classList.add('show');

  qrImageElem.addEventListener('load', () => {});
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
