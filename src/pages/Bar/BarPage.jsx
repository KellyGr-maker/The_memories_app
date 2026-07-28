import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack
} from "@mui/material";

import AppLayout from "../../components/layouts/AppLayout";

export default function BarPage() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#D4AF37"
          mb={4}
        >
          🧾 ORDER
        </Typography>

        <Stack spacing={2}>

          <Card sx={{ bgcolor: "#232323", color: "white" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Tafel 1
              </Typography>

              <Typography>☕ 2 × Koffie</Typography>
              <Typography>🥤 1 × Cola</Typography>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
              >
                Klaar
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "#232323", color: "white" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Tafel 4
              </Typography>

              <Typography>🍺 2 × Jupiler</Typography>
              <Typography>🍷 1 × Witte wijn</Typography>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
              >
                Klaar
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "#232323", color: "white" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Terras 7
              </Typography>

              <Typography>🥤 3 × Cola Zero</Typography>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
              >
                Klaar
              </Button>
            </CardContent>
          </Card>

        </Stack>
      </Container>
    </AppLayout>
  );
}