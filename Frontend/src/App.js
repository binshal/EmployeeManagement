import './App.css';
import Create from './components/Create';
import Crud from './components/Crud';


function App() {
  return (
    <div className="App">
      <h3 className='m-3'>Crud Operations</h3>
      <Crud />
      <Create />
    </div>
  );
}

export default App;
