import React, { useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductTable({ produtos, onEdit, onDelete }) {
  useEffect(() => {}, [produtos]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Marca</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Quantidade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Imagem</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.map((p) => (
            <TableRow key={p.id}>
              <TableCell sx={{ fontWeight: 'bold' }}>{p.nome}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{p.marca}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{p.tipo}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{p.quantidade}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{p.descricao}</TableCell>
              <TableCell>{p.imagem ? <img src={p.imagem} alt={p.nome} width={60} /> : '-'}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(p)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => onDelete(p.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
