import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Home/>
        </div>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
