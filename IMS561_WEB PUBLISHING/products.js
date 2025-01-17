document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const categoryFilter = document.getElementById('category-filter');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productsData = [
        {
            id: 1,
            name: 'Taesan: HOW? Weverse',
            price: 150000,
            image: 'photos/photocard/boynextdoor/taesan_1_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'album']
        },
        {
            id: 2,
            name: 'Taesan: Membership Sailor',
            price: 65000,
            image: 'photos/photocard/boynextdoor/taesan_3_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'membership']
        },
        {
            id: 3,
            name: 'Sungho Maung',
            price: 55000,
            image: 'photos/photocard/boynextdoor/sungho_1_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'event']
        },
        {
            id: 4,
            name: 'Leehan: Baby Photo',
            price: 150000,
            image: 'photos/photocard/boynextdoor/leehan_1_pc_front.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'album']
        },
        {
            id: 5,
            name: 'Taesan: Birthday Pola',
            price: 30000,
            image: 'photos/photocard/boynextdoor/taesan_4_pola.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'polaroid', 'event']
        },
        {
            id: 6,
            name: 'Woodz Equal (Earth Ver.): Stiker',
            price: 10000,
            image: 'photos/sticker/woodz_1_sticker.png',
            maxQuantity: 1,
            categories: ['woodz', 'sticker', 'album']
        },
        {
            id: 7,
            name: 'Xiaojun NCT UNIVERSE: Sticker',
            price: 10000,
            image: 'photos/sticker/xiaojun_1_sticker.png',
            maxQuantity: 1,
            categories: ['wayv', 'sticker', 'album']
        },
        {
            id: 8,
            name: 'Leehan: Membership Sailor',
            price: 65000,
            image: 'photos/photocard/boynextdoor/leehan_4_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'membership']
        },
        {
            id: 9,
            name: 'Jae Demon Midday Ver: Bookmark',
            price: 50000,
            image: 'photos/photocard/jae_1_bookmark.png',
            maxQuantity: 1,
            categories: ['day6', 'bookmark', 'album']
        },
        {
            id: 10,
            name: 'Seunghwan XXI: Circle Card',
            price: 10000,
            image: 'photos/photocard/seunghwan_1_circle_full.png',
            maxQuantity: 1,
            categories: ['wei', 'circle card', 'album']
        },
        {
            id: 11,
            name: 'Yejun Asterum: QR (Unscanned)',
            price: 65000,
            image: 'photos/photocard/yejun_1_qr_full.png',
            maxQuantity: 1,
            categories: ['plave', 'photocard', 'album']
        },
        {
            id: 12,
            name: 'Eunho Makan',
            price: 50000,
            image: 'photos/photocard/trans_2.png',
            maxQuantity: 1,
            categories: ['plave', 'transparent card']
        },
    {
            id: 13,
            name: 'DK SVT 2022 PB TN17: Postcard',
            price: 40000,
            image: 'photos/photocard/seventeen/dk_1_postcard_full.png',
            maxQuantity: 1,
            categories: ['seventeen', 'postcard']
        },
    ];

    function displayProducts(productsToDisplay) {
        productContainer.innerHTML = '';

        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">Rp${product.price.toLocaleString()}</div>
                <input type="number" min="1" max="${product.maxQuantity}" value="1" class="quantity">
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productElement);
        });

        attachAddToCartEventListeners();
    }

    function addToCart(product) {
        let existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            if (existingProduct.quantity < existingProduct.maxQuantity) {
                existingProduct.quantity++;
            } else {
                alert(`Sorry, we only have ${existingProduct.maxQuantity} of ${existingProduct.name}.`);
                return;
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function attachAddToCartEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productElement = button.closest('.product');
                const productId = parseInt(button.dataset.productId);
                const product = productsData.find(p => p.id === productId);

                if (product) {
                    addToCart(product);
                }
            });
        });
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('box');
            cartItem.innerHTML = `
                <i class="fa fa-trash remove-item" data-product-id="${item.id}"></i>
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">Rp${item.price.toLocaleString()}</span>
                    <span class="quantity">Qty: ${item.quantity}</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: Rp${totalPrice.toLocaleString()}`;

        attachRemoveEventListeners();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function attachRemoveEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.productId);
                removeFromCart(productId);
            });
        });
    }

    function createCategoryFilters() {
        const groupCategories = new Set();
        const materialCategories = new Set();
        const typeCategories = new Set();
    
        productsData.forEach(product => {
            product.categories.forEach(category => {
                if (['boynextdoor', 'woodz', 'wayv', 'seventeen', 'wei', 'day6', 'got7', 'plave'].includes(category)) {
                    groupCategories.add(category);
                } else if (['photocard', 'polaroid', 'sticker', 'postcard', 'circle card', 'bookmark', 'transparent card', 'photo id'].includes(category)) {
                    materialCategories.add(category);
                } else if (['membership', 'album', 'event'].includes(category)) {
                    typeCategories.add(category);
                }
            });
        });
    
        categoryFilter.innerHTML = '';
    
        // Sort and create group filter section
        const sortedGroupCategories = Array.from(groupCategories).sort();
        if (sortedGroupCategories.length > 0) {
            const groupFilterHeader = document.createElement('h3');
            groupFilterHeader.textContent = 'Group';
            categoryFilter.appendChild(groupFilterHeader);
    
            sortedGroupCategories.forEach(category => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter-option');
                filterElement.innerHTML = `
                    <input type="checkbox" id="${category}" name="category" value="${category}">
                    <label for="${category}">${category}</label>
                `;
                categoryFilter.appendChild(filterElement);
            });
        }
    
        // Sort and create material filter section
        const sortedMaterialCategories = Array.from(materialCategories).sort();
        if (sortedMaterialCategories.length > 0) {
            const materialFilterHeader = document.createElement('h3');
            materialFilterHeader.textContent = 'Material';
            categoryFilter.appendChild(materialFilterHeader);
    
            sortedMaterialCategories.forEach(category => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter-option');
                filterElement.innerHTML = `
                    <input type="checkbox" id="${category}" name="category" value="${category}">
                    <label for="${category}">${category}</label>
                `;
                categoryFilter.appendChild(filterElement);
            });
        }
    
        // Sort and create type filter section
        const sortedTypeCategories = Array.from(typeCategories).sort();
        if (sortedTypeCategories.length > 0) {
            const typeFilterHeader = document.createElement('h3');
            typeFilterHeader.textContent = 'Type';
            categoryFilter.appendChild(typeFilterHeader);
    
            sortedTypeCategories.forEach(category => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter-option');
                filterElement.innerHTML = `
                    <input type="checkbox" id="${category}" name="category" value="${category}">
                    <label for="${category}">${category}</label>
                `;
                categoryFilter.appendChild(filterElement);
            });
        }
    
        attachCategoryFilterEventListeners();
    }
    

    function attachCategoryFilterEventListeners() {
        const filterOptions = document.querySelectorAll('.filter-option input');
        filterOptions.forEach(option => {
            option.addEventListener('change', () => {
                const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                    .map(el => el.value);
                filterProducts(selectedCategories);
            });
        });
    }

    function filterProducts(selectedCategories) {
        const filteredProducts = selectedCategories.length > 0
            ? productsData.filter(product => selectedCategories.every(category => product.categories.includes(category)))
            : productsData;
        displayProducts(filteredProducts);
    }

    // Initialize and display on page load
    displayProducts(productsData);
    createCategoryFilters();
    updateCartDisplay();
});
