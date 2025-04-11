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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ResourceManager } from '../managers/ResourceManager';
import { IRessource } from '../interfaces';

const Ressources = () => {
  const [ressources, setRessources] = useState<IRessource[]>([]);
  const [open, setOpen] = useState(false);
  const [editingRessource, setEditingRessource] = useState<IRessource | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'salle' as 'salle' | 'materiel' | 'fourniture',
    description: '',
    disponible: true,
  });

  const resourceManager = ResourceManager.getInstance();

  useEffect(() => {
    loadRessources();
  }, []);

  const loadRessources = async () => {
    const listeRessources = await resourceManager.getAllResources();
    setRessources(listeRessources);
  };

  const handleOpen = (ressource?: IRessource) => {
    if (ressource) {
      setEditingRessource(ressource);
      setFormData({
        nom: ressource.nom,
        type: ressource.type,
        description: ressource.description || '',
        disponible: ressource.disponible,
      });
    } else {
      setEditingRessource(null);
      setFormData({
        nom: '',
        type: 'salle',
        description: '',
        disponible: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRessource(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ressourceData: IRessource = {
      ...formData,
    };

    if (editingRessource?.id) {
      await resourceManager.updateResource(editingRessource.id, { ...ressourceData, id: editingRessource.id });
    } else {
      await resourceManager.addResource(ressourceData);
    }

    handleClose();
    loadRessources();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      await resourceManager.deleteResource(id);
      loadRessources();
    }
  };

  const handleDisponibiliteChange = async (id: number, disponible: boolean) => {
    await resourceManager.setResourceAvailability(id, disponible);
    loadRessources();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestion des Ressources
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter une ressource
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ressources.map((ressource) => (
              <TableRow key={ressource.id}>
                <TableCell>{ressource.nom}</TableCell>
                <TableCell>{ressource.type}</TableCell>
                <TableCell>{ressource.description}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={ressource.disponible}
                        onChange={(e) => ressource.id && handleDisponibiliteChange(ressource.id, e.target.checked)}
                        color="primary"
                      />
                    }
                    label={ressource.disponible ? 'Disponible' : 'Indisponible'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(ressource)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => ressource.id && handleDelete(ressource.id)}
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
          {editingRessource ? 'Modifier une ressource' : 'Ajouter une ressource'}
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
            <FormControl fullWidth margin="dense">
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'salle' | 'materiel' | 'fourniture' })}
                required
              >
                <MenuItem value="salle">Salle</MenuItem>
                <MenuItem value="materiel">Matériel</MenuItem>
                <MenuItem value="fourniture">Fourniture</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.disponible}
                  onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
                  color="primary"
                />
              }
              label="Disponible"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingRessource ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Ressources; 