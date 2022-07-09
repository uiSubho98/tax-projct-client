import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import InputDetails from './components/InputDetails/InputDetails';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/details' element={<InputDetails></InputDetails>}></Route>
      </Routes>
  
    </div>
  );
}

export default App;
