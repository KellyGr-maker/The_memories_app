import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState } from "react";
import { useOrders } from "../../context/OrderContext";

const DRINK_CATEGORIES = [
  "Frisdranken",
  "Waters",
  "Fruitsappen",
  "Koffie & Thee",
  "Bieren van 't vat",
  "Bieren op fles",
  "Aperitieven",
  "Jenever",
  "Sterke drank",
  "Whisky",
  "Mixers",
  "Cocktails",
  "Alcoholvrije cocktails",
  "Wijnen & Bubbels",
];

function ItemRow({
  orderId,
  item,
  onIncrease,
  onDecrease,
}) {
  const { updateItemNote } = useOrders();
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
const [note, setNote] = useState(item.note || "");

function openNoteDialog() {
  setNote(item.note || "");
  setNoteDialogOpen(true);
}

function saveNote() {
  updateItemNote(
    orderId,
    item.orderItemId,
    note
  );

  setNoteDialogOpen(false);
}

  const statusColor = {
    pending: "warning.main",
    ready: "success.main",
    served: "primary.main",
  };

  const statusLabel = {
    pending: "🟡 In bereiding",
    ready: "🟢 Klaar",
    served: "✅ Gebracht",
  };

function editNote() {
  alert("klik");

  const note = prompt(
  "Opmerking",
  item.note || ""
);

  if (note === null) return;

  updateItemNote(
    orderId,
    item.orderItemId,
    note
  );
}

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

        <Typography
          variant="caption"
          sx={{
            color: statusColor[item.status],
            fontWeight: "bold",
            display: "block",
          }}
        >
          {statusLabel[item.status]}
        </Typography>

        {item.note && (
          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            📝 {item.note}
          </Typography>
        )}
      </Box>

      <IconButton
        color="error"
        onClick={() =>
          onDecrease(item.orderItemId)
        }
      >
        <RemoveCircleIcon />
      </IconButton>

      <Typography fontWeight="bold">
        {item.quantity}
      </Typography>

      <IconButton
        color="success"
        onClick={() =>
          onIncrease(item.orderItemId)
        }
      >
        <AddCircleIcon />
      </IconButton>

      <IconButton
        color="primary"
        onClick={openNoteDialog}
      >
        <EditNoteIcon />
      </IconButton>
   

      <Dialog
        open={noteDialogOpen}
        onClose={() => setNoteDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Opmerking
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setNoteDialogOpen(false)
            }
          >
            Annuleren
          </Button>

          <Button
            variant="contained"
            onClick={saveNote}
          >
            Opslaan
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>)}
export default function OrderItems({
  orderId,
  order,
  onIncrease,
  onDecrease,
}) {
  const STATUS_ORDER = {
    pending: 0,
    ready: 1,
    served: 2,
  };

  const sortByStatus = (items) =>
    [...items].sort(
      (a, b) =>
        STATUS_ORDER[a.status] -
        STATUS_ORDER[b.status]
    );

  const drinks = sortByStatus(
    order.filter((item) =>
      DRINK_CATEGORIES.includes(item.category)
    )
  );

  const food = sortByStatus(
    order.filter(
      (item) =>
        !DRINK_CATEGORIES.includes(item.category)
    )
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
            <Box key={item.orderItemId}>
              <ItemRow
                orderId={orderId}
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
            <Box key={item.orderItemId}>
              <ItemRow
                orderId={orderId}
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