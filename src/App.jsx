import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import Home from './components/Home';
import './App.css';

// Use environment variable for API URL
const API_URL = 'https://a87f-148-222-192-191.ngrok-free.app/estoque';

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
  const [tela, setTela] = useState('home'); // home | cadastrar | listar

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
    if (tela === 'listar') buscarProdutos();
  }, [tela]);

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
      setTela('listar');
    } catch (e) {
      setAlerta({ open: true, message: e.response?.data?.mensagem || 'Erro ao salvar produto', severity: 'error' });
    }
  };

  const handleEditar = (produto) => {
    setEditando(produto);
    setTela('cadastrar');
  };

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
        {tela === 'home' && <Home onNavigate={setTela} />}
        {tela === 'cadastrar' && (
          <Container maxWidth="md">
            <Box mb={3}>
              <ProductForm onSave={handleSalvar} editando={editando} onCancel={(destino) => {
  setEditando(null);
  setTela(destino === 'home' ? 'home' : 'home');
}} />
            </Box>
          </Container>
        )}
        {tela === 'listar' && (
          <Container maxWidth="md" sx={{ position: 'relative', mt: 4 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ position: 'absolute', top: -100, left: -500, fontWeight: 'bold', zIndex: 2 }}
                onClick={() => { setEditando(null); setTela('home'); }}
              >
                Início
              </Button>
            </Box>
            <ProductTable produtos={Array.isArray(produtos) ? produtos : []} onEdit={handleEditar} onDelete={handleRemover} />
            <Box mt={2} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" sx={{ fontWeight: 'bold' }} onClick={() => { setEditando(null); setTela('cadastrar'); }}>
                Cadastrar Novo Produto
              </Button>
            </Box>
          </Container>
        )}
        <Snackbar open={alerta.open} autoHideDuration={4000} onClose={() => setAlerta({ ...alerta, open: false })}>
          <Alert severity={alerta.severity} sx={{ width: '100%' }}>{alerta.message}</Alert>
        </Snackbar>
        <Box component="footer" sx={{ width: '100%', bgcolor: 'primary.main', color: 'black', py: 2, textAlign: 'center', position: 'fixed', bottom: 0, left: 0, zIndex: 1300 }}>
          <Typography variant="body2" fontWeight="bold">
            © {new Date().getFullYear()} Controle de Estoque de Amortecedores
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
