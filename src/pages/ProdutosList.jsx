import { useState } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

const ProdutosList = () => {
  // Dados simulados iniciais
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Guitarra Fender Stratocaster', categoria: 'Cordas', preco: 4500.00, quantidade: 5 },
    { id: 2, nome: 'Teclado Roland XPS-10', categoria: 'Teclas', preco: 3200.00, quantidade: 3 },
  ]);

  // Controles do Modal de Formulário
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({ id: null, nome: '', categoria: '', preco: '', quantidade: '' });

  // Controles do Modal de Exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);

  // Handlers para abrir/fechar modais
  const handleCloseForm = () => setShowFormModal(false);
  
  const handleShowNew = () => {
    setIsEditing(false);
    setCurrentProduto({ id: null, nome: '', categoria: '', preco: '', quantidade: '' });
    setShowFormModal(true);
  };
  
  const handleShowEdit = (produto) => {
    setIsEditing(true);
    setCurrentProduto(produto);
    setShowFormModal(true);
  };

  const handleCloseDelete = () => setShowDeleteModal(false);
  
  const handleShowDelete = (produto) => {
    setProdutoToDelete(produto);
    setShowDeleteModal(true);
  };

  // Funções de atualização e salvamento
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto({ ...currentProduto, [name]: value });
  };

  const handleSave = () => {
    if (isEditing) {
      setProdutos(produtos.map(p => p.id === currentProduto.id ? currentProduto : p));
    } else {
      const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
      setProdutos([...produtos, { ...currentProduto, id: newId }]);
    }
    handleCloseForm();
  };

  const handleDelete = () => {
    setProdutos(produtos.filter(p => p.id !== produtoToDelete.id));
    handleCloseDelete();
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>Catálogo de Produtos</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={handleShowNew}>+ Novo Produto</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço (R$)</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{Number(produto.preco).toFixed(2)}</td>
              <td>{produto.quantidade}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowEdit(produto)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleShowDelete(produto)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {produtos.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">Nenhum produto cadastrado.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Criação / Edição */}
      <Modal show={showFormModal} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Produto' : 'Novo Produto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex: Violão Acústico" 
                name="nome" 
                value={currentProduto.nome} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Select name="categoria" value={currentProduto.categoria} onChange={handleChange}>
                <option value="">Selecione uma categoria...</option>
                <option value="Cordas">Cordas</option>
                <option value="Teclas">Teclas</option>
                <option value="Percussão">Percussão</option>
                <option value="Sopro">Sopro</option>
                <option value="Acessórios">Acessórios</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPreco">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control 
                    type="number" 
                    step="0.01"
                    placeholder="0.00" 
                    name="preco" 
                    value={currentProduto.preco} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formQuantidade">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="0" 
                    name="quantidade" 
                    value={currentProduto.quantidade} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja eliminar o produto <strong>{produtoToDelete?.nome}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProdutosList;