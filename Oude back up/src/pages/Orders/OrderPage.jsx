import { useMemo, useState } from "react";
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
} from "@mui/material";

import AppLayout from "../../components/layouts/AppLayout";

import categories from "../../data/categories";
import products from "../../data/products";

import CategoryList from "../../components/CategoryList/CategoryList";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import OrderItems from "../../components/Order/OrderItems";
import OrderTotal from "../../components/Order/OrderTotal";
import OrderActions from "../../components/Order/OrderActions";

import { useOrders } from "../../context/OrderContext";

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

  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].id
  );

  const items = currentOrder?.items || [];

 const CATEGORY_MAP = {
  frisdranken: "Frisdrank",
  waters: "Water",
  fruitsappen: "Fruitsappen",
  bieren_vat: "Bier van t vat",
  bieren_fles: "Bier op fles",
  aperitieven: "Aperitieven/ sterke drank",
  sterke_dranken: "Sterke drank",
  whisky: "Whiskys",
  mixers: "Mixers",
  cocktails: "Coctails",
  alcoholvrij: "Coctails",
  wijnen: "Wijnen & Bubbels",
  ontbijt: "Ontbijt",
  pannenkoeken: "Pannenkoeken",
  wafels: "Wafels",
  ijsjes: "Ijsjes",
  taart: "Taartjes",
  snacks: "Genietmomentjes",
};

const filteredProducts = useMemo(() => {
  return products.filter(
    (product) =>
      product.category === CATEGORY_MAP[selectedCategory]
  );
}, [selectedCategory]);

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
            flexDirection: {
              xs: "column",
              md: "row",
            },
            mb: 2,
          }}
        >
          {/* Categorieën */}
          <Box
            sx={{
              width: {
                xs: "100%",
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
              width: "100%",
            }}
          >
            <FavoriteList
              products={filteredProducts}
              onAddProduct={addProduct}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <OrderItems
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