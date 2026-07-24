import {
  Stack,
  Button,
  Paper,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export default function OrderActions({
  onSave,
  onMove,
  onMerge,
  onSplit,
  onClear,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        mt: 2,
      }}
    >
      <Stack spacing={2}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={onSave}
          sx={{
            height: 60,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Bestelling opslaan
        </Button>

        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<SwapHorizIcon />}
          onClick={onMove}
          sx={{
            height: 60,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Verplaatsen
        </Button>

        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<SwapHorizIcon />}
          onClick={onMerge}
          sx={{
            height: 60,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Samenvoegen
        </Button>

        <Button
          fullWidth
          size="large"
          variant="contained"
          color="warning"
          startIcon={<CallSplitIcon />}
          onClick={onSplit}
          sx={{
            height: 60,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Splitsen
        </Button>

        <Button
          fullWidth
          size="large"
          variant="contained"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={onClear}
          sx={{
            height: 60,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Tafel leegmaken
        </Button>
      </Stack>
    </Paper>
  );
}