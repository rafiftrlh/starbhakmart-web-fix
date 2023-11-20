$(document).ready(function () {
  // Menampilkan semua data yang ada di json kedalam html
  $.getJSON("/json/cart.json", function (data) {
    let menu = data.menu;

    $.each(menu, function (i, data) {
      $(
        "#menu"
      ).append(`<div class="CardBody hover:scale-105 transition-all" data-id="${data.id}">
        <img src="${data.image}" alt="${data.name}" class="aspect-square rounded-sm">
          <div class="">
              <p id="name-product" class="font-semibold">${data.name}</p>
              <p class="text-sky-400 font-semibold text-xl">Rp. <span id="price">${data.price}</span></p>
          </div>
      </div>`);
    });
  });

  // Template cart
  function InsertList(id, name, price, qty) {
    return `<li class="liCard" data-idCart="${id}">
              <div class="w-full">
                  <div class="text-xs flex justify-between">
                      <span class="font-semibold" id="nameCart">${name}</span>
                      <span class="text-gray-500 font-semibold">Qty: <span id="qty">${qty}</span></span>
                  </div>
                  <div class="text-sm">
                      <span class="font-semibold">Total: <span class="priceCart">${price}</span></span>
                  </div>
              </div>
              <i class='bx bx-trash bx-sm transition cursor-pointer bg-black/5 hover:bg-black/10 rounded-full p-1 trashBtn'></i>
            </li>`;
  }

  // Variable untuk menyimpan list cart
  let cart = [];

  // Fungsi untuk menampilkan product yang ada didalam cart
  function showCart() {
    $("#container-list").empty();

    $.each(cart, function (i, vCart) {
      $("#container-list").append(
        InsertList(
          vCart.id_product_in_cart,
          vCart.name_product_in_cart,
          vCart.price_product_in_cart,
          vCart.qty_product_in_cart
        )
      );
    });
  }

  // Menambahkan product kedalam cart ketika card menu diklik
  $("#menu").on("click", ".CardBody", function () {
    const CARD = $(this);
    const NAME = CARD.find("#name-product").text();
    const PRICE = CARD.find("#price").text();
    const DATA_ID = CARD.data("id");
    let qty = 1;

    console.log(cart);

    // Mengecek apakah ID sudah ada dalam array cart
    const IS_ID_EXISTS = cart.some(
      (item) => item.id_product_in_cart === DATA_ID
    );

    if (!IS_ID_EXISTS) {
      // Jika ID belum ada, tambahkan ke dalam array
      let dataCardProduct = {
        id_product_in_cart: `${DATA_ID}`,
        name_product_in_cart: `${NAME}`,
        price_product_in_cart: parseInt(PRICE), // Ubah price ke integer
        qty_product_in_cart: qty,
      };

      cart.push(dataCardProduct);

      // console.log(cart);

      showCart();
    } else {
      // Jika ID sudah ada, lakukan penambahan ke objek dengan id tersebut
      const FIND_ID = cart.find((item) => item.id_product_in_cart === DATA_ID);

      // Update total price
      FIND_ID.price_product_in_cart += parseInt(PRICE);

      // Update qty
      FIND_ID.qty_product_in_cart++;

      showCart();
    }
  });
});
