import {
  Container,
  Typography,
  Paper,
} from "@mui/material";

import AppLayout from "../../components/Layouts/AppLayout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          ⚙️ Instellingen
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          Instellingen bouwen we hier.
        </Paper>
      </Container>
    </AppLayout>
  );
}