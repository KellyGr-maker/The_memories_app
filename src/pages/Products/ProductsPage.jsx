import {
  Container,
  Typography,
  Paper,
} from "@mui/material";

import AppLayout from "../../components/Layouts/AppLayout";

export default function ProductsPage() {
  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          📦 Producten
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          Productbeheer bouwen we hier.
        </Paper>
      </Container>
    </AppLayout>
  );
}