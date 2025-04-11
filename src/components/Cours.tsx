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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CoursDAO } from '../dao/CoursDAO';
import { EnseignantDAO } from '../dao/EnseignantDAO';
import { ICours, IEnseignant } from '../interfaces';

const Cours = () => {
  const [cours, setCours] = useState<ICours[]>([]);
  const [enseignants, setEnseignants] = useState<IEnseignant[]>([]);
  const [open, setOpen] = useState(false);
  const [editingCours, setEditingCours] = useState<ICours | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    type: '',
    enseignantId: 0,
  });

  const coursDAO = CoursDAO.getInstance();
  const enseignantDAO = EnseignantDAO.getInstance();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [listeCours, listeEnseignants] = await Promise.all([
      coursDAO.listerTous(),
      enseignantDAO.listerTous(),
    ]);
    setCours(listeCours);
    setEnseignants(listeEnseignants);
  };

  const handleOpen = (cours?: ICours) => {
    if (cours) {
      setEditingCours(cours);
      setFormData({
        nom: cours.nom,
        type: cours.type,
        enseignantId: cours.enseignantId,
      });
    } else {
      setEditingCours(null);
      setFormData({
        nom: '',
        type: '',
        enseignantId: 0,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCours(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const coursData: ICours = {
      ...formData,
    };

    if (editingCours?.id) {
      await coursDAO.modifier(editingCours.id, { ...coursData, id: editingCours.id });
    } else {
      await coursDAO.ajouter(coursData);
    }

    handleClose();
    loadData();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      await coursDAO.supprimer(id);
      loadData();
    }
  };

  const getEnseignantNom = (enseignantId: number) => {
    const enseignant = enseignants.find((e) => e.id === enseignantId);
    return enseignant ? `${enseignant.prenom} ${enseignant.nom}` : 'Non assigné';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestion des Cours
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un cours
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Enseignant</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cours.map((cours) => (
              <TableRow key={cours.id}>
                <TableCell>{cours.nom}</TableCell>
                <TableCell>{cours.type}</TableCell>
                <TableCell>{getEnseignantNom(cours.enseignantId)}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(cours)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => cours.id && handleDelete(cours.id)}
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
          {editingCours ? 'Modifier un cours' : 'Ajouter un cours'}
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
              label="Type"
              fullWidth
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Enseignant</InputLabel>
              <Select
                value={formData.enseignantId}
                onChange={(e) => setFormData({ ...formData, enseignantId: Number(e.target.value) })}
                required
              >
                {enseignants.map((enseignant) => (
                  <MenuItem key={enseignant.id} value={enseignant.id}>
                    {enseignant.prenom} {enseignant.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingCours ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Cours; 