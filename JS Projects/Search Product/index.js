(async () => {
  const url = 'https://fakestoreapi.com/products';
  const productContainerElem = document.getElementById('productContainer');
  const searchInputElem = document.getElementById('searchInput');

  const fetchProducts = async () => {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return;
    }
  };

  const products = await fetchProducts();

  const generateProducts = (product) => {
    return `
        <div class="product_card">
        <div class="image_container">
          <img
            src="${product.image}"
            alt=""
          /><!--img taken from API https://fakestoreapi.com/products-->
        </div>
        <div class="product_content">
          <h2>${product.title}</h2>
          <!--title taken from API https://fakestoreapi.com/products-->
          <p>
            <!--description taken from API https://fakestoreapi.com/products-->
            ${product.description.split(' ').slice(0, 20).join(' ')}
          </p>
          <button>${product.price} $</button>
        </div>
      </div>
    `;
  };
  const renderProducts = (products) => {
    productContainerElem.innerHTML = '';
    products.forEach((product) => {
      productContainerElem.innerHTML += generateProducts(product);
    });
  };

  const checkTextContain = (text, searchText) => {
    return text.toString().toLowerCase().includes(searchText);
  };

  const filterHandler = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filterProducts = products.filter((product) => {
      return (
        checkTextContain(product.title, searchText) ||
        checkTextContain(product.description, searchText) ||
        checkTextContain(product.price, searchText)
      );
    });

    renderProducts(filterProducts);
  };

  searchInputElem.addEventListener('keyup', filterHandler);

  renderProducts(products);
})();
