import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function OrderItems({
  order,
  onIncrease,
  onDecrease,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        🧾 Bestelling
      </Typography>

      {order.length === 0 && (
        <Typography color="text.secondary">
          Nog geen producten toegevoegd.
        </Typography>
      )}

      {order.map((item) => (
        <Stack
          key={item.id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 1,
          }}
        >
          <Stack sx={{ flex: 1 }}>
            <Typography fontWeight="bold">
              {item.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              € {item.price.toFixed(2)}
            </Typography>
          </Stack>

          <IconButton
            color="error"
            onClick={() => onDecrease(item.id)}
          >
            <RemoveCircleIcon />
          </IconButton>

          <Typography
            sx={{
              width: 28,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {item.quantity}
          </Typography>

          <IconButton
            color="success"
            onClick={() => onIncrease(item.id)}
          >
            <AddCircleIcon />
          </IconButton>

          <Typography
            sx={{
              width: 70,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            € {(item.price * item.quantity).toFixed(2)}
          </Typography>

          <Divider />
        </Stack>
      ))}
    </Paper>
  );
}