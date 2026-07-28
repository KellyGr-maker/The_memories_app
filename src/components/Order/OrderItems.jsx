import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const DRINK_CATEGORIES = [
  "Frisdrank",
  "Water",
  "Fruitsappen",
  "Bier van t vat",
  "Bier op fles",
  "Aperitieven/ sterke drank",
  "Jenever",
  "Sterke drank",
  "Whiskys",
  "Mixers",
  "Coctails",
  "Wijnen & Bubbels",
];

function ItemRow({
  item,
  onIncrease,
  onDecrease,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ py: 1 }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight="bold">
          {item.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          € {item.price.toFixed(2)}
        </Typography>
      </Box>

      <IconButton
        color="error"
        onClick={() => onDecrease(item.id)}
      >
        <RemoveCircleIcon />
      </IconButton>

      <Typography fontWeight="bold">
        {item.quantity}
      </Typography>

      <IconButton
        color="success"
        onClick={() => onIncrease(item.id)}
      >
        <AddCircleIcon />
      </IconButton>
    </Stack>
  );
}


export default function OrderItems({
  order,
  onIncrease,
  onDecrease,
}) {

  const drinks = order.filter((item) =>
    DRINK_CATEGORIES.includes(item.category)
  );

  const food = order.filter(
    (item) =>
      !DRINK_CATEGORIES.includes(item.category)
  );


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


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >

        <Paper
          variant="outlined"
          sx={{ p: 2 }}
        >
          <Typography
            fontWeight="bold"
            mb={1}
          >
            🍺 Dranken
          </Typography>

          {drinks.map((item) => (
            <Box key={item.id}>
              <ItemRow
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
              <Divider />
            </Box>
          ))}
        </Paper>


        <Paper
          variant="outlined"
          sx={{ p: 2 }}
        >
          <Typography
            fontWeight="bold"
            mb={1}
          >
            🍽 Gerechten
          </Typography>

          {food.map((item) => (
            <Box key={item.id}>
              <ItemRow
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
              <Divider />
            </Box>
          ))}
        </Paper>

      </Box>

    </Paper>
  );
}