// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.subtotal = 0;
        this.shipping = 0;
        this.total = 0;
        this.updateCartSummary();
    }

    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = getProductById(productId);
        
        if (!product) {
            console.error('Product not found');
            return false;
        }

        // Check if product already exists in cart
        const existingItemIndex = this.items.findIndex(item => item.id === productId);

        if (existingItemIndex !== -1) {
            // Update quantity if product already in cart
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartSummary();
        this.updateCartUI();
        
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartSummary();
        this.updateCartUI();
    }

    // Update item quantity
    updateItemQuantity(productId, quantity) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        
        if (itemIndex === -1) {
            console.error('Product not found in cart');
            return false;
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            this.removeItem(productId);
            return true;
        }

        this.items[itemIndex].quantity = quantity;
        this.saveCart();
        this.updateCartSummary();
        this.updateCartUI();
        
        return true;
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartSummary();
        this.updateCartUI();
    }

    // Calculate cart summary (subtotal, shipping, total)
    updateCartSummary() {
        // Calculate subtotal
        this.subtotal = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Calculate shipping (free shipping over $50, otherwise $5.99)
        this.shipping = this.subtotal > 50 ? 0 : 5.99;

        // Calculate total
        this.total = this.subtotal + this.shipping;

        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const itemCount = this.items.reduce((count, item) => count + item.quantity, 0);
            cartCount.textContent = itemCount;
        }

        // Update cart summary in sidebar
        const subtotalElement = document.getElementById('cart-subtotal');
        const shippingElement = document.getElementById('cart-shipping');
        const totalElement = document.getElementById('cart-total');

        if (subtotalElement) subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = this.shipping === 0 ? 'Free' : `$${this.shipping.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${this.total.toFixed(2)}`;
    }

    // Update cart UI
    updateCartUI() {
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (!cartItemsContainer) return;

        // Clear current items
        cartItemsContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        // Add each item to cart UI
        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            // Fix image path for pages directory
            let imagePath = item.image;
            if (window.location.pathname.includes('/pages/')) {
                // If we're in the pages directory, add ../ to the path
                imagePath = '../' + item.image;
            }
            
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${imagePath}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Add event listeners for quantity buttons and remove buttons
        this.addCartItemEventListeners();
    }

    // Add event listeners to cart items
    addCartItemEventListeners() {
        // Decrease quantity buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateItemQuantity(productId, item.quantity - 1);
                }
            });
        });

        // Increase quantity buttons
        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateItemQuantity(productId, item.quantity + 1);
                }
            });
        });

        // Quantity input fields
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', () => {
                const productId = parseInt(input.getAttribute('data-id'));
                const quantity = parseInt(input.value);
                if (!isNaN(quantity) && quantity > 0) {
                    this.updateItemQuantity(productId, quantity);
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                this.removeItem(productId);
            });
        });
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Get cart items
    getItems() {
        return this.items;
    }

    // Get cart summary
    getSummary() {
        return {
            subtotal: this.subtotal,
            shipping: this.shipping,
            total: this.total
        };
    }
}

// Initialize cart
let cart;

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
    
    // Use event delegation for "Add to Cart" buttons
    document.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            const productId = parseInt(addToCartBtn.getAttribute('data-id'));
            if (cart.addItem(productId, 1)) {
                // Show cart sidebar after adding item
                document.querySelector('.cart-sidebar').classList.add('active');
                document.querySelector('.overlay').classList.add('active');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('cart-success-message');
                successMessage.textContent = 'Item added to cart!';
                document.body.appendChild(successMessage);
                
                // Remove success message after 2 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 2000);
            }
        }
    });

    // Cart sidebar toggle
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.cart-sidebar').classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            document.querySelector('.cart-sidebar').classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            document.querySelector('.cart-sidebar').classList.remove('active');
            overlay.classList.remove('active');
        });
    }
});
