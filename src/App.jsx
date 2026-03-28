import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Home from './pages/Home';
import ClientesList from './pages/ClientesList';
import ProdutosList from './pages/ProdutosList';
import VendasList from './pages/VendasList';
import NovaVenda from './pages/NovaVenda';
import Login from './pages/Login';

const Layout = ({ theme, toggleTheme }) => (
  <>
    <Header theme={theme} toggleTheme={toggleTheme} />
    <Container className="mt-4 pb-5">
      <Row>
        <Col>
          <Outlet context={{ theme }} />
        </Col>
      </Row>
    </Container>
  </>
);

// Bloqueador de rotas atualizado com verificação de perfil (Role)
const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('auth-token') === 'true';
  const userRole = localStorage.getItem('auth-role');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota exige perfis específicos e o utilizador não tem esse perfil, manda para a Home
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Todas as rotas abaixo requerem que o utilizador esteja logado */}
        <Route path="/" element={<PrivateRoute><Layout theme={theme} toggleTheme={toggleTheme} /></PrivateRoute>}>
          
          {/* A Home é liberada para qualquer perfil logado (Funcionário ou Cliente) */}
          <Route index element={<Home />} />

          {/* Telas de Gestão restritas apenas aos Funcionários */}
          <Route path="clientes" element={
            <PrivateRoute allowedRoles={['funcionario']}><ClientesList /></PrivateRoute>
          } />
          <Route path="produtos" element={
            <PrivateRoute allowedRoles={['funcionario']}><ProdutosList /></PrivateRoute>
          } />
          <Route path="vendas" element={
            <PrivateRoute allowedRoles={['funcionario']}><VendasList /></PrivateRoute>
          } />
          <Route path="vendas/nova" element={
            <PrivateRoute allowedRoles={['funcionario']}><NovaVenda /></PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;