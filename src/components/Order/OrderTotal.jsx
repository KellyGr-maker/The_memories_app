import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function OrderTotal({ order }) {
  const total = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          💰 Totaal
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="success.main"
        >
          € {total.toFixed(2)}
        </Typography>
      </Stack>
    </Paper>
  );
}