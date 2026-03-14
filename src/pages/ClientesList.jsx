import { useState } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

const ClientesList = () => {
  // Estado para armazenar a lista de clientes (com dados iniciais de exemplo)
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'João Silva', email: 'joao@email.com', contato: '11999999999' },
    { id: 2, nome: 'Maria Souza', email: 'maria@email.com', contato: '11888888888' },
  ]);

  // Estados para controlar o Modal de Formulário (Criar/Editar)
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({ id: null, nome: '', email: '', contato: '' });

  // Estados para controlar o Modal de Confirmação de Exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  // --- Handlers do Modal de Formulário ---
  const handleCloseForm = () => setShowFormModal(false);
  
  const handleShowNew = () => {
    setIsEditing(false);
    setCurrentCliente({ id: null, nome: '', email: '', contato: '' });
    setShowFormModal(true);
  };
  
  const handleShowEdit = (cliente) => {
    setIsEditing(true);
    setCurrentCliente(cliente);
    setShowFormModal(true);
  };

  // --- Handlers do Modal de Exclusão ---
  const handleCloseDelete = () => setShowDeleteModal(false);
  
  const handleShowDelete = (cliente) => {
    setClienteToDelete(cliente);
    setShowDeleteModal(true);
  };

  // --- Funções de Ação (Salvar, Eliminar e Atualizar Inputs) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCliente({ ...currentCliente, [name]: value });
  };

  const handleSave = () => {
    if (isEditing) {
      // Atualiza o cliente existente
      setClientes(clientes.map(c => c.id === currentCliente.id ? currentCliente : c));
    } else {
      // Cria um novo cliente com um ID simulado
      const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
      setClientes([...clientes, { ...currentCliente, id: newId }]);
    }
    handleCloseForm();
  };

  const handleDelete = () => {
    // Filtra a lista removendo o cliente selecionado
    setClientes(clientes.filter(c => c.id !== clienteToDelete.id));
    handleCloseDelete();
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>Gestão de Clientes</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={handleShowNew}>+ Novo Cliente</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.contato}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowEdit(cliente)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleShowDelete(cliente)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">Nenhum cliente cadastrado.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Formulário (Criar / Editar) */}
      <Modal show={showFormModal} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite o nome do cliente" 
                name="nome" 
                value={currentCliente.nome} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite o e-mail" 
                name="email" 
                value={currentCliente.email} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContato">
              <Form.Label>Contato</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite o telefone de contato" 
                name="contato" 
                value={currentCliente.contato} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja eliminar o cliente <strong>{clienteToDelete?.nome}</strong>? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClientesList;