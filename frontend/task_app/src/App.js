import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Landing from './Components/Landing/Landing';
import Task from './Components/SingleTask/Task';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/task/:id" element={<Task/>}/>
      </Routes>
    </div>
  );
}

export default App;
