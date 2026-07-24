import {
  Paper,
  Grid,
  Button,
  Typography,
} from "@mui/material";

export default function ProductList({
  products,
  onAddProduct,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => onAddProduct(product)}
              sx={{
                height: 90,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              <Typography
                fontWeight="bold"
                fontSize={18}
              >
                {product.name}
              </Typography>

              <Typography
                fontSize={15}
                sx={{ opacity: 0.9 }}
              >
                € {product.price.toFixed(2)}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}