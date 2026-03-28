import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const navBackgroundColor = theme === 'dark' ? '#121212' : '#212529';
  
  const username = localStorage.getItem('auth-user') || 'Usuário';
  const userRole = localStorage.getItem('auth-role'); // Resgata o perfil do utilizador

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-role');
    navigate('/login');
  };

  return (
    <Navbar variant="dark" expand="lg" className="shadow-sm" style={{ backgroundColor: navBackgroundColor }}>
      <Container>
        <Navbar.Brand as={Link} to="/">Rock 'n' Code</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Renderiza menus administrativos SOMENTE se for funcionário */}
            {userRole === 'funcionario' && (
              <>
                <Nav.Link as={Link} to="/clientes">Gestão de Clientes</Nav.Link>
                <Nav.Link as={Link} to="/produtos">Gestão de Produtos</Nav.Link>
                <Nav.Link as={Link} to="/vendas">Histórico de Vendas</Nav.Link>
              </>
            )}

            {/* Renderiza menus de cliente SOMENTE se for cliente */}
            {userRole === 'cliente' && (
              <>
                <Nav.Link as={Link} to="#">A Minha Conta</Nav.Link>
                <Nav.Link as={Link} to="#">Meus Pedidos</Nav.Link>
              </>
            )}
          </Nav>
          
          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
            <span className="text-light d-none d-lg-block fw-bold">
              Olá, {username} {userRole === 'funcionario' ? '(Admin)' : ''}
            </span>
            
            <Form className="d-flex align-items-center">
              <Form.Check 
                type="switch" id="theme-switch" label={theme === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
                checked={theme === 'dark'} onChange={toggleTheme} className="text-light m-0" 
              />
            </Form>

            <Button variant="outline-danger" size="sm" onClick={handleLogout}>Sair</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;