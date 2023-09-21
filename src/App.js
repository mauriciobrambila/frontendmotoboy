import TelaMenu from "./telas/TelaMenu";
import TelaCadMotoboy from "./telas/TelaCadMotoBoy";
import TelaCadEntrega from "./telas/TelaCadEntrega";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/entrega" element={<TelaCadEntrega/>}/>
          <Route path="/motoboy" element={<TelaCadMotoboy/>}/>
          <Route path="/" element={<TelaMenu/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;


