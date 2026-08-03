import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function FavoriteList({
  products,
  onAddProduct,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        height: 420,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        ⭐ Producten
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {products ?? [].map((product) => (
          <Button
            key={product.id}
            fullWidth
            variant="contained"
            onClick={() => onAddProduct(product)}
            sx={{
              justifyContent: "space-between",
              textTransform: "none",
              height: 56,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            <span>{product.name}</span>
            <span>€ {product.price.toFixed(2)}</span>
          </Button>
        ))}
      </Box>
    </Paper>
  );
}