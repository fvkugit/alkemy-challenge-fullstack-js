import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTransaction from './transactions/CreateTransaction';
import EditTransaction from './transactions/EditTransaction';
import ViewTransactions from './transactions/ViewTransactions';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewTransactions/>}/>
          <Route path="/create" element={<CreateTransaction/>}/>
          <Route path="/edit/:id" element={<EditTransaction/>}/>
        </Routes>
      </BrowserRouter>        
    </div>
  );
}

export default App;
