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
              height: {
                  xs: 48,
                  md: 56,
              },
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: {
                xs: 13,
                md: 15,
              },
            }}
          >
            {{
  "Frisdranken": "🥤 Fris",
  "Waters": "💧 Water",
  "Fruitsappen": "🧃 Sap",
  "Bieren van 't vat": "🍺 Vat",
  "Bieren op fles": "🍾 Fles",
  "Aperitieven": "🥃 Apero",
  "Sterke dranken": "🥃 Sterk",
  "Whisky": "🥃 Whisky",
  "Mixers": "🥤 Mix",
  "Cocktails": "🍸 Cockt.",
  "Alcoholvrije cocktails": "🍹 0%",
  "Wijnen & Bubbels": "🍷 Wijn",
}[category.naam] || category.naam}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
}