import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { EnseignantDAO } from '../dao/EnseignantDAO';
import { IEnseignant } from '../interfaces';

const Enseignants = () => {
  const [enseignants, setEnseignants] = useState<IEnseignant[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEnseignant, setEditingEnseignant] = useState<IEnseignant | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
  });

  const enseignantDAO = EnseignantDAO.getInstance();

  useEffect(() => {
    loadEnseignants();
  }, []);

  const loadEnseignants = async () => {
    const listeEnseignants = await enseignantDAO.listerTous();
    setEnseignants(listeEnseignants);
  };

  const handleOpen = (enseignant?: IEnseignant) => {
    if (enseignant) {
      setEditingEnseignant(enseignant);
      setFormData({
        nom: enseignant.nom,
        prenom: enseignant.prenom,
      });
    } else {
      setEditingEnseignant(null);
      setFormData({
        nom: '',
        prenom: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEnseignant(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enseignantData: IEnseignant = {
      ...formData,
      listeCours: [],
    };

    if (editingEnseignant?.id) {
      await enseignantDAO.modifier(editingEnseignant.id, { ...enseignantData, id: editingEnseignant.id });
    } else {
      await enseignantDAO.ajouter(enseignantData);
    }

    handleClose();
    loadEnseignants();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      await enseignantDAO.supprimer(id);
      loadEnseignants();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestion des Enseignants
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un enseignant
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Nombre de cours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enseignants.map((enseignant) => (
              <TableRow key={enseignant.id}>
                <TableCell>{enseignant.nom}</TableCell>
                <TableCell>{enseignant.prenom}</TableCell>
                <TableCell>{enseignant.listeCours?.length || 0}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(enseignant)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => enseignant.id && handleDelete(enseignant.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingEnseignant ? 'Modifier un enseignant' : 'Ajouter un enseignant'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nom"
              fullWidth
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Prénom"
              fullWidth
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingEnseignant ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Enseignants; 