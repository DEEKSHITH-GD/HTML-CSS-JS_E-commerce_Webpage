document.addEventListener('DOMContentLoaded', function () {
    const listButton = document.querySelector(".ListButton");
    const gridButton = document.querySelector(".GridButton");
    const productsList = document.querySelector('.listView .products');
    const productsGrid = document.querySelector('.gridView .products');

    async function fetchProducts(url, container) {
        let data = await fetch(url);
        let response = await data.json();
        let dataArray = response.data;

        for (let i = 0; i < dataArray.length; i++) {
            container.innerHTML += `
                        <div class="product">
                            <img src="${dataArray[i].product_image}" alt="" class="product_image">
                            <span class="badge"><h3 class="product_badge">${dataArray[i].product_badge}</h3></span>
                            <div class = text>
                                <h2 class="product_title">${dataArray[i].product_title}</h2>
                                <div class="product_variants-container">
                                    <div class="varient">
                                        <h3>${dataArray[i].product_variants[0].v1}</h3>
                                    </div>
                                    <div class="varient">
                                        <h3>${dataArray[i].product_variants[1].v2}</h3>
                                    </div>
                                    <div class="varient">
                                        <h3>${dataArray[i].product_variants[2].v3}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
        }
    }

    
    fetchProducts('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093', productsList);

    listButton.addEventListener("click", () => {
        productsGrid.innerHTML = '';
        fetchProducts('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093', productsList);
    });

    gridButton.addEventListener("click", () => {
        productsList.innerHTML = '';
        fetchProducts('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093', productsGrid);
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        highlightSearchResults(query);
    });

    function highlightSearchResults(query) {
        const productVariants = document.querySelectorAll('.varient h3');

        productVariants.forEach(variant => {
            const text = variant.textContent.toLowerCase();
            if (text.includes(query)) {
                variant.classList.add('highlighted');
            } else {
                variant.classList.remove('highlighted');
            }
        });
        if (query === '') {
            productVariants.forEach(variant => {
                variant.classList.remove('highlighted');
            });
        }
        
    }
});
