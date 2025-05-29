import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import './App.css';

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/estoque';

const theme = createTheme({
  palette: {
    primary: { main: '#FFC107' }, 
    secondary: { main: '#FFA000' },
    background: { default: '#424242' }, // cinza mais escuro
  },
  shape: { borderRadius: 12 },
});

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [alerta, setAlerta] = useState({ open: false, message: '', severity: 'success' });

  const buscarProdutos = async () => {
    try {
      const { data } = await axios.get(API_URL);
      console.log('API em produção:', API_URL, 'Resposta:', data);
      setProdutos(Array.isArray(data) ? data : data.produtos || []);
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
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 4 }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'black', py: 2, mb: 4, boxShadow: 2 }}>
          <Typography variant="h4" align="center" fontWeight={700} letterSpacing={1}>
            Controle de Estoque de Amortecedores
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Box mb={3}>
            <ProductForm onSave={handleSalvar} editando={editando} onCancel={() => setEditando(null)} />
          </Box>
          <ProductTable produtos={Array.isArray(produtos) ? produtos : []} onEdit={handleEditar} onDelete={handleRemover} />
        </Container>
        <Snackbar open={alerta.open} autoHideDuration={4000} onClose={() => setAlerta({ ...alerta, open: false })}>
          <Alert severity={alerta.severity} sx={{ width: '100%' }}>{alerta.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
