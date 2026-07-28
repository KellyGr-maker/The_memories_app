import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import AppLayout from "../../components/layouts/AppLayout";
import { useOrders } from "../../context/OrderContext";

const TABLES = {
  terras: ["1", "2", "3", "4", "5", "6", "7", "8"],
  binnen: ["1","2","3","4","5","6","7","8","9","10","11"],
  bar: ["1", "2", "3", "4", "5"],
};

export default function TablesPage() {
  const navigate = useNavigate();
  const { zone: zoneParam } = useParams();

  const zone = (zoneParam || "terras").toLowerCase();

  const {
    orders,
    createTableOrder,
    createCustomerOrder,
    isTableOccupied,
  } = useOrders();

  const [openDialog, setOpenDialog] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const tables = TABLES[zone] || [];

  const customers = orders.filter(
    (order) =>
      order.type === "customer" &&
      order.zone === zone
  );

  function openTable(table) {
    const existing = orders.find(
      (order) =>
        order.type === "table" &&
        order.zone === zone &&
        String(order.table) === String(table)
    );

    if (existing) {
      navigate(`/order/${existing.id}`);
      return;
    }

    const order = createTableOrder(zone, String(table));
    navigate(`/order/${order.id}`);
  }

  function createCustomer() {
    const order = createCustomerOrder(zone, customerName);

    setCustomerName("");
    setOpenDialog(false);

    navigate(`/order/${order.id}`);
  }

  return (
    <AppLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          {zone.toUpperCase()}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenDialog(true)}
        >
          + Klant
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2,1fr)",
            sm: "repeat(3,1fr)",
          },
          gap: 2,
        }}
      >
        {tables.map((table) => {
          const occupied = isTableOccupied(zone, table);

          return (
            <Paper
              key={table}
              onClick={() => openTable(table)}
              elevation={4}
              sx={{
                height: 110,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                bgcolor: occupied ? "#d32f2f" : "#2e7d32",
                color: "white",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Tafel {table}
              </Typography>

              <Typography>
                {occupied ? "Bezet" : "Vrij"}
              </Typography>
            </Paper>
          );
        })}

        {customers.map((customer) => (
          <Paper
            key={customer.id}
            onClick={() => navigate(`/order/${customer.id}`)}
            elevation={4}
            sx={{
              height: 110,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              bgcolor: "#1976d2",
              color: "white",
            }}
          >
            <Typography variant="h4">👤</Typography>
            <Typography fontWeight="bold">
              {customer.name}
            </Typography>
            <Typography variant="body2">
              Klant
            </Typography>
          </Paper>
        ))}
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Nieuwe klant</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Naam"
            margin="dense"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Annuleren
          </Button>

          <Button
            variant="contained"
            onClick={createCustomer}
          >
            Aanmaken
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
}
