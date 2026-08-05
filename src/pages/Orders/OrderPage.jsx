import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import AppLayout from "../../components/layouts/AppLayout";
import CategoryList from "../../components/CategoryList/CategoryList";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import OrderItems from "../../components/Order/OrderItems";
import OrderTotal from "../../components/Order/OrderTotal";
import OrderActions from "../../components/Order/OrderActions";

import { useOrders } from "../../context/OrderContext";
import { useCategories } from "../../context/CategoryContext";
import { useProducts } from "../../context/ProductContext";

export default function OrderPage() {
  const { orderId } = useParams();

  const {
  orders,
  getOrder,
  saveOrder,
  clearOrder,
  moveOrder,
  mergeOrders,
  addItem,
  increaseItem,
  decreaseItem,
} = useOrders();

  const currentOrder = getOrder(orderId);
  
  if (!currentOrder) {
  return (
    <AppLayout>
      <Container sx={{ py: 3 }}>
        <Typography variant="h5">
          Bestelling niet gevonden.
        </Typography>
      </Container>
    </AppLayout>
  );
}
  const { categories } = useCategories();
  const { products } = useProducts();
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);


const TABLES = {
  terras: ["1", "2", "3", "4", "5", "6", "7", "8"],
  binnen: ["1","2","3","4","5","6","7","8","9","10","11"],
  bar: ["1","2","3","4","5"],
};

const freeTables = TABLES[currentOrder?.zone || "terras"].filter(
  (table) =>
    !currentOrder ||
    table === currentOrder.table ||
    !getOrder(
      orders.find(
        (o) =>
          o.type === "table" &&
          o.zone === currentOrder.zone &&
          o.table === table
      )?.id
    )
);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
useEffect(() => {
  if (!selectedCategory && categories.length > 0) {
    setSelectedCategory(categories[0].id);
  }
}, [categories, selectedCategory]);
  const items = currentOrder.items;

const filteredProducts = useMemo(() => {
  // Zoek in alle producten als er tekst is ingevoerd
  if (search.trim() !== "") {
    return products.filter((product) => {
      if (!product) return false;

      return product.name
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }

  // Anders toon enkel de geselecteerde categorie
  const category = categories.find(
    (cat) => cat.id === selectedCategory
  );

  if (!category) return [];

  return products.filter(
    (product) =>
      product &&
      product.category === category.name
  );
}, [products, categories, selectedCategory, search]);

function addProduct(product) {
  addItem(orderId, product);
}

  function increase(id) {
    increaseItem(orderId, id);
  }

  function decrease(id) {
    decreaseItem(orderId, id);
   }

  function saveCurrentOrder() {
    if (!currentOrder) return;

    saveOrder(orderId, currentOrder);

    alert("✅ Bestelling opgeslagen");
  }

  function clearCurrentOrder() {
    clearOrder(orderId);
  }

function moveCurrentOrder() {
  setMoveDialogOpen(true);
}

function moveToTable(table) {
  moveOrder(orderId, table);
  setMoveDialogOpen(false);
}
  function mergeCurrentOrder() {
    const otherOrder = prompt("Order ID om samen te voegen:");

    if (!otherOrder) return;

    mergeOrders(orderId, otherOrder);
  }

  function splitCurrentOrder() {
    alert("Splitsen bouwen we straks af.");
  }

  return (
    <AppLayout>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h5" fontWeight="bold">
  {currentOrder?.type === "customer"
    ? `👤 ${currentOrder.name}`
    : `🍽️ Tafel ${currentOrder?.table}`}
</Typography>

            <Typography color="text.secondary">
              {currentOrder?.zone}
            </Typography>

            <Chip
              sx={{ width: 120 }}
              color={items.length ? "warning" : "success"}
              label={items.length ? "🟡 Bezet" : "🟢 Vrij"}
            />
          </Stack>
        </Paper>
                <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            flexDirection: "row",
            mb: 2,
          }}
        >
          {/* Categorieën */}
     {/* Categorieën */}
                <Box
          sx={{
            width: {
            xs: 110,
            sm: 130,
            md: 260,
          },
          flexShrink: 0,
         }}
>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </Box>

          {/* Producten */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <TextField
  fullWidth
  size="small"
  placeholder="🔍 Zoek product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  variant="outlined"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: "#bdbdbd" }} />
      </InputAdornment>
    ),
    endAdornment: search ? (
      <InputAdornment position="end">
        <IconButton onClick={() => setSearch("")} edge="end">
          <ClearIcon sx={{ color: "#bdbdbd" }} />
        </IconButton>
      </InputAdornment>
    ) : undefined,
  }}
  sx={{
    mb: 2,
    "& .MuiOutlinedInput-root": {
      bgcolor: "#2b2b2b",
      color: "#fff",
      borderRadius: 2,
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "#bdbdbd",
      opacity: 1,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#666",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#999",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2",
    },
  }}
/>
            <Typography>
 </Typography>

            <FavoriteList
              products={filteredProducts ??[]}
              onAddProduct={addProduct}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <OrderItems
             orderId={orderId}
             order={items}
             onIncrease={increase}
             onDecrease={decrease}
/>
        </Box>

        <Box sx={{ mb: 2 }}>
          <OrderTotal order={items} />
        </Box>

        <Box>
          <OrderActions
            onSave={saveCurrentOrder}
            onMove={moveCurrentOrder}
            onMerge={mergeCurrentOrder}
            onSplit={splitCurrentOrder}
            onClear={clearCurrentOrder}
          />
        </Box>
        <Dialog
  open={moveDialogOpen}
  onClose={() => setMoveDialogOpen(false)}
>
  <DialogTitle>Verplaats bestelling</DialogTitle>

  <DialogContent>
    <Stack spacing={1} sx={{ mt: 1, minWidth: 250 }}>
      {freeTables.map((table) => (
        <Button
          key={table}
          variant="contained"
          onClick={() => moveToTable(table)}
        >
          Tafel {table}
        </Button>
      ))}
    </Stack>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setMoveDialogOpen(false)}>
      Annuleren
    </Button>
  </DialogActions>
</Dialog>

              </Container>
    </AppLayout>
  );
}