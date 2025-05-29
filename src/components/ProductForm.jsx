import React, { useEffect } from 'react';
import { Box, TextField, Button, Paper, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function ProductForm({ onSave, editando, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editando) {
      reset(editando);
    } else {
      reset({ nome: '', marca: '', tipo: '', quantidade: '', descricao: '', imagem: '' });
    }
  }, [editando, reset]);

  const onSubmit = (data) => {
    data.quantidade = Number(data.quantidade);
    onSave(data);
    reset();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nome" fullWidth {...register('nome', { required: true })} error={!!errors.nome} helperText={errors.nome && 'Campo obrigatório'} InputLabelProps={{ style: { fontWeight: 'bold' }, shrink: true }} inputProps={{ style: { fontWeight: 'bold' } }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Marca" fullWidth {...register('marca', { required: true })} error={!!errors.marca} helperText={errors.marca && 'Campo obrigatório'} InputLabelProps={{ style: { fontWeight: 'bold' }, shrink: true }} inputProps={{ style: { fontWeight: 'bold' } }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Tipo" fullWidth {...register('tipo', { required: true })} error={!!errors.tipo} helperText={errors.tipo && 'Campo obrigatório'} InputLabelProps={{ style: { fontWeight: 'bold' }, shrink: true }} inputProps={{ style: { fontWeight: 'bold' } }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Quantidade" type="number" fullWidth {...register('quantidade', { required: true, min: 0 })} error={!!errors.quantidade} helperText={errors.quantidade && 'Campo obrigatório (mínimo 0)'} inputProps={{ min: 0, style: { fontWeight: 'bold' } }} InputLabelProps={{ style: { fontWeight: 'bold' }, shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Descrição" fullWidth multiline rows={2} {...register('descricao')} InputLabelProps={{ style: { fontWeight: 'bold' }, shrink: true }} inputProps={{ style: { fontWeight: 'bold' } }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="URL da Imagem" fullWidth {...register('imagem')} InputLabelProps={{ style: { fontWeight: 'bold' }, shrink: true }} inputProps={{ style: { fontWeight: 'bold' } }} />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
                {editando ? 'Atualizar' : 'Cadastrar'}
              </Button>
              {editando && (
                <Button variant="outlined" color="secondary" onClick={onCancel}>Cancelar</Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
