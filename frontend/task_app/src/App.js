import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Landing from './Components/Landing/Landing';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
