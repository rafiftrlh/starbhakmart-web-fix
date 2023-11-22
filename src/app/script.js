$(document).ready(function () {
  // Menampilkan semua data yang ada di json kedalam html
  $.getJSON("/json/product.json", function (data) {
    let menu = data.menu;

    $.each(menu, function (i, data) {
      $("#menu").append(
        TemplateCard(data.id, data.image, data.name, data.price)
      );
    });
  });

  // Template card menu
  function TemplateCard(id, img, name, price) {
    return `<div class="CardBody group hover:scale-[1.02] transition-all" data-id="${id}">
      <div class="relative bg-clip-border group-hover:-mt-6 transition-all mb-3 group-hover:shadow-lg rounded-lg overflow-hidden">
        <img src="${img}" alt="${name}" class="aspect-square">
      </div>
      <div class="">
          <p id="name-product" class="text-sm">${name}</p>
      </div>
      <div class="flex mt-2 items-center justify-between">
        <p class="font-black text-base">Rp. <span id="price">${price}</span></p>
        <button class="transition hover:bg-primary text-primary hover:shadow-md hover:text-white rounded-md px-3 py-1 flex ring-1 ring-primary">
          <i class='bx bx-cart-add '></i>
        </button>
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

  // Variable tax
  let tax = 0;

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

    // Tambah jumlah tax
    tax < 10 ? tax++ : tax;
    $("#tax").html(`${tax}%`);

    // Update jumlah semua qty
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
    }
    hitung();
  });

  // Mengurangi qty hingga menghapus product yang ada di dalam cart
  $("#container-list").on("click", ".trashBtn", function () {
    const EL = this.parentElement;
    const ID_IN_CART = EL.getAttribute("data-id-cart");

    // Kurangi tax
    jumlahQty >= 11 ? tax : tax--;
    $("#tax").html(`${tax}%`);

    // Update jumlah semua qty
    jumlahQty--;
    $("#totalCart").html(jumlahQty);

    // Mencari ID dalam array cart
    const FIND_ID = cart.find((item) => item.id_product_in_cart === ID_IN_CART);

    // Mencari index dalam array cart berdasarkan ID
    const INDEX_TO_REMOVE = cart.findIndex(
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
      cart.splice(INDEX_TO_REMOVE, 1);
    }

    showCart();
    hitung();
  });

  // Fungsi hitung
  function hitung() {
    // Hitung total jumlah harga yang ada didalam cart
    let priceAll;
    if (cart.length < 1) {
      priceAll = 0;
    } else {
      priceAll = cart
        .map((item) => item.price_product_in_cart)
        .reduce((total, harga) => total + harga);
    }

    $("#total").html(`Rp. ${priceAll}`);

    // Ubah tax menjadi persen
    let taxPersen = tax / 100;

    // Tentukan pajak
    let taxRp = Math.round(priceAll * taxPersen);
    $("#totalTax").html(`Rp. ${taxRp}`);

    // Total amount
    let totalAmount = priceAll + taxRp;
    $("#totalAmount").html(`Rp. ${totalAmount}`);
  }
});
