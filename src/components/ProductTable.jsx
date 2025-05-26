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
            <TableCell>Nome</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.nome}</TableCell>
              <TableCell>{p.marca}</TableCell>
              <TableCell>{p.tipo}</TableCell>
              <TableCell>{p.quantidade}</TableCell>
              <TableCell>{p.descricao}</TableCell>
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
