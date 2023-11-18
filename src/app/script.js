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
                    <span class="font-semibold">Total: <span class="hargaCart">${harga}</span></span>
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

let hargaCart = document.querySelectorAll(".hargaCart");

console.log(hargaCart);

// $.ajax({
//   url: "/json/cart.json",
//   success: (result) => {
//     const movies = result.Search;
//     console.log(movies);
//     let card = "";
//     movies.forEach((m) => {
//       card += showCard(m);
//     });
//     $(".movie-container").html(card);

//     // ketika tombol detail di klik
//     $(".modal-detail-btn").on("click", function () {
//       $.ajax({
//         url:
//           "http://www.omdbapi.com/?apikey=c73160ef&i=" + $(this).data("imdbid"),
//         success: (m) => {
//           const movieDetail = showMovieDetail(m);
//           $(".modal-body").html(movieDetail);
//         },
//         error: (e) => console.log(e.responseText),
//       });
//     });
//   },
//   error: (e) => console.log(e.responseText),
// });

$.ajax({
  url: "/json/cart.json",
  success: (result) => {
    console.log(result);
  },
  error: (e) => console.log(e),
});
