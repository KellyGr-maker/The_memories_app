import {
  Container,
  Typography,
  Paper,
} from "@mui/material";

import AppLayout from "../../components/layouts/AppLayout";

export default function FavoritesPage() {
  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          ⭐ Favorieten
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          Favorietenbeheer bouwen we hier.
        </Paper>
      </Container>
    </AppLayout>
  );
}