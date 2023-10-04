import TelaCadastro from "./telas/TelasCadastro";
import TelaMenu from "./telas/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela404 from "./telas/tela404";
import TelaEntrega from "./telas/TelaEntrega";
import TelaProduto from "./telas/TelaProduto";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/FormMotoboy" element={<TelaCadastro />} />
          <Route path="/FormEntrega" element={<TelaEntrega />} />
          <Route path="/FormProduto" element={<TelaProduto />} />
          <Route path="/" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
