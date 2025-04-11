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
import { EleveDAO } from '../dao/EleveDAO';
import { IEleve } from '../interfaces';

const Eleves = () => {
  const [eleves, setEleves] = useState<IEleve[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEleve, setEditingEleve] = useState<IEleve | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
  });

  const eleveDAO = EleveDAO.getInstance();

  useEffect(() => {
    loadEleves();
  }, []);

  const loadEleves = async () => {
    const listeEleves = await eleveDAO.listerTous();
    setEleves(listeEleves);
  };

  const handleOpen = (eleve?: IEleve) => {
    if (eleve) {
      setEditingEleve(eleve);
      setFormData({
        nom: eleve.nom,
        prenom: eleve.prenom,
        matricule: eleve.matricule,
      });
    } else {
      setEditingEleve(null);
      setFormData({
        nom: '',
        prenom: '',
        matricule: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEleve(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eleveData: IEleve = {
      ...formData,
      listeCours: [],
      listeServices: [],
    };

    if (editingEleve?.id) {
      await eleveDAO.modifier(editingEleve.id, { ...eleveData, id: editingEleve.id });
    } else {
      await eleveDAO.ajouter(eleveData);
    }

    handleClose();
    loadEleves();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      await eleveDAO.supprimer(id);
      loadEleves();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestion des Élèves
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un élève
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matricule</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eleves.map((eleve) => (
              <TableRow key={eleve.id}>
                <TableCell>{eleve.matricule}</TableCell>
                <TableCell>{eleve.nom}</TableCell>
                <TableCell>{eleve.prenom}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(eleve)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => eleve.id && handleDelete(eleve.id)}
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
          {editingEleve ? 'Modifier un élève' : 'Ajouter un élève'}
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
            <TextField
              margin="dense"
              label="Matricule"
              fullWidth
              value={formData.matricule}
              onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingEleve ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Eleves; 