import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useOrders } from "../../context/OrderContext";

const TABLES = {
  terras: ["1", "2", "3", "4", "5", "6", "7", "8"],
  binnen: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
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

  const tables = TABLES[zone] || [];

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

  function newCustomer() {
    const order = createCustomerOrder(zone);
    navigate(`/order/${order.id}`);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight="bold">
          {zone.toUpperCase()}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={newCustomer}
        >
          + Klant
        </Button>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {tables.map((table) => {
          const occupied = isTableOccupied(zone, table);

          return (
            <Paper
              key={table}
              elevation={3}
              onClick={() => openTable(table)}
              sx={{
                width: 160,
                height: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 3,
                bgcolor: occupied
                  ? "success.main"
                  : "grey.200",
                color: occupied ? "white" : "black",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Tafel {table}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                {occupied ? "🟢 Bezet" : "⚪ Vrij"}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}