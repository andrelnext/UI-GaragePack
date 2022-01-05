

var carros = [
    { nome: "Bmw 320i", status: "Preso", img: "../assets/image%2028.png", preco: 50000 },
    { nome: "Bmw M4", status: "Liberado", img: "asdf", preco: 450000 },
    { nome: "Bmw M4", status: "Liberado", img: "asdf", preco: 450000 },
    { nome: "Bmw M4", status: "Liberado", img: "asdf", preco: 450000 },
]

function setCarros(carros) {
    $.each(carros, function (index, data) {
        $("#menu-cars").append(`
      <div class="menu-option-car align">
        <div class="light-text"> ${data.status} <div class="light green"></div>
        <img src="${data.img}" alt="" class="icon-status">
        <div class="price"><p>${data.preco}</p></div>
        <div class="typecar">${data.nome}</div>
      </div>
    `);
    });
}

function myFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("menu-cars");
    li = ul.getElementById('menu-option-car');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
