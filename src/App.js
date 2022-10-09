import logo from "./logo.svg";
import "./App.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
