import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Home from './pages/Home';
import ClientesList from './pages/ClientesList';

// Componente de Layout para manter o Header fixo
const Layout = () => (
  <>
    <Header />
    <Container className="mt-4">
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Adicione a rota para a lista de clientes aqui */}
          <Route path="clientes" element={<ClientesList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;