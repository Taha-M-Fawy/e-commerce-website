document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const summary = document.getElementById("summary");
  const payMethodInputs = document.getElementsByName("payment");
  let subtotal = 0;
  let totalItems = 0;

  // إزالة المنتجات السابقة
  const oldProducts = document.querySelectorAll(".product");
  oldProducts.forEach(el => el.remove());

  // عرض المنتجات بالتفصيل
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    totalItems += item.quantity;

    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <span>${item.name} x${item.quantity} - $${item.price.toFixed(2)} each</span>
      <span>$${itemTotal.toFixed(2)}</span>
    `;
    summary.before(productDiv);
  });

  let total = subtotal;
  let discount = 0;

  // تحديث ملخص الطلب
  function updateSummary() {
    summary.innerHTML = `
      <div class="row"><span>Items Count:</span><span>${totalItems}</span></div>
      <div class="row"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="row"><span>Discount:</span><span>-$${discount.toFixed(2)}</span></div>
      <div class="row"><span>Shipping:</span><span>Free</span></div>
      <div class="row total"><span>Total:</span><span id="total-price">$${(total - discount).toFixed(2)}</span></div>
    `;
  }

  updateSummary();

  // كود الخصم
  document.getElementById("apply-btn").addEventListener("click", () => {
    const code = document.getElementById("coupon").value.trim().toLowerCase();

    if (code === "discount10") {
      discount = subtotal * 0.1;
      updateSummary();
      alert("تم تطبيق خصم 10٪");
    } else {
      alert("كود الخصم غير صحيح.");
    }
  });

  // عند الضغط على تأكيد الطلب
  document.getElementById("place-btn").addEventListener("click", () => {
    let paymentMethod = "Not selected";
    payMethodInputs.forEach(input => {
      if (input.checked) paymentMethod = input.parentElement.textContent.trim();
    });

    const orderDate = new Date().toLocaleString();

    alert(`
✅ تم تأكيد الطلب بنجاح!
🛒 عدد المنتجات: ${totalItems}
💳 طريقة الدفع: ${paymentMethod}
📦 الإجمالي النهائي: $${(total - discount).toFixed(2)}
🕒 تاريخ الطلب: ${orderDate}
    `);

    localStorage.removeItem("cart");
    window.location.href = "../index.html";
  });
});
