$(document).ready(function () {
  // Menampilkan semua data yang ada di json kedalam html
  $.getJSON("/json/cart.json", function (data) {
    let menu = data.menu;

    $.each(menu, function (i, data) {
      $("#menu").append(
        TemplateCard(data.id, data.image, data.name, data.price)
      );
    });
  });

  // Template card menu
  function TemplateCard(id, img, name, price) {
    return `<div class="CardBody hover:scale-105 transition-all" data-id="${id}">
    <img src="${img}" alt="${name}" class="aspect-square rounded-sm">
      <div class="">
          <p id="name-product" class="font-semibold">${name}</p>
          <p class="text-sky-400 font-semibold text-xl">Rp. <span id="price">${price}</span></p>
      </div>
  </div>`;
  }

  // Template cart
  function InsertList(id, name, price, qty) {
    return `<li class="liCard" data-id-cart="${id}">
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

  // Variable untuk menyimpan total qty pada cart
  let jumlahQty = 0;

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
    jumlahQty++;
    $("#totalCart").html(jumlahQty);

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
        price_product_in_cart_perpcs: parseInt(PRICE), // Ubah price ke integer
        qty_product_in_cart: qty,
      };
      cart.push(dataCardProduct);

      showCart();
    } else {
      // Jika ID sudah ada, lakukan penambahan ke objek dengan id tersebut
      // Mencari id dalam array
      const FIND_ID = cart.find((item) => item.id_product_in_cart === DATA_ID);

      // Update total price
      FIND_ID.price_product_in_cart += parseInt(PRICE);
      // Update qty
      FIND_ID.qty_product_in_cart++;

      showCart();
      hitung();
    }
  });

  // Mengurangi qty hingga menghapus product yang ada di dalam cart
  $("#container-list").on("click", ".trashBtn", function () {
    const EL = this.parentElement;
    const ID_IN_CART = EL.getAttribute("data-id-cart");
    jumlahQty--;
    $("#totalCart").html(jumlahQty);

    hitung();

    // console.log(ID_IN_CART);

    // Mencari ID dalam array cart
    const FIND_ID = cart.find((item) => item.id_product_in_cart === ID_IN_CART);

    // Mencari index dalam array cart berdasarkan ID
    const indexToRemove = cart.findIndex(
      (item) => item.id_product_in_cart === ID_IN_CART
    );

    // Mencari qty dalam array
    let qty_in_array = FIND_ID.qty_product_in_cart;

    // Mengecek jumlah qty pada array
    if (qty_in_array > 1) {
      // Update qty dan price
      FIND_ID.qty_product_in_cart--;
      FIND_ID.price_product_in_cart -= FIND_ID.price_product_in_cart_perpcs;
    } else {
      // Jika qty = 1 maka hapus data pada array
      cart.splice(indexToRemove, 1);
    }

    showCart();
  });

  // Fungsi hitung
  function hitung() {}
});
