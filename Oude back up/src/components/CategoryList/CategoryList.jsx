import {
  Paper,
  Stack,
  Button,
  Typography,
} from "@mui/material";

export default function CategoryList({
  categories,
  selectedCategory,
  onSelect,
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
        mb={2}
      >
        📂 Categorieën
      </Typography>

      <Stack spacing={1}>
        {categories.map((category) => (
          <Button
            key={category.id}
            fullWidth
            variant={
              selectedCategory === category.id
                ? "contained"
                : "outlined"
            }
            color={
              selectedCategory === category.id
                ? "primary"
                : "inherit"
            }
            onClick={() => onSelect(category.id)}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              height: 56,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {category.naam}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
}