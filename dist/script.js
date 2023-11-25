$(document).ready(function () {
  // Menampilkan semua data yang ada di json kedalam html
  function semuaMenu() {
    $.getJSON("json/product.json", function (data) {
      let menu = data.menu;

      $.each(menu, function (i, data) {
        $("#menu").append(TemplateCard(data));
      });
    });
  }

  semuaMenu();

  $(".Kategori").click(function () {
    // Mengubah active
    $(".Kategori").removeClass("text-accent");
    $(this).addClass("text-accent");

    let kategori = $(this).text();

    // if (data.category == "All Menu") {
    //   semuaMenu();
    //   return;
    // }

    // Menampilkan sesuai kategori
    $.getJSON("json/product.json", function (data) {
      let menu = data.menu;
      let content = "";

      $.each(menu, function (i, data) {
        if (data.category == kategori.toLowerCase()) {
          content += TemplateCard(data);
          $("#menu").html(content);
        } else if (data.all == kategori.toLowerCase()) {
          content += TemplateCard(data);
          $("#menu").html(content);
        }
      });
    });
  });

  // Template card menu
  function TemplateCard(data) {
    return `<div class="CardBody group hover:scale-[1.02] transition-all" data-id="${data.id}">
              <div class="relative bg-clip-border group-hover:-mt-6 transition-all mb-3 group-hover:shadow-lg rounded-lg overflow-hidden">
                <img src="${data.image}" alt="${data.name}" class="aspect-square">
              </div>
              <div class="">
                  <p id="name-product" class="text-sm">${data.name}</p>
                  <p class="font-black text-base">Rp. <span id="price">${data.price}</span></p>
              </div>
              <div class="flex mt-2 items-center justify-between">
                <button class="transition hover:bg-accent text-accent hover:shadow-md hover:text-white rounded-md px-3 py-1 flex ring-1 ring-accent btnDetail text-xs">
                  Read More
                </button>
                <button class="transition hover:bg-primary text-primary hover:shadow-md hover:text-white rounded-md px-3 py-1 flex ring-1 ring-primary btnAddCart">
                  <i class='bx bx-cart-add'></i>
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
  // Template modals
  function Modals(id) {
    return `<div class="ContainerModals" id="ContainerModals">
              <div
                  class="absolute flex gap-3 shadow-lg top-1/2 left-1/2 -translate-x-1/2 w-[60%] h-[60%] -translate-y-1/2 bg-gray-100 rounded-xl p-5 aspect-video" data-id=${id}>
                  <img src="${id.image}" alt="" class="aspect-square rounded-lg shadow-lg">
                  <div class="text-left flex flex-col divide-y-2 justify-between">
                      <div class="relative">
                          <div class="btnCloseModals">
                          <i class='bx bx-sm bx-x'></i>
                          </div>
                          <p class="font-black text-2xl pb-3" id="#name-product">${id.name}</p>
                          <p class="transition-all pl-3 border-l-2 hover:border-l-8 border-l-gray-400">Rp <span id="price">${id.price}</span
                          </p>
                          <p class=" py-3 tracking-tight">${id.descripsi}
                          </p>
                      </div>
                      <div class="flex py-3 gap-5 items-center">
                          <button class="btnModals hover:bg-accent text-accent ring-accent btnBuyNow">
                              Buy Now
                          </button>
                          <button class="btnModals hover:bg-primary text-primary ring-primary btnAddCartModals">
                              <i class='bx bx-sm bx-cart-add'></i>
                          </button>
                      </div>
                  </div>
              </div>
            </div>`;
  }

  // Tempplate eksport product yang ada di cart
  function exportBill() {
    return (
      `  Starbhak Mart
  SMK Taruna Bhakti Depok
  Telp. 0808-0808-0808
  ----------------------------------------------------------
  Nama   --   qty   --   Harga   --   Total
  ----------------------------------------------------------
  ` +
      cart
        .map(
          (item) =>
            `${item.name_product_in_cart}   --   ${item.qty_product_in_cart}   --   ${item.price_product_in_cart_perpcs}   --   ${item.price_product_in_cart}`
        )
        .join(`\n  `) +
      `
  ----------------------------------------------------------------------------
  Total ${jumlahQty} item(s).  :  Rp. ${priceAll}
  Pajak(${tax})                :   Rp. ${taxRp}
  _________________________________________________________________________ +
  Total Semua      :   Rp. ${totalAmount}
  ----------------------------------------------------------
  Terimakasih Atas Pesanan Anda`
    );
  }

  // Template BuyNow
  function BuyNow(id, tax, total) {
    return `Starbhak Mart
  SMK Taruna Bhakti Depok
  Telp. 0808-0808-0808
  ----------------------------------------------------------------------------
  Nama   --   qty   --   Harga   --   Total
  ----------------------------------------------------------------------------
  ${id.name}  --  1  --  ${id.price}  --  ${id.price}
  ----------------------------------------------------------------------------
  Total 1 item(s).  :  Rp. ${id.price}
  Pajak(1%)                :   Rp. ${tax}
  _________________________________________________________________________ +
  Total Semua      :   Rp. ${total}
  ----------------------------------------------------------------------------
  Terimakasih Atas Pesanan Anda`;
  }

  // Variable untuk menyimpan list cart
  let cart = [];

  // Variable untuk menyimpan total qty pada cart
  let jumlahQty = 0;

  // Variable tax
  let tax = 0;
  var taxRp = 0;
  var taxPersen = 0;

  // Variable Total
  var priceAll = 0;
  var totalAmount = 0;

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

  // Menampilkan modals product
  $("#menu").on("click", ".btnDetail", function () {
    const CARD = $(this.parentElement.parentElement);
    const DATA_ID = CARD.data("id");
    console.log(DATA_ID);

    $.getJSON("json/product.json", function (data) {
      let menu = data.menu;

      // Mencari data json dengan id
      const FIND_ID = menu.find((item) => item.id === DATA_ID);
      console.log(FIND_ID);

      // Menampilkan modals dengan animasi
      const modals = $(Modals(FIND_ID)).hide();
      $("#menu").append(modals);
      modals.fadeIn("fast");

      $(".btnCloseModals").click(function (e) {
        // Menghilangkan modals dengan animasi sebelum dihapus dari DOM
        modals.fadeOut("fast", function () {
          $(this).remove();
        });
      });

      // Menambahkan product kedalam cart ketika btnAdd di modals diklik
      $(".btnAddCartModals").on("click", function () {
        const NAME = CARD.find("#name-product").text();
        const PRICE = CARD.find("#price").text();
        const DATA_ID = CARD.data("id");
        let qty = 1;

        // Tambah jumlah tax
        tax < 10 ? tax++ : tax;

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
        } else {
          // Jika ID sudah ada, lakukan penambahan ke objek dengan id tersebut
          // Mencari id dalam array
          const FIND_ID = cart.find(
            (item) => item.id_product_in_cart === DATA_ID
          );

          // Update total price
          FIND_ID.price_product_in_cart += parseInt(PRICE);
          // Update qty
          FIND_ID.qty_product_in_cart++;
        }
        showCart();
        hitung();
      });

      $(".btnBuyNow").click(function () {
        // Ubah tax menjadi persen
        let taxPersenNow = 1 / 100;

        // Tentukan pajak
        let taxRpNow = Math.round(FIND_ID.price * taxPersenNow);

        // Total
        let totalNow = FIND_ID.price + taxRpNow;

        alert(BuyNow(FIND_ID, taxRpNow, totalNow));
      });
    });
  });

  // Menambahkan product kedalam cart ketika btnAddCart diklik
  $("#menu").on("click", ".btnAddCart", function () {
    const CARD = $(this.parentElement.parentElement);
    console.log(CARD);
    const NAME = CARD.find("#name-product").text();
    const PRICE = CARD.find("#price").text();
    const DATA_ID = CARD.data("id");
    let qty = 1;

    console.log(totalAmount);

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

    // Update jumlah semua qty
    jumlahQty--;

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
    if (cart.length < 1) {
      priceAll = 0;
    } else {
      priceAll = cart
        .map((item) => item.price_product_in_cart)
        .reduce((total, harga) => total + harga);
    }

    // Update total
    $("#totalCart").html(jumlahQty);
    $("#total").html(`Rp. ${priceAll}`);

    // Ubah tax menjadi persen
    taxPersen = tax / 100;
    $("#tax").html(`${tax}%`);

    // Tentukan pajak
    taxRp = Math.round(priceAll * taxPersen);
    $("#totalTax").html(`Rp. ${taxRp}`);

    // Total amount
    totalAmount = priceAll + taxRp;
    $("#totalAmount").html(`Rp. ${totalAmount}`);
  }

  $(".btnBuyCart").click(function () {
    alert(exportBill());
    cart.length = 0;
    jumlahQty = 0;
    tax = 0;
    showCart();
    hitung();
  });
});
