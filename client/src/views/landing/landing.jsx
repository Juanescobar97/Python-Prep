// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Puedes agregar estilos inline o usar una hoja de estilo */}
      <div style={{ backgroundImage: 'url("ruta_de_tu_imagen.jpg")', backgroundSize: 'cover', height: '100vh' }}>
        <h1>Bienvenido a la Aplicación Pokémon</h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};
