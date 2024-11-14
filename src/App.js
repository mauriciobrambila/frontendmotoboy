import Tela404 from "./telas/Tela404";
import TelaMenu from "./telas/TelaMenu";
import TelaCadHospedes from "./telas/TelaCadHospedes";
import TelaCadEntrada from "./telas/TelaCadEntrada";
import TelaCadastroTelefones from "./telas/TelaCadTelefones";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroHospedes" element={<TelaCadHospedes/>}/>
          <Route path="/cadastroEntrada" element={<TelaCadEntrada/>}/>
          <Route path="/cadastroTelefones" element={<TelaCadastroTelefones/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
