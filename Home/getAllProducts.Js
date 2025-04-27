var url = "https://dummyjson.com/products";
var products = []; // مصفوفة لتخزين المنتجات
var categories = []; // مصفوفة لتخزين الأقسام
let showingAll=false;
// جلب الفئات
async function GetCategory() {
    try {
        var request_category = await fetch(url + '/categories', { method: "GET" });
        var data_category = await request_category.json();
        categories = data_category;
        displayCategories(categories);
    } catch (error) {
        console.error("ERROR", error);
    }
}

// عرض الفئات
function displayCategories(CategoriesToDisplay) {
    var Div_category = document.getElementById("2");
    var Div_Category_1 = document.getElementById("4"); // ← إلغاء التعليق هنا

    Div_category.innerHTML = ''; // مسح المحتوى الحالي
    Div_Category_1.innerHTML = ''; // مسح المحتوى الحالي للقائمة الثانية

    CategoriesToDisplay.forEach((element) => {
        Div_category.innerHTML += `
            <div class="Card">
             <a href="./Home/categoryProduct.html?category=${element.slug}" class="link" target="_blank">${element.name}</a>
            </div>
        `;
        Div_Category_1.innerHTML += `
            <li class="list-group-item">
              <a href="./Home/categoryProduct.html?category=${element.slug}" class="link" target="_blank">${element.name}</a>
            </li>
        `;
    });
}


GetCategory();
// استدعاء جلب الفئات




async function GetProduct() {
    try {
        const request = await fetch(url, { method: "GET" });
        const data = await request.json();
        products = data.products;

        // تحديد عدد المنتجات حسب حجم الشاشة
        let numberOfProducts;
        const screenWidth = window.innerWidth;

        if (screenWidth < 576) { // شاشات صغيرة جدًا (مثلاً موبايل)
            numberOfProducts = 4;
        } else if (screenWidth < 768) { // شاشات صغيرة (تابلت صغير مثلاً)
            numberOfProducts = 6;
        } else {
            numberOfProducts = 8; // شاشات كبيرة
        }

        displayProducts(products.slice(0, numberOfProducts));
        createViewAllButton();
    } catch (error) {
        console.error("ERROR", error);
    }
}
window.addEventListener("resize", GetProduct);


// دالة لعرض المنتجات
function displayProducts(productsToDisplay) {
    var Row = document.getElementById("1");
    Row.innerHTML = ''; // مسح المحتوى الحالي

    // تجميع المحتوى أولاً
    let content = '';

    // عرض أول 6 منتجات
    productsToDisplay.forEach((element) => {
        content += `
            <div class="coloum">
                <div class="card" style="width: 18rem;">
                    <img src="${element.images[0]}" class="card-img-top img-fluid" alt="${element.brand}">
                    <div class="card-body">
                        <h5 class="card-title">${element.brand}</h5>
                        <p class="card-text">${element.description}</p>
                        <a href="./Home/ProductDetails.html?id=${element.id}" class="btn" target="_blank">Show Details</a>
                    </div>
                </div>
            </div>
            
        `;
    });

    // تحديث innerHTML مرة واحدة
    Row.innerHTML = content;
}


function createViewAllButton() {
    var viewAllContainer = document.getElementById("viewAllContainer");
    viewAllContainer.innerHTML = `
        <button id="viewAllBtn" class="View_All">View_All</button>
    `;
    document.getElementById("viewAllBtn").addEventListener("click", function () {
        if (showingAll) {
            displayProducts(products.slice(0, 6));
            this.textContent = "View All";
            showingAll = false;
        } else {
            displayProducts(products); 
            this.textContent = "View Less";
            showingAll = true;
        }
    });
}

window.onload = function() {
    GetProduct();
    createViewAllButton();
};
// دالة البحث
async function searchProducts() {
    var input = document.getElementById('searchInput').value; // الحصول على قيمة الإدخال
    if (input.length > 0) {
        try {
            var request = await fetch(`https://dummyjson.com/products/search?q=${input}`);
            var data = await request.json();
            displayProducts(data.products); // عرض المنتجات المفلترة
        } catch (error) {
            console.error("ERROR", error);
        }
    } else {
        // إذا كانت قيمة الإدخال فارغة، عرض جميع المنتجات
        displayProducts(products);
    }
}

// استدعاء لتحميل المنتجات عند تحميل الصفحة
GetProduct();


// Get the full name from the query string
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
// Display the thank you message
document.getElementById("login-message").textContent = `${name}`;
