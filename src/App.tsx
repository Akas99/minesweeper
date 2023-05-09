import MainPage from "./pages/MainPage";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import OpenPage from "./pages/OpenPage";


const App = () => {
 
  return (
    <BrowserRouter basename="/minesweeper">
    <Routes>
      <Route path="/" element={<OpenPage />} />
      <Route path="/minesweeper/main" element={<MainPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
