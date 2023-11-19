function ShowMenu() {
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
}
ShowMenu();

$(document).ready(function () {
  const CardBody = document.querySelectorAll(".CardBody");
  const containerList = document.getElementById("container-list");
  CardBody.forEach(function (card) {
    card.addEventListener("click", () => {
      console.log(containerList.childNodes);
      // if () {

      // }
      console.log(card);
      const name = card.querySelector("#name-product").textContent;
      const price = card.querySelector("#price").textContent;
      const dataId = card.getAttribute("data-id");
      containerList.innerHTML += InsertList(name, price, dataId);
      hitung();
    });
  });
});

function InsertList(name, price, dataId) {
  return `<li class="liCard" data-id="${dataId}">
            <div class="w-full">
                <div class="text-xs flex justify-between">
                    <span class="font-semibold" id="nameCart">${name}</span>
                    <span id="qty" class="text-gray-500 font-semibold">Qty: 1</span>
                </div>
                <div class="text-sm">
                    <span class="font-semibold">Total: <span class="priceCart">${price}</span></span>
                </div>
            </div>
            <i class='bx bx-trash bx-sm transition cursor-pointer bg-black/5 hover:bg-black/10 rounded-full p-1 trashBtn'></i>
          </li>`;
}

function hitung() {
  let totalCart = 0;

  let priceCartAll = document.querySelectorAll(".priceCart");
  priceCartAll.forEach((p) => {
    let price = parseInt(p.textContent);
    totalCart += price;
  });

  let stTotal = totalCart.toString();

  $("#total").html(stTotal);
  console.log(stTotal);
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("trashBtn")) {
    console.log(e.target.parentElement);
    e.target.parentElement.remove();
    hitung();
  }
});