import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container } from '@mui/material';

export default function Home({ onNavigate }) {
  return (
    <>
      <AppBar position="static" color="primary" elevation={2} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'black' }}>
            Controle de Estoque
          </Typography>
          <Button color="inherit" sx={{ fontWeight: 'bold', color: 'black', mr: 2 }} onClick={() => onNavigate('cadastrar')}>
            Cadastrar Produto
          </Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', color: 'black' }} onClick={() => onNavigate('listar')}>
            Visualizar Produtos
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ position: 'relative', zIndex: 1, bgcolor: 'primary.main', color: 'black', p: 4, borderRadius: 3, boxShadow: 3, mb: 4, width: '100%' }}>
          <Typography variant="h3" fontWeight={700} align="center" gutterBottom>
            Bem-vindo ao Controle de Estoque
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Gerencie facilmente os amortecedores da sua empresa.
          </Typography>
        </Box>
      </Container>
      <Box component="footer" sx={{ width: '100%', bgcolor: 'primary.main', color: 'black', py: 2, textAlign: 'center', position: 'fixed', bottom: 0, left: 0, zIndex: 1300 }}>
        <Typography variant="body2" fontWeight="bold">
          © {new Date().getFullYear()} Controle de Estoque de Amortecedores
        </Typography>
      </Box>
    </>
  );
}
