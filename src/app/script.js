const CardBody = document.querySelectorAll(".CardBody");
CardBody.forEach(function (card) {
  card.addEventListener("click", () => {
    const name = card.querySelector("#name-product").textContent;
    const harga = card.querySelector("#harga").textContent;
    const containerList = document.getElementById("container-list");
    containerList.innerHTML += InsertList(name, harga);
  });
});

function InsertList(name, harga) {
  return `<li class="liCard">
            <div class="w-full">
                <div class="text-xs flex justify-between">
                    <span class="font-semibold" id="nameCart">${name}</span>
                    <span id="qty" class="text-gray-500 font-semibold">Qty: 1</span>
                </div>
                <div class="text-sm">
                    <span class="font-semibold" id="hargaCart">Total: ${harga}</span>
                </div>
            </div>
            <i class='bx bx-trash bx-sm transition cursor-pointer bg-black/5 hover:bg-black/10 rounded-full p-1 trashBtn'></i>
          </li>`;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("trashBtn")) {
    e.target.parentElement.remove();
  }
});