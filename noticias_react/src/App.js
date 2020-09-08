import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoNoticias from "./components/ListadoNoticias";
import { API_KEY } from "./config";

function App() {
  // definir la categoria y noticias
  const [categoria, guardarCategoria] = useState("");
  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      if (categoria !== "") {
        const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${API_KEY}`;

        const respuesta = await fetch(url);
        const noticias = await respuesta.json();
        guardarNoticias(noticias.articles);
      } else {
        return null;
      }
    };
    consultarAPI();
  }, [categoria]);

  return (
    <Fragment>
      <Header titulo="Buscador de Noticias" />

      <div className="container white">
        <Formulario guardarCategoria={guardarCategoria} />

        <ListadoNoticias noticias={noticias} />
      </div>
    </Fragment>
  );
}

export default App;
