function cantidadDeResultados(data) {
  //Cantidad de productos de la seleccion elegida
  const contEl = document.querySelector(".contador");
  contEl.textContent = data.total;
}

function removerResultados() {
  //remover resultados de la busqueda anterior
  const contenedorEl = document.querySelector(".results");
  while (contenedorEl.lastElementChild) {
    contenedorEl.removeChild(contenedorEl.lastElementChild);
  }
}

function mostrarResultados(results) {
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");

  for (const r of results) {
    //Titulo del elemento
    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title.substring(0, 45) + "...";
    //condicion del elemento
    const conditionEl = template.content.querySelector(
      ".result-item-condition"
    );
    conditionEl.textContent = r.condition;
    //precio del elemento
    const priceEl = template.content.querySelector(".result-price");
    priceEl.textContent = "$" + r.price;
    //vendidos del elemento
    const ventasAnterioresEl = template.content.querySelector(
      ".result-item-sell-count-num"
    );
    ventasAnterioresEl.textContent = r.sold_quantity;
    //vendidos del elemento
    const imgEl = template.content.querySelector("#result-imagen");
    imgEl.src = r.thumbnail;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const palabraABuscar = e.target.buscar.value;
    fetch(
      "https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar
    ).then((resp) => {
      resp.json().then((data) => {
        removerResultados();
        cantidadDeResultados(data.paging);
        mostrarResultados(data.results);
        e.target.buscar.value = "";
      });
    });
  });
}

main();
