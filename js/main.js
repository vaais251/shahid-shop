// Main JavaScript functionality for the e-commerce website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize featured products on homepage
    initFeaturedProducts();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Newsletter form submission
    initNewsletterForm();
    
    // Initialize product page functionality if on product page
    if (document.querySelector('.product-details-container')) {
        initProductPage();
    }
    
    // Initialize shop page functionality if on shop page
    if (document.querySelector('.shop-container')) {
        initShopPage();
    }
    
    // Initialize wishlist count
    updateWishlistCount();
});

// Initialize featured products on homepage
function initFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    
    if (!featuredProductsGrid) return;
    
    const featuredProducts = getFeaturedProducts();
    
    featuredProductsGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        featuredProductsGrid.appendChild(createProductCard(product));
    });
}

// Create product card element
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    // Create badge HTML if product has a badge
    let badgeHTML = '';
    if (product.badge) {
        badgeHTML = `<div class="product-badge badge-${product.badge}">${product.badge}</div>`;
    }
    
    // Create original price HTML if product has an original price
    let originalPriceHTML = '';
    if (product.originalPrice) {
        originalPriceHTML = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
    }
    
    // Create star rating HTML
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    // Fix image path for pages directory
    let imagePath = product.image;
    if (window.location.pathname.includes('/pages/')) {
        // If we're in the pages directory, add ../ to the path
        imagePath = '../' + product.image;
    }
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${imagePath}" alt="${product.name}">
            ${badgeHTML}
            <div class="product-wishlist">
                <i class="far fa-heart"></i>
            </div>
        </div>
        <div class="product-details">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-category">${product.category}</div>
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${originalPriceHTML}
            </div>
            <div class="product-rating">
                <div class="stars">${starsHTML}</div>
                <div class="rating-count">(${product.ratingCount})</div>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add event listener to wishlist icon
    const wishlistIcon = productCard.querySelector('.product-wishlist');
    
    // Check if product is already in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isInWishlist = wishlist.includes(product.id);
    
    // Update icon if product is already in wishlist
    if (isInWishlist) {
        wishlistIcon.innerHTML = '<i class="fas fa-heart"></i>';
        wishlistIcon.style.color = '#ff6b6b';
    }
    
    wishlistIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Toggle wishlist status
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.indexOf(product.id);
        
        if (index === -1) {
            // Add to wishlist
            wishlist.push(product.id);
            wishlistIcon.innerHTML = '<i class="fas fa-heart"></i>';
            wishlistIcon.style.color = '#ff6b6b';
            
            // Show success message
            showNotification('Added to wishlist!', 'success');
        } else {
            // Remove from wishlist
            wishlist.splice(index, 1);
            wishlistIcon.innerHTML = '<i class="far fa-heart"></i>';
            wishlistIcon.style.color = '';
            
            // Show removal message
            showNotification('Removed from wishlist', 'info');
        }
        
        // Save wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Update wishlist count in header
        updateWishlistCount();
    });
    
    return productCard;
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (!mobileMenuToggle || !nav) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = 'white';
            nav.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '20px';
            nav.style.zIndex = '99';
        } else {
            nav.style.display = '';
        }
    });
}

// Newsletter form submission
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // In a real application, you would send this to a server
        // For demo purposes, we'll just show a success message
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
    });
}

// Initialize product page functionality
function initProductPage() {
    // Get product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) return;
    
    const product = getProductById(productId);
    
    if (!product) {
        document.querySelector('.product-details-container').innerHTML = '<p>Product not found</p>';
        return;
    }
    
    // Update product details
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    
    // Update product features
    const featuresContainer = document.getElementById('product-features');
    featuresContainer.innerHTML = '';
    
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });
    
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('quantity');
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        
        if (isNaN(quantity) || quantity < 1) {
            alert('Please enter a valid quantity');
            return;
        }
        
        if (cart.addItem(productId, quantity)) {
            // Show cart sidebar after adding item
            document.querySelector('.cart-sidebar').classList.add('active');
            document.querySelector('.overlay').classList.add('active');
        }
    });
}

// Initialize shop page functionality
function initShopPage() {
    const productsGrid = document.querySelector('.shop-products-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('product-search');
    
    if (!productsGrid) return;
    
    // Get filter values from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const saleParam = urlParams.get('sale');
    const filterParam = urlParams.get('filter');
    
    // Filter products based on URL parameters
    let filteredProducts = [...products];
    
    if (categoryParam) {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === categoryParam.toLowerCase()
        );
        
        if (categoryFilter) {
            categoryFilter.value = categoryParam;
        }
    }
    
    if (saleParam) {
        filteredProducts = filteredProducts.filter(product => product.badge === 'sale');
    }
    
    if (filterParam === 'new') {
        filteredProducts = filteredProducts.filter(product => product.badge === 'new');
    }
    
    // Display products
    displayProducts(filteredProducts, productsGrid);
    
    // Category filter change event
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            filterAndDisplayProducts();
        });
    }
    
    // Sort filter change event
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            filterAndDisplayProducts();
        });
    }
    
    // Search input event
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterAndDisplayProducts();
        });
    }
    
    // Filter and display products based on current filter values
    function filterAndDisplayProducts() {
        let filtered = [...products];
        
        // Apply category filter
        if (categoryFilter && categoryFilter.value !== 'all') {
            filtered = filtered.filter(product => 
                product.category.toLowerCase() === categoryFilter.value.toLowerCase()
            );
        }
        
        // Apply search filter
        if (searchInput && searchInput.value.trim() !== '') {
            const searchQuery = searchInput.value.trim().toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchQuery) || 
                product.category.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery)
            );
        }
        
        // Apply sort filter
        if (sortFilter) {
            switch (sortFilter.value) {
                case 'price-low-high':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high-low':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'name-a-z':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-z-a':
                    filtered.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
            }
        }
        
        displayProducts(filtered, productsGrid);
    }
}

// Display products in grid
function displayProducts(products, container) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }
    
    products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Get featured products (for homepage)
function getFeaturedProducts() {
    // Return a subset of products for featured section
    return products.filter(product => product.badge === 'new' || product.badge === 'sale').slice(0, 4);
}

// Update wishlist count in header
function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistCount.textContent = wishlist.length;
    }
}

// Show notification message
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}
