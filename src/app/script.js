$(document).ready(function () {
  // Menampilkan semua data yang ada di json kedalam html
  $.getJSON("/json/cart.json", function (data) {
    let menu = data.menu;

    $.each(menu, function (i, data) {
      $("#menu").append(`<div class="CardBody" data-id="${data.id}">
        <img src="${data.image}" alt="${data.name}" class="aspect-square rounded-sm">
          <div class="">
              <p id="name-product" class="font-semibold">${data.name}</p>
              <p class="text-sky-400 font-semibold text-xl">Rp. <span id="price">${data.price}</span></p>
          </div>
      </div>`);
    });
  });

  // Template cart
  function InsertList(NAME, PRICE, DATA_ID) {
    return `<li class="liCard" data-id="${DATA_ID}">
              <div class="w-full">
                  <div class="text-xs flex justify-between">
                      <span class="font-semibold" id="nameCart">${NAME}</span>
                      <span id="qty" class="text-gray-500 font-semibold">Qty: 1</span>
                  </div>
                  <div class="text-sm">
                      <span class="font-semibold">Total: <span class="priceCart">${PRICE}</span></span>
                  </div>
              </div>
              <i class='bx bx-trash bx-sm transition cursor-pointer bg-black/5 hover:bg-black/10 rounded-full p-1 trashBtn'></i>
            </li>`;
  }

  // variable tax
  let taxSm = 0;
  let taxPersen = 0;

  // variable total cart
  let totalCart = 0;

  // Menambahkan kedalam cart ketika card menu diklik
  $("#menu").on("click", ".CardBody", function () {
    taxSm < 10 ? taxSm++ : taxSm;
    taxPersen < 10 ? taxPersen++ : taxPersen;
    totalCart++;
    const CARD = $(this);
    const NAME = CARD.find("#name-product").text();
    const PRICE = CARD.find("#price").text();
    const DATA_ID = CARD.data("id");
    $("#container-list").append(InsertList(NAME, PRICE, DATA_ID));
    hitung(taxSm, totalCart, taxPersen);
  });

  // Fungsi menghitung total harga dan cart
  function hitung(taxSm, totalCart, taxPersen) {
    let taxFix = taxSm / 100;
    let totalSm = 0;

    $(".priceCart").each(function () {
      let price = parseInt($(this).text());
      totalSm += price;
    });

    let total = totalSm.toString();
    let hitungTax = totalSm * taxFix;
    let totalAmount = totalSm + hitungTax;

    let stTax = Math.round(hitungTax.toString());
    let stTotal = totalAmount.toString();

    $("#total").html(`Rp. ${total}`);
    $("#tax").html(`${taxPersen}%`);
    $("#totalTax").html(`Rp. ${stTax}`);
    $("#totalCart").html(totalCart);
    $("#totalAmount").html(`Rp. ${stTotal}`);
  }

  // Menghapus list yang ada di cart
  $(document).on("click", function (e) {
    if ($(e.target).hasClass("trashBtn")) {
      totalCart--;
      totalCart >= 10 ? taxSm : taxSm--;
      taxPersen >= 10 ? taxPersen : taxPersen--;
      $(e.target).parent().remove();
      hitung(taxSm, totalCart, taxPersen);
    }
  });
});
