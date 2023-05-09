import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OpenPage from "./pages/OpenPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpenPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;