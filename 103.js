
// ================================
// عناصر صفحه
// ================================

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const cartButton =
    document.getElementById("cartButton");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutOverlay =
    document.getElementById("checkoutOverlay");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutForm =
    document.getElementById("checkoutForm");

const toast =
    document.getElementById("toast");

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

const aboutButton =
    document.getElementById("aboutButton");

const aboutOverlay =
    document.getElementById("aboutOverlay");

const aboutClose =
    document.getElementById("aboutClose");


// ================================
// منوی موبایل
// ================================

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


// ================================
// درباره من
// ================================

aboutButton.addEventListener("click", () => {

    aboutOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


function closeAbout() {

    aboutOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


aboutClose.addEventListener(
    "click",
    closeAbout
);


aboutOverlay.addEventListener(
    "click",
    event => {

        if (event.target === aboutOverlay) {

            closeAbout();

        }

    }
);


// ================================
// افزودن محصول به سبد
// ================================

document
    .querySelectorAll(".add-to-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                const name =
                    button.dataset.name;

                const price =
                    Number(
                        button.dataset.price
                    );


                const product =
                    cart.find(
                        item => item.id === id
                    );


                if (product) {

                    product.quantity++;

                } else {

                    cart.push({

                        id: id,

                        name: name,

                        price: price,

                        quantity: 1

                    });

                }


                saveCart();

                updateCart();

                showToast(
                    "محصول به سبد خرید اضافه شد 🛒"
                );

            }
        );

    });


// ================================
// ذخیره سبد خرید
// ================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ================================
// نمایش سبد خرید
// ================================

function updateCart() {

    cartItems.innerHTML = "";

    let count = 0;

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                سبد خرید شما خالی است.
            </p>

        `;

    } else {

        cart.forEach(
            (item, index) => {

                count += item.quantity;

                total +=
                    item.price *
                    item.quantity;


                const itemElement =
                    document.createElement("div");


                itemElement.className =
                    "cart-item";


                itemElement.innerHTML = `

                    <div>

                        <h4>
                            ${item.name}
                        </h4>

                        <div class="cart-item-price">

                            ${formatPrice(item.price)}
                            تومان

                        </div>


                        <div class="quantity-controls">

                            <button
                                class="increase"
                                data-index="${index}">

                                +

                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                class="decrease"
                                data-index="${index}">

                                −

                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        data-index="${index}"
                        aria-label="حذف محصول">

                        🗑️

                    </button>

                `;


                cartItems.appendChild(
                    itemElement
                );

            }
        );

    }


    cartCount.textContent = count;


    cartTotal.textContent =
        `${formatPrice(total)} تومان`;


    saveCart();

}


// ================================
// کنترل سبد خرید
// ================================

cartItems.addEventListener(
    "click",
    event => {

        const index =
            Number(
                event.target.dataset.index
            );


        if (Number.isNaN(index)) {
            return;
        }


        if (
            event.target.classList.contains(
                "increase"
            )
        ) {

            cart[index].quantity++;

        }


        if (
            event.target.classList.contains(
                "decrease"
            )
        ) {

            cart[index].quantity--;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(
                    index,
                    1
                );

            }

        }


        if (
            event.target.classList.contains(
                "remove-item"
            )
        ) {

            cart.splice(
                index,
                1
            );

        }


        updateCart();

    }
);


// ================================
// باز کردن سبد
// ================================

cartButton.addEventListener(
    "click",
    () => {

        cartOverlay.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }
);


// ================================
// بستن سبد
// ================================

function closeCartPanel() {

    cartOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === cartOverlay
        ) {

            closeCartPanel();

        }

    }
);


// ================================
// باز کردن فرم سفارش
// ================================

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "سبد خرید خالی است."
            );

            return;

        }


        closeCartPanel();


        checkoutOverlay.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }
);


// ================================
// بستن فرم سفارش
// ================================

function closeCheckoutPanel() {

    checkoutOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeCheckout.addEventListener(
    "click",
    closeCheckoutPanel
);


checkoutOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === checkoutOverlay
        ) {

            closeCheckoutPanel();

        }

    }
);


// ================================
// ثبت سفارش
// ================================

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const customerName =
            document
                .getElementById(
                    "customerName"
                )
                .value
                .trim();


        const customerPhone =
            document
                .getElementById(
                    "customerPhone"
                )
                .value
                .trim();


        const customerEmail =
            document
                .getElementById(
                    "customerEmail"
                )
                .value
                .trim();


        if (
            !customerName ||
            !customerPhone
        ) {

            showToast(
                "لطفاً اطلاعات ضروری را وارد کنید."
            );

            return;

        }


        const total =
            cart.reduce(
                (sum, item) => {

                    return (
                        sum +
                        item.price *
                        item.quantity
                    );

                },

                0
            );


        alert(

            "نام مشتری: " +
            customerName +

            "\nشماره تماس: " +
            customerPhone +

            "\nایمیل: " +
            (
                customerEmail ||
                "ثبت نشده"
            ) +

            "\nمبلغ سفارش: " +
            formatPrice(total) +
            " تومان"

        );


        showToast(
            "سفارش شما با موفقیت ثبت شد! 🎉"
        );


        cart.length = 0;


        saveCart();

        updateCart();


        checkoutForm.reset();


        closeCheckoutPanel();

    }
);


// ================================
// فرمت قیمت
// ================================

function formatPrice(number) {

    return new Intl.NumberFormat(
        "fa-IR"
    ).format(number);

}


// ================================
// پیام
// ================================

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },

            3000
        );

}


// ================================
// کلید Escape
// ================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            aboutOverlay.classList.contains(
                "active"
            )
        ) {

            closeAbout();

        }


        if (
            cartOverlay.classList.contains(
                "active"
            )
        ) {

            closeCartPanel();

        }


        if (
            checkoutOverlay.classList.contains(
                "active"
            )
        ) {

            closeCheckoutPanel();

        }

    }
);


// ================================
// شروع برنامه
// ================================

updateCart();
