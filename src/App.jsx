import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Snackbar, Alert
} from '@mui/material';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import './App.css';

const API_URL = 'http://localhost:3000/estoque';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [alerta, setAlerta] = useState({ open: false, message: '', severity: 'success' });

  const buscarProdutos = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setProdutos(data);
    } catch {
      setAlerta({ open: true, message: 'Erro ao buscar produtos', severity: 'error' });
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleSalvar = async (produto) => {
    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando.id}`, produto);
        setAlerta({ open: true, message: 'Produto atualizado com sucesso!', severity: 'success' });
      } else {
        await axios.post(API_URL, produto);
        setAlerta({ open: true, message: 'Produto cadastrado com sucesso!', severity: 'success' });
      }
      setEditando(null);
      buscarProdutos();
    } catch (e) {
      setAlerta({ open: true, message: e.response?.data?.mensagem || 'Erro ao salvar produto', severity: 'error' });
    }
  };

  const handleEditar = (produto) => setEditando(produto);

  const handleRemover = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setAlerta({ open: true, message: 'Produto removido!', severity: 'success' });
      buscarProdutos();
    } catch {
      setAlerta({ open: true, message: 'Erro ao remover produto', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Controle de Estoque de Amortecedores</Typography>
      <Box mb={3}>
        <ProductForm onSave={handleSalvar} editando={editando} onCancel={() => setEditando(null)} />
      </Box>
      <ProductTable produtos={produtos} onEdit={handleEditar} onDelete={handleRemover} />
      <Snackbar open={alerta.open} autoHideDuration={4000} onClose={() => setAlerta({ ...alerta, open: false })}>
        <Alert severity={alerta.severity} sx={{ width: '100%' }}>{alerta.message}</Alert>
      </Snackbar>
    </Container>
  );
}
