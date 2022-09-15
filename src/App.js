import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import ListaPokemons from './components/ListaPokemons';

// importo el contexto para utilizarlo en todo el proyecto
import { MostrarProvider } from './context/MostrarContext';


function App() {

  return (
    <>
    {/* coloco el contexto que utilizare en la app */}
    <MostrarProvider>
        <ListaPokemons />
    </MostrarProvider>
    </>
  );
}

export default App;
