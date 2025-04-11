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
import { ServiceDAO } from '../dao/ServiceDAO';
import { IServiceSupplementaire } from '../interfaces';

const Services = () => {
  const [services, setServices] = useState<IServiceSupplementaire[]>([]);
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<IServiceSupplementaire | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'sport' as 'sport' | 'art' | 'tutorat',
    description: '',
  });

  const serviceDAO = ServiceDAO.getInstance();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const listeServices = await serviceDAO.listerTous();
    setServices(listeServices);
  };

  const handleOpen = (service?: IServiceSupplementaire) => {
    if (service) {
      setEditingService(service);
      setFormData({
        nom: service.nom,
        type: service.type,
        description: service.description || '',
      });
    } else {
      setEditingService(null);
      setFormData({
        nom: '',
        type: 'sport',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData: IServiceSupplementaire = {
      ...formData,
    };

    if (editingService?.id) {
      await serviceDAO.modifier(editingService.id, { ...serviceData, id: editingService.id });
    } else {
      await serviceDAO.ajouter(serviceData);
    }

    handleClose();
    loadServices();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      await serviceDAO.supprimer(id);
      loadServices();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestion des Services Supplémentaires
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un service
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.nom}</TableCell>
                <TableCell>{service.type}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(service)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => service.id && handleDelete(service.id)}
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
          {editingService ? 'Modifier un service' : 'Ajouter un service'}
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
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sport' | 'art' | 'tutorat' })}
                required
              >
                <MenuItem value="sport">Sport</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="tutorat">Tutorat</MenuItem>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingService ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Services; 