 // جلب معرف المنتج من الـ URL
 function getProductIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');  // الحصول على قيمة المعرف من المعلمة id
}

var productId = getProductIdFromURL();
var url = "https://dummyjson.com/products";

// دالة لجلب بيانات منتج واحد
async function GetSingleProduct() {
    try {
        var request = await fetch(`${url}/${productId}`, { method: "GET" });
        var product = await request.json();
        console.log(product);

        var container = document.getElementById('product-container');

        // التأكد من أن المنتج يحتوي على صور
        let productImage = product.images && product.images.length > 0 ? product.images[0] : 'default.jpg'; // صورة افتراضية إذا لم تكن هناك صور

        // إضافة بيانات المنتج إلى HTML
        container.innerHTML = `
        <div class="Row">
            <img src="${productImage}" class="card-img-top" alt="${product.title}">
            <div class="Row-body">
                <h5 class="card-title">${product.brand}</h5>
                <p class="card-text">${product.description}</p>
                <p class="price"><strong>Price:</strong> $${product.price}</p>
        <div class="quantity-control">
            <button onclick="updateQuantity(${product.id}, -1)">-</button>
            <input type="number" id="quantity-${product.id}" value="1" min="1" />
            <button onclick="updateQuantity(${product.id}, 1)">+</button>
        </div>
                
                <button class="btn" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${productImage}')">Add To Cart</button>
            </div>
        </div>
        `;
    } catch (error) {
        console.log(error);
    }
}

// دالة لإضافة المنتج إلى العربة باستخدام التخزين المحلي
function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value) || 1; // احصل على الكمية من حقل الإدخال

    let foundItem = cart.find(item => item.id === productId);

    if (foundItem) {
        foundItem.quantity += quantity; // زد الكمية
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity // استخدم الكمية المحددة
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert( "The product has been added to the cart successfully");

    window.open("./../Cart/cart.html", "_blank");
}

function updateQuantity(productId, change) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityInput.value) || 0;

    currentQuantity += change;

    // تأكد من أن الكمية لا تصبح أقل من 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    quantityInput.value = currentQuantity;
}


// استدعاء دالة جلب المنتج عند تحميل الصفحة
GetSingleProduct();