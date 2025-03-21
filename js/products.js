// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 79.99,
        originalPrice: 99.99,
        image: "images/products/headphones.jpg",
        badge: "sale",
        rating: 4.5,
        ratingCount: 128,
        description: "Experience premium sound quality with these comfortable wireless headphones. Features noise cancellation and 20-hour battery life.",
        inStock: true,
        features: [
            "Bluetooth 5.0 connectivity",
            "Active noise cancellation",
            "20-hour battery life",
            "Built-in microphone",
            "Comfortable over-ear design"
        ]
    },
    {
        id: 2,
        name: "Smart Fitness Tracker",
        category: "Electronics",
        price: 49.99,
        originalPrice: 59.99,
        image: "images/products/fitness-tracker.jpg",
        badge: "new",
        rating: 4.2,
        ratingCount: 75,
        description: "Track your fitness goals with this waterproof smart tracker. Monitors heart rate, steps, sleep, and more.",
        inStock: true,
        features: [
            "Heart rate monitoring",
            "Step counter",
            "Sleep tracking",
            "Waterproof design",
            "7-day battery life"
        ]
    },
    {
        id: 3,
        name: "Men's Casual Shirt",
        category: "Fashion",
        price: 34.99,
        originalPrice: null,
        image: "images/products/mens-shirt.jpg",
        badge: null,
        rating: 4.0,
        ratingCount: 42,
        description: "Comfortable and stylish casual shirt for men. Made from 100% cotton with a modern fit.",
        inStock: true,
        features: [
            "100% cotton material",
            "Modern fit",
            "Button-down collar",
            "Machine washable",
            "Available in multiple colors"
        ]
    },
    {
        id: 4,
        name: "Women's Running Shoes",
        category: "Fashion",
        price: 89.99,
        originalPrice: 119.99,
        image: "images/products/womens-shoes.jpg",
        badge: "sale",
        rating: 4.7,
        ratingCount: 156,
        description: "Lightweight and comfortable running shoes for women. Features cushioned insole and breathable design.",
        inStock: true,
        features: [
            "Lightweight design",
            "Cushioned insole",
            "Breathable mesh upper",
            "Non-slip outsole",
            "Shock absorption"
        ]
    },
    {
        id: 5,
        name: "Stainless Steel Water Bottle",
        category: "Home & Living",
        price: 24.99,
        originalPrice: null,
        image: "images/products/water-bottle.jpg",
        badge: null,
        rating: 4.3,
        ratingCount: 89,
        description: "Keep your drinks hot or cold with this vacuum-insulated stainless steel water bottle. Leak-proof and durable.",
        inStock: true,
        features: [
            "Vacuum insulation",
            "Keeps drinks hot for 12 hours",
            "Keeps drinks cold for 24 hours",
            "Leak-proof design",
            "BPA-free"
        ]
    },
    {
        id: 6,
        name: "Scented Soy Candle",
        category: "Home & Living",
        price: 19.99,
        originalPrice: 24.99,
        image: "images/products/candle.jpg",
        badge: "sale",
        rating: 4.8,
        ratingCount: 64,
        description: "Hand-poured soy candle with natural essential oils. Long-lasting and clean-burning.",
        inStock: true,
        features: [
            "100% soy wax",
            "Natural essential oils",
            "40-hour burn time",
            "Reusable glass container",
            "Eco-friendly"
        ]
    },
    {
        id: 7,
        name: "Organic Face Serum",
        category: "Beauty",
        price: 29.99,
        originalPrice: null,
        image: "images/products/face-serum.jpg",
        badge: "new",
        rating: 4.6,
        ratingCount: 37,
        description: "Rejuvenate your skin with this organic face serum. Contains vitamin C and hyaluronic acid.",
        inStock: true,
        features: [
            "Organic ingredients",
            "Vitamin C",
            "Hyaluronic acid",
            "Cruelty-free",
            "Suitable for all skin types"
        ]
    },
    {
        id: 8,
        name: "Moisturizing Lip Balm Set",
        category: "Beauty",
        price: 14.99,
        originalPrice: null,
        image: "images/products/lip-balm.jpg",
        badge: null,
        rating: 4.1,
        ratingCount: 52,
        description: "Set of 4 moisturizing lip balms with natural ingredients. Keeps lips soft and hydrated.",
        inStock: true,
        features: [
            "Set of 4 flavors",
            "Natural ingredients",
            "SPF 15 protection",
            "Long-lasting hydration",
            "Travel-friendly size"
        ]
    },
    {
        id: 9,
        name: "Premium Laptop",
        category: "Electronics",
        price: 999.99,
        originalPrice: 1199.99,
        image: "images/products/laptop.jpg",
        badge: "sale",
        rating: 4.9,
        ratingCount: 203,
        description: "High-performance laptop with the latest processor, ample storage, and stunning display for work and entertainment.",
        inStock: true,
        features: [
            "Latest generation processor",
            "16GB RAM",
            "512GB SSD storage",
            "15.6-inch Full HD display",
            "Backlit keyboard"
        ]
    },
    {
        id: 10,
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        originalPrice: null,
        image: "images/products/smartphone.jpg",
        badge: "new",
        rating: 4.7,
        ratingCount: 178,
        description: "Feature-packed smartphone with high-resolution camera, long battery life, and powerful performance.",
        inStock: true,
        features: [
            "6.5-inch OLED display",
            "Triple camera system",
            "5G connectivity",
            "All-day battery life",
            "Water and dust resistant"
        ]
    },
    {
        id: 11,
        name: "Smartwatch",
        category: "Electronics",
        price: 149.99,
        originalPrice: 179.99,
        image: "images/products/smartwatch.jpg",
        badge: "sale",
        rating: 4.4,
        ratingCount: 92,
        description: "Track your fitness, receive notifications, and more with this stylish and functional smartwatch.",
        inStock: true,
        features: [
            "Heart rate monitoring",
            "GPS tracking",
            "Water resistant",
            "Customizable watch faces",
            "7-day battery life"
        ]
    },
    {
        id: 12,
        name: "Coffee Maker",
        category: "Home & Living",
        price: 59.99,
        originalPrice: null,
        image: "images/products/coffee-maker.jpg",
        badge: null,
        rating: 4.5,
        ratingCount: 124,
        description: "Brew delicious coffee at home with this programmable coffee maker. Features multiple brew settings and a thermal carafe.",
        inStock: true,
        features: [
            "12-cup capacity",
            "Programmable timer",
            "Multiple brew strengths",
            "Thermal carafe",
            "Auto shut-off"
        ]
    },
    {
        id: 13,
        name: "High-Speed Blender",
        category: "Home & Living",
        price: 89.99,
        originalPrice: 109.99,
        image: "images/products/blender.jpg",
        badge: "sale",
        rating: 4.6,
        ratingCount: 87,
        description: "Powerful blender for smoothies, soups, and more. Features multiple speed settings and durable construction.",
        inStock: true,
        features: [
            "1000-watt motor",
            "Multiple speed settings",
            "Pulse function",
            "Dishwasher-safe parts",
            "BPA-free materials"
        ]
    },
    {
        id: 14,
        name: "2-Slice Toaster",
        category: "Home & Living",
        price: 29.99,
        originalPrice: null,
        image: "images/products/toaster.jpg",
        badge: null,
        rating: 4.2,
        ratingCount: 65,
        description: "Stylish and functional toaster with multiple browning settings. Perfect for any kitchen.",
        inStock: true,
        features: [
            "7 browning settings",
            "Bagel and defrost functions",
            "Extra-wide slots",
            "High-lift lever",
            "Removable crumb tray"
        ]
    },
    {
        id: 15,
        name: "Travel Backpack",
        category: "Fashion",
        price: 49.99,
        originalPrice: 69.99,
        image: "images/products/backpack.jpg",
        badge: "sale",
        rating: 4.8,
        ratingCount: 112,
        description: "Durable and comfortable backpack for travel and everyday use. Features multiple compartments and padded straps.",
        inStock: true,
        features: [
            "Water-resistant material",
            "Laptop compartment",
            "Multiple pockets",
            "Padded shoulder straps",
            "Luggage strap"
        ]
    },
    {
        id: 16,
        name: "Designer Sunglasses",
        category: "Fashion",
        price: 129.99,
        originalPrice: null,
        image: "images/products/sunglasses.jpg",
        badge: "new",
        rating: 4.7,
        ratingCount: 58,
        description: "Stylish designer sunglasses with UV protection. Perfect for any outfit and occasion.",
        inStock: true,
        features: [
            "100% UV protection",
            "Polarized lenses",
            "Durable frame",
            "Includes case and cleaning cloth",
            "1-year warranty"
        ]
    },
    {
        id: 17,
        name: "Premium Yoga Mat",
        category: "Sports",
        price: 39.99,
        originalPrice: 49.99,
        image: "images/products/yoga-mat.jpg",
        badge: "sale",
        rating: 4.8,
        ratingCount: 95,
        description: "High-quality, non-slip yoga mat for comfortable practice. Perfect for yoga, pilates, and other floor exercises.",
        inStock: true,
        features: [
            "6mm thickness for comfort",
            "Non-slip surface",
            "Eco-friendly materials",
            "Easy to clean",
            "Includes carrying strap"
        ]
    },
    {
        id: 18,
        name: "Adjustable Dumbbells Set",
        category: "Sports",
        price: 149.99,
        originalPrice: null,
        image: "images/products/dumbbells.jpg",
        badge: "new",
        rating: 4.6,
        ratingCount: 72,
        description: "Space-saving adjustable dumbbells set for home workouts. Easily change weights for different exercises.",
        inStock: true,
        features: [
            "Adjustable from 5-25 lbs each",
            "Quick weight change mechanism",
            "Durable construction",
            "Compact storage",
            "Includes storage tray"
        ]
    },
    {
        id: 19,
        name: "Bestselling Novel",
        category: "Books",
        price: 19.99,
        originalPrice: 24.99,
        image: "images/products/novel.jpg",
        badge: "sale",
        rating: 4.9,
        ratingCount: 215,
        description: "Immerse yourself in this captivating story that has topped bestseller lists worldwide. A perfect addition to your reading collection.",
        inStock: true,
        features: [
            "Hardcover edition",
            "Award-winning author",
            "International bestseller",
            "400 pages",
            "Includes bonus content"
        ]
    },
    {
        id: 20,
        name: "Gourmet Cookbook",
        category: "Books",
        price: 34.99,
        originalPrice: null,
        image: "images/products/cookbook.jpg",
        badge: "new",
        rating: 4.7,
        ratingCount: 86,
        description: "Learn to cook delicious gourmet meals at home with this beautifully illustrated cookbook featuring recipes from around the world.",
        inStock: true,
        features: [
            "200+ recipes",
            "Step-by-step instructions",
            "Beautiful food photography",
            "Hardcover with premium binding",
            "Written by a renowned chef"
        ]
    }
];

// Function to get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Function to get products by badge (new, sale, etc.)
function getProductsByBadge(badge) {
    return products.filter(product => product.badge === badge);
}

// Function to get a product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to get featured products (for homepage)
function getFeaturedProducts() {
    // For demo purposes, return first 4 products as featured
    return products.slice(0, 4);
}

// Function to search products
function searchProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
}
