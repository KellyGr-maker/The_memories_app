import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Grid,
  Divider,
} from "@mui/material";

import AppLayout from "../../components/layouts/AppLayout";
import { useOrders } from "../../context/OrderContext";

export default function BarPage() {
  const {
    orders,
    moveItemToReady,
    moveItemToServed,
  } = useOrders();

  const pendingOrders = orders.filter((order) =>
    order.items.some((item) => item.status === "pending")
  );

  const readyOrders = orders.filter((order) =>
    order.items.some((item) => item.status === "ready")
  );

  function markReady(orderId) {
    const order = orders.find((o) => o.id === orderId);

    if (!order) return;

    order.items
      .filter((item) => item.status === "pending")
      .forEach((item) => {
       moveItemToReady(orderId, item.orderItemId);
      });
  }

  function markServed(orderId) {
    const order = orders.find((o) => o.id === orderId);

    if (!order) return;

    order.items
      .filter((item) => item.status === "ready")
      .forEach((item) => {
        moveItemToServed(orderId, item.orderItemId);
      });
  }

  return (
    <AppLayout>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#D4AF37"
          mb={4}
        >
          🧾 ORDER
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              color="#D4AF37"
              mb={2}
            >
              🟡 Te maken
            </Typography>

            <Stack spacing={2}></Stack>              {pendingOrders.map((order) => (
                <Card
                  key={order.id}
                  sx={{
                    bgcolor: "#232323",
                    color: "white",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {order.type === "customer"
                        ? `👤 ${order.name}`
                        : `${order.zone} - Tafel ${order.table}`}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {order.items
                      .filter((item) => item.status === "pending")
                      .map((item) => (
                       <Box key={item.orderItemId} sx={{ mb: 1 }}>
  <Typography>
    {item.quantity} × {item.name}
  </Typography>

  {item.note && (
    <Typography
      variant="body2"
      sx={{
        ml: 2,
        fontStyle: "italic",
        color: "#FFD54F",
      }}
    >
      ↳ {item.note}
    </Typography>
  )}
</Box>
                      ))}

                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={() => markReady(order.id)}
                    >
                      KLAAR
                    </Button>
                  </CardContent>
                </Card>
              ))}
        
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              color="#D4AF37"
              mb={2}
            >
              🟢 Te brengen
            </Typography>

            <Stack spacing={2}>
              {readyOrders.map((order) => (
                <Card
                  key={order.id}
                  sx={{
                    bgcolor: "#232323",
                    color: "white",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {order.type === "customer"
                        ? `👤 ${order.name}`
                        : `${order.zone} - Tafel ${order.table}`}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {order.items
                      .filter((item) => item.status === "ready")
                      .map((item) => (
                        <Box key={item.orderItemId} sx={{ mb: 1 }}>
  <Typography>
    {item.quantity} × {item.name}
  </Typography>

  {item.note && (
    <Typography
      variant="body2"
      sx={{
        ml: 2,
        fontStyle: "italic",
        color: "#FFD54F",
      }}
    >
      ↳ {item.note}
    </Typography>
  )}
</Box>
                      ))}

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => markServed(order.id)}
                    >
                      GEBRACHT
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}