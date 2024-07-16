import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home";
import MenuPrivado from "./componentes/MenuPrivado";
import MenuPublico from "./componentes/MenuPublico";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Categoria from "./componentes/telas/categoria/Categoria";
import Produto from "./componentes/telas/produto/Produto";
import Login from "./componentes/telas/login/Login";
import Venda from "./componentes/telas/venda/Venda";
import { VendaProvider } from "./componentes/telas/venda/VendaContext"; // Certifique-se de usar a importação correta

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuPublico />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/privado" element={<MenuPrivado />}>
                    <Route index element={<Home />} />
                    <Route path="categorias" element={<Categoria />} />
                    <Route path="produtos" element={<Produto />} />
                    <Route path="vendas" element={
                        <VendaProvider>
                            <Venda />
                        </VendaProvider>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
