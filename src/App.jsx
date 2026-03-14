import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Home from './pages/Home';

// Componente de Layout para manter o Header fixo
const Layout = () => (
  <>
    <Header />
    <Container className="mt-4">
      <Row>
        <Col>
          {/* O Outlet renderiza o conteúdo da rota atual */}
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
          {/* Outras rotas entrariam aqui */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;