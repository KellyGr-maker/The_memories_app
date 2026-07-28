import {
  Container,
  Typography,
  Paper,
} from "@mui/material";

import AppLayout from "../../components/layouts/AppLayout";

export default function CategoriesPage() {
  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          📂 Categorieën
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          Categoriebeheer bouwen we hier.
        </Paper>
      </Container>
    </AppLayout>
  );
}