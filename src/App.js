import React, { useState, useEffect } from "react";
import Formulario from "./Components/Formulario";
import ListadoImagenes from "./Components/ListadoImagenes";

function App() {
  const [busqueda, guardarbusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return;

      const imagenesPorPaginas = 30;
      const key = "8642621-4b8ebb75a79c72d8cdcfe6a39";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per-page=${imagenesPorPaginas}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //calcular el total de las paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPaginas
      );

      guardarTotalPaginas(calcularTotalPaginas);

      //Mover la pantalla hacia arriba
        const jumbotrom = document.querySelector('.jumbotron')
        jumbotrom.scrollIntoView({behavior:'smooth'})

    };
    consultarAPI();
  }, [busqueda,paginaactual]);

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };
  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscado de imagenes</p>
        <Formulario guardarbusqueda={guardarbusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {(paginaactual === 1) ? null : (
          <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
        >
          &laquo; Anterior{" "}
        </button>
        )}

       {(paginaactual === totalpaginas) ? null : (
          <button
          type="button"
          className="bbtn btn-info"
          onClick={paginaSiguiente}
        >
          Siguiente &raquo;
        </button>
       )}
      </div>
    </div>
  );
}

export default App;
