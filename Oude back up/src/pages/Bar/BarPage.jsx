import {
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
  const { orders, setOrders } = useOrders();

  const pendingOrders = orders.filter((order) =>
    order.items.some((item) => item.status === "pending")
  );

  const readyOrders = orders.filter((order) =>
    order.items.some((item) => item.status === "ready")
  );

  function markReady(orderId) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          items: order.items.map((item) =>
            item.status === "pending"
              ? {
                  ...item,
                  status: "ready",
                }
              : item
          ),
        };
      })
    );
  }

  function markServed(orderId) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          items: order.items.map((item) =>
            item.status === "ready"
              ? {
                  ...item,
                  status: "served",
                }
              : item
          ),
        };
      })
    );
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

            <Stack spacing={2}>
              {pendingOrders.map((order) => (
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
                      .filter(
                        (item) => item.status === "pending"
                      )
                      .map((item) => (
                        <Typography key={item.id}>
                          {item.quantity} × {item.name}
                        </Typography>
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
            </Stack>
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
                      .filter(
                        (item) => item.status === "ready"
                      )
                      .map((item) => (
                        <Typography key={item.id}>
                          {item.quantity} × {item.name}
                        </Typography>
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