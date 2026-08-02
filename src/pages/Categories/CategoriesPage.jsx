import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AppLayout from "../../components/layouts/AppLayout";
import { useCategories } from "../../context/CategoryContext";

export default function CategoriesPage() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    shortName: "",
    icon: "",
  });

  function newCategory() {
    setEditing(null);
    setForm({
      name: "",
      shortName: "",
      icon: "",
    });
    setOpen(true);
  }

  function editCategory(cat) {
    setEditing(cat);
    setForm(cat);
    setOpen(true);
  }

  function saveCategory() {
    if (!form.name.trim()) return;

    if (editing) {
      updateCategory(editing.id, form);
    } else {
      addCategory(form);
    }

    setOpen(false);
  }

  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>

        <Stack
          direction="row"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold">
            📂 Categorieën
          </Typography>

          <Button
            variant="contained"
            onClick={newCategory}
          >
            + Nieuwe
          </Button>
        </Stack>

        <Paper sx={{ borderRadius: 3 }}>

          <List>

            {categories.map((cat) => (

              <ListItem
                key={cat.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() => editCategory(cat)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >

                <ListItemText
                  primary={`${cat.icon} ${cat.name}`}
                  secondary={`GSM: ${cat.shortName}`}
                />

              </ListItem>

            ))}

          </List>

        </Paper>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >

          <DialogTitle>

            {editing
              ? "Categorie bewerken"
              : "Nieuwe categorie"}

          </DialogTitle>

          <DialogContent>

            <TextField
              fullWidth
              label="Naam"
              margin="normal"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Korte naam"
              margin="normal"
              value={form.shortName}
              onChange={(e) =>
                setForm({
                  ...form,
                  shortName: e.target.value,
                })
              }
            />

           <TextField
  select
  fullWidth
  label="Icoon"
  margin="normal"
  value={form.icon}
  onChange={(e) =>
    setForm({
      ...form,
      icon: e.target.value,
    })
  }
>
  <MenuItem value="🥤">🥤 Frisdranken</MenuItem>
  <MenuItem value="💧">💧 Water</MenuItem>
  <MenuItem value="🧃">🧃 Sap</MenuItem>
  <MenuItem value="🍺">🍺 Bier vat</MenuItem>
  <MenuItem value="🍾">🍾 Bier fles</MenuItem>
  <MenuItem value="🥃">🥃 Sterke drank</MenuItem>
  <MenuItem value="🍸">🍸 Cocktails</MenuItem>
  <MenuItem value="🍹">🍹 Alcoholvrij</MenuItem>
  <MenuItem value="🍷">🍷 Wijn</MenuItem>
  <MenuItem value="☕">☕ Koffie</MenuItem>
  <MenuItem value="🍰">🍰 Dessert</MenuItem>
  <MenuItem value="🍽️">🍽️ Gerechten</MenuItem>
</TextField>

          </DialogContent>

          <DialogActions>

            <Button
              onClick={() => setOpen(false)}
            >
              Annuleren
            </Button>

            <Button
              variant="contained"
              onClick={saveCategory}
            >
              Opslaan
            </Button>

          </DialogActions>

        </Dialog>

      </Container>
    </AppLayout>
  );
}