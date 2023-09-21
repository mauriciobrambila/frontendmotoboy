import TelaMenu from "./telas/TelaMenu";
import TelaCadMotoboy from "./telas/TelaCadMotoBoy";
import TelaCadEntrega from "./telas/TelaCadEntrega";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/cadastroentrega" element={<TelaCadEntrega/>}></Route>
          <Route path="/cadastromotoboy" element={<TelaCadMotoboy/>}></Route>
          <Route path="/" element={<TelaMenu/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;


