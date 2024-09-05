
import './App.css';
import Table from './TableData';
import "./App.css"
import { Query } from './Query';


function App() {
  return (
    <div style={{color:'red', overflow: 'auto', width: 'calc(100% - 2px)'}} >
      <Table />
      <h1>Query Data</h1>
      <Query/>
    </div>
  );
}



export default App;
