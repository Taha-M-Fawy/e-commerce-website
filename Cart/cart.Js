// // دالة لعرض محتويات العربة من التخزين المحلي

// function renderCart() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartContainer = document.getElementById('cart-container');

//     if (cart.length === 0) {
//         cartContainer.innerHTML = '<p>Your cart is empty</p>';
//     } else {
//         let total = 0; // Variable to store the total amount
//         cartContainer.innerHTML = cart.map(item => {
//             const itemTotal = item.price * item.quantity; // Calculate each item's price
//             total += itemTotal; // Add each item's price to the total

//             return `
//                 <div class="cart-item">
//                     <img src="${item.image}" alt="${item.name}">
//                     <div class="cart-item-info">
//                         <p>${item.name}</p>
//                         <div class="quantity-control">
//                             <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
//                             <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" style="width: 50px; text-align: center;" />
//                             <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
//                         </div>
//                         <p class="price">Price: $${itemTotal.toFixed(2)}</p> <!-- Display each item's price -->
//                     </div>
//                     <button onclick="removeFromCart(${item.id})">Delete</button>
//                 </div>
//             `;
//         }).join('');

//         // Add total amount display
//         cartContainer.innerHTML += `<h4>Total: $${total.toFixed(2)}</h4>`; // Display the total
//     }
// }

// function updateCartQuantity(productId, change) {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const foundItem = cart.find(item => item.id === productId);
//     const quantityInput = document.getElementById(`quantity-${productId}`);
//     let currentQuantity = parseInt(quantityInput.value) || 1;

//     // تحديث الكمية بناءً على التغيير
//     currentQuantity += change;

//     // التأكد من أن الكمية لا تقل عن 1
//     if (currentQuantity < 1) {
//         currentQuantity = 1;
//     }

//     // تعيين الكمية الجديدة في حقل الإدخال
//     quantityInput.value = currentQuantity;

//     // تحديث الكمية في العربة
//     if (foundItem) {
//         foundItem.quantity = currentQuantity;
//     }

//     // حفظ العربة المحدثة في التخزين المحلي
//     localStorage.setItem('cart', JSON.stringify(cart));

//     // تحديث عرض العربة
//     renderCart();

// }

// // دالة لإزالة منتج من العربة
// function removeFromCart(productId) {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const updatedCart = cart.filter(item => item.id !== productId);

//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     renderCart(); // تحديث عرض العربة
// }

// // دالة لتفريغ العربة
// function clearCart() {
//     localStorage.removeItem('cart');
//     renderCart();
// }

// // عرض محتويات العربة عند تحميل الصفحة
// document.addEventListener('DOMContentLoaded', renderCart);

//---------------------------------------------------------------------------->
// دالة لعرض محتويات العربة من التخزين المحلي
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // استرجاع بيانات العربة
  const cartContainer = document.getElementById("cart-container"); // العنصر الذي يحتوي على العربة

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p style='color:#db4444'>Your cart is empty</p>"; // عرض رسالة إذا كانت العربة فارغة
  } else {
    let total = 0; // متغير لحساب المجموع النهائي
    cartContainer.innerHTML = cart
      .map((item) => {
        const itemTotal = item.price * item.quantity; // حساب السعر لكل عنصر
        total += itemTotal; // إضافة سعر كل عنصر إلى الإجمالي

        return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${
          item.name
        }"> <!-- عرض صورة المنتج -->
                    <div class="cart-item-info">
                        <p>${item.name}</p> <!-- اسم المنتج -->
                        <div class="quantity-control">
                            <button onclick="updateCartQuantity(${
                              item.id
                            }, -1)">-</button> <!-- زر لتقليل الكمية -->
                            <input type="number" id="quantity-${
                              item.id
                            }" value="${
          item.quantity
        }" min="1" style="width: 50px; text-align: center;" />
                            <button onclick="updateCartQuantity(${
                              item.id
                            }, 1)">+</button> <!-- زر لزيادة الكمية -->
                        </div>
                        <p class="price">Price: $${itemTotal.toFixed(
                          2
                        )}</p> <!-- عرض السعر لكل عنصر -->
                    </div>
                    <button onclick="removeFromCart(${
                      item.id
                    })">Delete</button> <!-- زر لحذف المنتج من العربة -->
                </div>
            `;
      })
      .join("");

    // عرض المجموع النهائي
    cartContainer.innerHTML += `<h4>Total: $${total.toFixed(2)}</h4>`; // عرض الإجمالي
  }
}

// دالة لتحديث كمية المنتجات في العربة
function updateCartQuantity(productId, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // استرجاع العربة
  const foundItem = cart.find((item) => item.id === productId); // البحث عن المنتج في العربة
  const quantityInput = document.getElementById(`quantity-${productId}`);
  let currentQuantity = parseInt(quantityInput.value) || 1;

  // تحديث الكمية بناءً على التغيير
  currentQuantity += change;

  // التأكد من أن الكمية لا تقل عن 1
  if (currentQuantity < 1) {
    currentQuantity = 1;
  }

  // تعيين الكمية الجديدة في حقل الإدخال
  quantityInput.value = currentQuantity;

  // تحديث الكمية في العربة
  if (foundItem) {
    foundItem.quantity = currentQuantity;
  }

  // حفظ العربة المحدثة في التخزين المحلي
  localStorage.setItem("cart", JSON.stringify(cart));

  // تحديث عرض العربة
  renderCart();
}


// دالة لإزالة منتج من العربة
function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // استرجاع العربة
  const updatedCart = cart.filter((item) => item.id !== productId); // إزالة المنتج من العربة

  localStorage.setItem("cart", JSON.stringify(updatedCart)); // حفظ العربة المحدثة
  renderCart(); // تحديث عرض العربة
}

// دالة لتفريغ العربة
function clearCart() {
  localStorage.removeItem("cart");
  renderCart(); 
}

// عرض محتويات العربة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", renderCart); // عرض العربة عند تحميل الصفحة

//---------------------------------------------------------------------------->

// store data-->check out


const cartItems = document.querySelectorAll(".cart-item");
let checkoutData = [];

cartItems.forEach((item) => {
  const productImage = item.querySelector(".product-image").src;
  const productName = item.querySelector(".product-name").textContent;
  const productPrice = item.querySelector(".product-price").dataset.price;

  checkoutData.push({
    image: productImage,
    name: productName,
    price: productPrice,
  });
});

localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

//open checkout_page
document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "../checkout+order/checkoutpage/checkout.html";
});


