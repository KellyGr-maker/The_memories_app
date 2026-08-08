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
  Divider,
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
  moveOrder,
  mergeOrder,
  clearOrder,
  mergeOrders,
  addItem,
  increaseItem,
  decreaseItem,
  splitOrder,
  createTableOrder,
  createCustomerOrder,
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
  const [moveCustomerName, setMoveCustomerName] = useState("");
  const [mergeDialogOpen, setMergeDialogOpen] = useState(false);
  const [mergeCustomerName, setMergeCustomerName] = useState("");
  const [splitMode, setSplitMode] = useState(false);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [splitCustomerName, setSplitCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [splitQuantities, setSplitQuantities] = useState({});

const TABLES = {
  terras: ["4", "8", "3", "7", "2", "6", "1", "5"],
  binnen: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
  bar: ["1", "2", "3", "4", "5"],
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

function moveToTable(zone, table) {
  const newOrder = createTableOrder(zone, table);

  mergeOrders(orderId, newOrder.id);

  setMoveDialogOpen(false);
}

function moveToNewCustomer() {
  const name = moveCustomerName.trim();

  if (!name) return;

  const customer = createCustomerOrder(
    currentOrder.zone,
    name
  );

  mergeOrders(orderId, customer.id);

  setMoveDialogOpen(false);
  setMoveCustomerName("");
}
  function mergeCurrentOrder() {
  setMergeDialogOpen(true);
}

function mergeToTable(zone, table) {
  const newOrder = createTableOrder(zone, table);

  mergeOrders(orderId, newOrder.id);

  setMergeDialogOpen(false);
}

function mergeToExisting(targetOrderId) {
  mergeOrders(orderId, targetOrderId);

  setMergeDialogOpen(false);
}

function createMergeCustomer() {
  const name = mergeCustomerName.trim();

  if (!name) return;

  const customer = createCustomerOrder(
    currentOrder.zone,
    name
  );

  mergeOrders(orderId, customer.id);

  setMergeDialogOpen(false);
  setMergeCustomerName("");
}

function splitCurrentOrder() {
  setSplitMode(true);
  setSplitDialogOpen(true);
}

function splitToTable(table) {
  console.log("splitToTable", table);
  const newOrder = createTableOrder(currentOrder.zone, table);
  console.log("newOrder =", newOrder);

  splitOrder(orderId, {
    id: newOrder.id,
    quantities: splitQuantities,
  });

  setSplitDialogOpen(false);
  setSplitMode(false);
  setSelectedItems([]);
  setSplitQuantities({});
}
function splitToExisting(targetOrderId) {
  splitOrder(orderId, {
    id: targetOrderId,
    quantities: splitQuantities,
  });

  setSplitDialogOpen(false);
  setSplitMode(false);
  setSelectedItems([]);
  setSplitQuantities({});
}

function createSplitCustomer() {
  const name = splitCustomerName.trim();

  if (!name) {
    return;
  }

  const customer = createCustomerOrder(
    currentOrder.zone,
    name
  );

  splitOrder(orderId, {
    id: customer.id,
    quantities: splitQuantities,
  });

  setSplitDialogOpen(false);
  setSplitMode(false);
  setSelectedItems([]);
  setSplitQuantities({});
  setSplitCustomerName("");
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
  splitMode={splitMode}
  selectedItems={selectedItems}
  splitQuantities={splitQuantities}
  setSplitQuantities={setSplitQuantities}
  onToggleItem={(id) => {
  console.log("Klik op:", id);

  if (selectedItems.includes(id)) {
    const nieuw = selectedItems.filter(
      (itemId) => itemId !== id
    );
    console.log("Nieuw:", nieuw);
    setSelectedItems(nieuw);
  } else {
    const nieuw = [...selectedItems, id];
    console.log("Nieuw:", nieuw);
    setSelectedItems(nieuw);
  }
}}
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
  <DialogTitle>Bestelling verplaatsen</DialogTitle>

  <DialogContent>
    <Stack spacing={1} sx={{ minWidth: 320, mt: 1 }}>

      <Typography fontWeight="bold">
        🟢 Vrije tafels
      </Typography>

      {["terras", "binnen", "bar"].map((zone) => {
        const freeZoneTables = TABLES[zone].filter((table) => {
  const existingOrder = orders.find(
    (order) =>
      order.id !== orderId &&
      order.type === "table" &&
      order.zone === zone &&
      String(order.table) === String(table)
  );

  // De huidige tafel niet tonen als bestemming
  if (
    zone === currentOrder.zone &&
    String(table) === String(currentOrder.table)
  ) {
    return false;
  }

  return !existingOrder;
});

        if (freeZoneTables.length === 0) return null;

        return (
          <Box key={zone} sx={{ mb: 1 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              {zone.charAt(0).toUpperCase() + zone.slice(1)}
            </Typography>

            <Stack spacing={1}>
              {freeZoneTables.map((table) => (
                <Button
                  key={`${zone}-${table}`}
                  fullWidth
                  variant="contained"
                  onClick={() => moveToTable(zone, table)}
                >
                  Tafel {table}
                </Button>
              ))}
            </Stack>
          </Box>
        );
      })}

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight="bold">
        👤 Nieuwe klant
      </Typography>

      <TextField
        fullWidth
        label="Naam nieuwe klant"
        value={moveCustomerName}
        onChange={(e) => setMoveCustomerName(e.target.value)}
        placeholder="Bijv. Marleen"
      />

      <Button
        fullWidth
        color="secondary"
        variant="contained"
        disabled={!moveCustomerName.trim()}
        onClick={moveToNewCustomer}
      >
        Nieuwe klant
      </Button>

    </Stack>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setMoveDialogOpen(false)}>
      Annuleren
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={mergeDialogOpen}
  onClose={() => setMergeDialogOpen(false)}
>
  <DialogTitle>Bestelling samenvoegen</DialogTitle>

  <DialogContent>
    <Stack spacing={1} sx={{ minWidth: 320, mt: 1 }}>

      {/* ========================= */}
      {/* VRIJE TAFELS */}
      {/* ========================= */}

      <Typography fontWeight="bold">
        🟢 Vrije tafels
      </Typography>

      {["terras", "binnen", "bar"].map((zone) => {
        const freeZoneTables = TABLES[zone].filter((table) => {
          const existingOrder = orders.find(
            (order) =>
              order.type === "table" &&
              order.zone === zone &&
              order.table === table
          );

          return !existingOrder;
        });

        if (freeZoneTables.length === 0) return null;

        return (
          <Box key={`free-${zone}`} sx={{ mb: 1 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              {zone.charAt(0).toUpperCase() + zone.slice(1)}
            </Typography>

            <Stack spacing={1}>
              {freeZoneTables.map((table) => (
                <Button
                  key={`${zone}-${table}`}
                  fullWidth
                  variant="contained"
                  onClick={() => mergeToTable(zone, table)}
                >
                  Tafel {table}
                </Button>
              ))}
            </Stack>
          </Box>
        );
      })}

      <Divider sx={{ my: 2 }} />

      {/* ========================= */}
      {/* BESTAANDE KLANTEN */}
      {/* ========================= */}

      <Typography fontWeight="bold">
        👥 Bestaande klanten
      </Typography>

      {["terras", "binnen", "bar"].map((zone) => {
        const zoneOrders = orders.filter(
          (order) =>
            order.id !== orderId &&
            order.items?.length > 0 &&
            order.zone === zone
        );

        if (zoneOrders.length === 0) return null;

        return (
          <Box key={`existing-${zone}`} sx={{ mb: 1 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              {zone.charAt(0).toUpperCase() + zone.slice(1)}
            </Typography>

            <Stack spacing={1}>
              {zoneOrders.map((order) => (
                <Button
                  key={order.id}
                  fullWidth
                  variant="outlined"
                  onClick={() => mergeToExisting(order.id)}
                >
                  {order.type === "customer"
                    ? `👤 ${order.name}`
                    : `🍽️ Tafel ${order.table}`}
                </Button>
              ))}
            </Stack>
          </Box>
        );
      })}

      <Divider sx={{ my: 2 }} />

      {/* ========================= */}
      {/* NIEUWE KLANT */}
      {/* ========================= */}

      <Typography fontWeight="bold">
        👤 Nieuwe klant
      </Typography>

      <TextField
        fullWidth
        label="Naam nieuwe klant"
        value={mergeCustomerName}
        onChange={(e) => setMergeCustomerName(e.target.value)}
        placeholder="Bijv. Marleen"
      />

      <Button
        fullWidth
        color="secondary"
        variant="contained"
        disabled={!mergeCustomerName.trim()}
        onClick={createMergeCustomer}
      >
        Nieuwe klant
      </Button>

    </Stack>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setMergeDialogOpen(false)}>
      Annuleren
    </Button>
  </DialogActions>
</Dialog>
  open={splitDialogOpen}
  onClose={() => setSplitDialogOpen(false)}

  <DialogTitle>Producten splitsen</DialogTitle>

  <DialogContent>
    <Stack spacing={1} sx={{ minWidth: 300, mt: 1 }}>

      {["terras", "binnen", "bar"].map((zone) => {
  const zoneTables = freeTables.filter((table) =>
    TABLES[zone].includes(table)
  );

  if (zoneTables.length === 0) return null;

  return (
    <Box key={zone} sx={{ mb: 2 }}>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        {zone.charAt(0).toUpperCase() + zone.slice(1)}
      </Typography>

      <Stack spacing={1}>
        {zoneTables.map((table) => (
          <Button
            key={table}
            variant="contained"
            onClick={() => splitToTable(table)}
          >
            Tafel {table}
          </Button>
        ))}
      </Stack>
    </Box>
  );
})}

<Divider sx={{ my: 2 }} />
<Typography fontWeight="bold">
🍽️ Bestaande bestellingen
</Typography>

{["terras", "binnen", "bar"].map((zone) => {
  const zoneOrders = orders.filter(
    (order) =>
      order.id !== orderId &&
      order.type === "table" &&
      order.zone === zone &&
      order.items.length > 0
  );

  if (zoneOrders.length === 0) return null;

  return (
    <Box key={zone} sx={{ mb: 2 }}>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        {zone.charAt(0).toUpperCase() + zone.slice(1)}
      </Typography>

      <Stack spacing={1}>
        {zoneOrders.map((order) => (
          <Button
            key={order.id}
            variant="outlined"
            onClick={() => splitToExisting(order.id)}
          >
            Tafel {order.table} ({order.items.length})
          </Button>
        ))}
      </Stack>
    </Box>
  );
})}

<Divider sx={{ my: 2 }} />

      <Typography fontWeight="bold">
👤 Nieuwe klant
</Typography>
<TextField
  fullWidth
  label="Naam nieuwe klant"
  value={splitCustomerName}
  onChange={(e) => setSplitCustomerName(e.target.value)}
  placeholder="Bijv. Jan"
  sx={{ mb: 1 }}
/>
<Button
  fullWidth
  color="secondary"
  variant="contained"
  onClick={createSplitCustomer}
>
  Nieuwe klant
</Button>

    </Stack>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setSplitDialogOpen(false)}>
      Annuleren
    </Button>
  </DialogActions>

              </Container>
    </AppLayout>
  );
}