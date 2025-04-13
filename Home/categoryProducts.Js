// استخراج اسم الفئة من عنوان URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// تعيين اسم الفئة في العنوان
document.getElementById('categoryTitle').innerText = `Products in ${category}`;
document.title = `${category}`;

// جلب المنتجات الخاصة بالفئة
async function GetCategoryProducts() {
    try {
        var request_products = await fetch(`https://dummyjson.com/products/category/${category}`);
        var data_products = await request_products.json();
        displayProducts(data_products.products); // عرض المنتجات
    } catch (error) {
        console.error("ERROR", error);
    }
}

// دالة لعرض المنتجات
function displayProducts(productsToDisplay) {
    var Div_products = document.getElementById("productsContainer");
    Div_products.innerHTML = ''; // مسح المنتجات الحالية
    productsToDisplay.forEach((element) => {
        Div_products.innerHTML += `
             <div class="coloum">
                <div class="card" style="width: 18rem;">
                     <img src="${element.images[0]}" class="card-img-top" alt="${element.brand}">
                    <div class="card-body">
                        <h5 class="card-title">${element.brand}</h5>
                        <p class="card-text">${element.description}</p>
                        <a href="./ProductDetails.html?id=${element.id}" class="btn" target="_blank">Show Details</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// استدعاء دالة جلب المنتجات
GetCategoryProducts();
