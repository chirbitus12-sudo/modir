// ========================
// PRODUCTS DATA
// ========================
const DEFAULT_PRODUCTS = [
    {
        id: "prod-1",
        title: "كتاب الدليل الشامل للتجارة الرقمية",
        description: "تعلم أسرار وخطوات إطلاق مشروعك الرقمي الناجح من الصفر وتحقيق أرباح مستمرة.",
        price: "1500 دج",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        downloadUrl: "https://example.com/downloads/digital-commerce-guide.pdf"
    },
    {
        id: "prod-2",
        title: "قالب صفحة هبوط احترافي (HTML/CSS)",
        description: "قالب صفحة هبوط عصري وسريع متوافق تماماً مع الهواتف الذكية لزيادة مبيعاتك.",
        price: "2500 دج",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        downloadUrl: "https://example.com/downloads/landing-page-template.zip"
    },
    {
        id: "prod-3",
        title: "دورة أساسيات تصميم واجهات المستخدم UI/UX",
        description: "سلسلة فيديوهات مسجلة تشرح لك تصميم واجهات وتجربة المستخدم خطوة بخطوة بالصوت والصورة.",
        price: "4500 دج",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932dedf?auto=format&fit=crop&w=600&q=80",
        downloadUrl: "https://example.com/downloads/uiux-design-course.zip"
    }
];

const DEFAULT_SETTINGS = {
    ccpName: "بريدي موب",
    ccpAccount: "11833185",
    ccpKey: "32",
    storeName: "المتجر الرقمي"
};

// ========================
// DATABASE (localStorage)
// ========================
const db = {
    getSettings: () => {
        let settings = localStorage.getItem("store_settings");
        if (!settings) {
            localStorage.setItem("store_settings", JSON.stringify(DEFAULT_SETTINGS));
            return DEFAULT_SETTINGS;
        }
        return JSON.parse(settings);
    },
    saveSettings: (settings) => {
        localStorage.setItem("store_settings", JSON.stringify(settings));
    },
    getProducts: () => {
        let prods = localStorage.getItem("products");
        if (!prods) {
            localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
            return DEFAULT_PRODUCTS;
        }
        return JSON.parse(prods);
    },
    saveProducts: (products) => {
        localStorage.setItem("products", JSON.stringify(products));
    },
    addProduct: (product) => {
        const products = db.getProducts();
        products.unshift(product);
        db.saveProducts(products);
    },
    updateProduct: (productId, updatedProduct) => {
        const products = db.getProducts();
        const updated = products.map(p => p.id === productId ? { ...p, ...updatedProduct } : p);
        db.saveProducts(updated);
    },
    deleteProduct: (productId) => {
        const products = db.getProducts();
        const filtered = products.filter(p => p.id !== productId);
        db.saveProducts(filtered);
    },
    getOrders: () => {
        return JSON.parse(localStorage.getItem("orders")) || [];
    },
    saveOrders: (orders) => {
        localStorage.setItem("orders", JSON.stringify(orders));
    },
    addOrder: (order) => {
        const orders = db.getOrders();
        orders.unshift(order);
        db.saveOrders(orders);
    },
    updateOrderStatus: (orderId, status) => {
        const orders = db.getOrders();
        const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
        db.saveOrders(updated);
    },
    deleteOrder: (orderId) => {
        const orders = db.getOrders();
        const filtered = orders.filter(o => o.id !== orderId);
        db.saveOrders(filtered);
    }
};

// ========================
// TOAST NOTIFICATION
// ========================
function showToast(message, type = "success") {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ========================
// HEADER SCROLL EFFECT
// ========================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ========================
// SCROLL ANIMATIONS
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card, .product-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
