import MainPage from "./pages/MainPage";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import OpenPage from "./pages/OpenPage";



const App = () => {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/" element={<OpenPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
