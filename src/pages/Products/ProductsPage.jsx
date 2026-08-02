import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
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

import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";

export default function ProductsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { categories } = useCategories();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  function newProduct() {
    setEditing(null);

    setForm({
      name: "",
      price: "",
      category: categories[0]?.name || "",
    });

    setOpen(true);
  }

  function editProduct(product) {
    setEditing(product);
   setForm({
  ...product,
  category: product.category,
});
    setOpen(true);
  }

  function saveProduct() {
    if (!form.name) return;

    if (editing) {
      updateProduct(editing.id, form);
    } else {
      addProduct({
        ...form,
        price: Number(form.price),
      });
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
            📦 Producten
          </Typography>

          <Button
            variant="contained"
            onClick={newProduct}
          >
            + Nieuw
          </Button>
        </Stack>

        <Paper sx={{ borderRadius: 3 }}>

          <List>

            {products.map((product) => (

              <ListItem
                key={product.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() => editProduct(product)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={product.name}
                  secondary={`€ ${Number(product.price).toFixed(2)}`}
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
            {editing ? "Product bewerken" : "Nieuw product"}
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
              type="number"
              label="Prijs"
              margin="normal"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

            <TextField
              select
              fullWidth
              label="Categorie"
              margin="normal"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat.id}
                  value={cat.name}
                >
                  {cat.icon} {cat.name}
                </MenuItem>
              ))}
            </TextField>

          </DialogContent>

          <DialogActions>

            <Button onClick={() => setOpen(false)}>
              Annuleren
            </Button>

            <Button
              variant="contained"
              onClick={saveProduct}
            >
              Opslaan
            </Button>

          </DialogActions>

        </Dialog>

      </Container>
    </AppLayout>
  );
}