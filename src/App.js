import logo from './logo.svg';
import './App.css';
import Alta_usuarios from './components/usuarios/Alta_usuarios';
import Login from './components/login/Login';
import ListadoUsaurios from './components/usuarios/Listado_usuarios';

function App() {
  return (
    <div className="App">
      {/* <Alta_usuarios/> */}
      <ListadoUsaurios/>
    </div>
  );
}

export default App;
