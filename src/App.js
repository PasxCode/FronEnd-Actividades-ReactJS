import './App.css';
import './hojas-de-estilo/actividad.css';
import logotipo from './imagenes/Logo_PASXCODE.png';
import ListaDeActividades from './componentes/lista-de-actividades';

function App() {
  return (
    <div className='app-actividades'>
      <div className='contenedor-logo'>
        <img 
          src={logotipo}
          className='logo'
          alt='imagen del logo'f
        />
        
      </div>

      <div className='actividades-lista-principal'>
        <h1>Mis Actividades</h1>
        <ListaDeActividades />
      </div>
    </div>)
}

export default App;
