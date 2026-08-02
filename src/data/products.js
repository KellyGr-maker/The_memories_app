 const products = [

  // 🥤 Frisdranken
  { id: 1, name: "Coca Cola", category: "Frisdranken", price: 2.80 },
  { id: 2, name: "Coca Cola Zero", category: "Frisdranken", price: 2.80 },
  { id: 3, name: "Sprite", category: "Frisdranken", price: 2.80 },
  { id: 4, name: "Fanta Orange", category: "Frisdranken", price: 2.80 },
  { id: 5, name: "Fuze Tea Peach Hibiscus", category: "Frisdranken", price: 2.80 },
  { id: 6, name: "Royal Bliss Signature Tonic", category: "Frisdranken", price: 3.00 },
  { id: 7, name: "Royal Bliss Agrumes", category: "Frisdranken", price: 3.00 },
  { id: 8, name: "Ice Tea", category: "Frisdranken", price: 3.00 },
  { id: 9, name: "Gini", category: "Frisdranken", price: 3.00 },
  { id: 10, name: "Cécémel", category: "Frisdranken", price: 3.00 },
  { id: 11, name: "Red Bull", category: "Frisdranken", price: 3.50 },
  { id: 12, name: "Appletiser", category: "Frisdranken", price: 3.00 },

  // 💧 Waters
  { id: 13, name: "Chaudfontaine Still", category: "Waters", price: 2.80 },
  { id: 14, name: "Chaudfontaine Sparkling", category: "Waters", price: 2.80 },

  // 🧃 Fruitsappen
  { id: 15, name: "Looza ACE", category: "Fruitsappen", price: 3.00 },
  { id: 16, name: "Looza Orange", category: "Fruitsappen", price: 3.00 },
  { id: 17, name: "Looza Appel", category: "Fruitsappen", price: 3.00 },

  // 🍺 Bieren van 't vat
  { id: 18, name: "Sparta (Pils)", category: "Bieren van 't vat", price: 2.80 },
  { id: 19, name: "Augusteijn Blond", category: "Bieren van 't vat", price: 4.50 },

  // 🍾 Bieren op fles
  { id: 20, name: "Fourchette", category: "Bieren op fles", price: 5.50 },
  { id: 21, name: "Augustein Donker", category: "Bieren op fles", price: 4.50 },
  { id: 22, name: "Baptist Witbier", category: "Bieren op fles", price: 4.50 },
  { id: 23, name: "Bornem Tripel", category: "Bieren op fles", price: 4.50 },
  { id: 24, name: "Bornem Dubbel", category: "Bieren op fles", price: 4.50 },
  { id: 25, name: "Gentse Tripel", category: "Bieren op fles", price: 4.50 },
  { id: 26, name: "Gulden Draak Donker", category: "Bieren op fles", price: 5.50 },
  { id: 27, name: "Gulden Draak Quadruppel 9000", category: "Bieren op fles", price: 5.50 },
  { id: 28, name: "Gulden Draak Brewmaster", category: "Bieren op fles", price: 5.50 },
  { id: 29, name: "Kriek Lindemans", category: "Bieren op fles", price:  4.00},
  { id: 30, name: "Duvel", category: "Bieren op fles", price: 5.00 },
  { id: 31, name: "Orval", category: "Bieren op fles", price: 5.50 },
  { id: 32, name: "Leffe Blond", category: "Bieren op fles", price: 4.50 },
  { id: 33, name: "Leffe Donker", category: "Bieren op fles", price: 4.50 },
  { id: 35, name: "Carlsberg", category: "Bieren op fles", price: 2.80 },
  { id: 36, name: "Carlsberg 0%", category: "Bieren op fles", price: 2.80 },
  { id: 37, name: "Kriek Lindemans 0%", category: "Bieren op fles", price: 2.80 },

 // 🍻 Aperitieven
  { id: 38, name: "Epacho Oranje", category: "Aperitieven", price: 6.00 },
  { id: 39, name: "Epacho Rood", category: "Aperitieven", price: 6.00 },
  { id: 40, name: "Sherry", category: "Aperitieven", price: 4.50 },
  { id: 41, name: "Advocaat", category: "Aperitieven", price: 4.50 },
  { id: 42, name: "Witte Porto", category: "Aperitieven", price: 4.50 },
  { id: 43, name: "Rode Porto", category: "Aperitieven", price: 4.50 },
  { id: 44, name: "Pineau des Charentes", category: "Aperitieven", price: 5.00 },
  { id: 45, name: "Kir", category: "Aperitieven", price: 6.00 },
  { id: 46, name: "Kir Royal", category: "Aperitieven", price: 8.50 },
  { id: 47, name: "Ricard", category: "Aperitieven", price: 7.00 },
  { id: 48, name: "Campari orange", category: "Aperitieven", price: 8.00 },
  { id: 49, name: "Passoa orange", category: "Aperitieven", price: 8.00 },
  { id: 50, name: "Pisang orange", category: "Aperitieven", price: 8.00 },
  { id: 52, name: "Limoncello", category: "Aperitieven", price: 4.00 },

  // 🥃 Jenever
  { id: 53, name: "Citroen Jenever", category: "Jenever", price: 4.00 },
  { id: 54, name: "Vanille Jenever", category: "Jenever", price: 4.00 },
  { id: 55, name: "Oude Jenever", category: "Jenever", price: 4.00 },

  // 🥂 Sterke drank
  { id: 56, name: "Baileys", category: "Sterke drank", price: 5.50 },
  { id: 57, name: "Vodka wit", category: "Sterke drank", price: 5.00 },
  { id: 58, name: "Vodka rood", category: "Sterke drank", price: 5.00 },
  { id: 59, name: "Bacardi", category: "Sterke drank", price: 6.00 },
  { id: 60, name: "Disaronno Amaretto", category: "Sterke drank", price: 5.50 },
  { id: 61, name: "Cointreau", category: "Sterke drank", price: 5.50 },
  { id: 62, name: "Grand Marnier", category: "Sterke drank", price: 5.50 },
  { id: 63, name: "Cognac", category: "Sterke drank", price: 6.50 },
  { id: 64, name: "Bombay Gin", category: "Sterke drank", price: 7.00 },
  { id: 65, name: "Jagermaister", category: "Sterke drank", price: 4.50 },
 
  // 🧊 Mixers
  { id: 66, name: "Bombay Gin & Tonic", category: "Mixers", price: 9.00 },

  // 🥃 Whisky
  { id: 67, name: "Jack Daniel's", category: "Whisky", price: 6.50 },
  { id: 68, name: "Wiliam Lawson's", category: "Whisky", price: 6.00 },
  { id: 69, name: "Chivas 12Y Blended Scetch", category: "Whisky", price: 6.50 },
  { id: 70, name: "Glenfiddich 12Y single malt", category: "Whisky", price: 6.50 },
  { id: 71, name: "Glenmorangie 12Y single malt", category: "Whisky", price: 7.50 },
  { id: 72, name: "Laphroaig islay malt", category: "Whisky", price: 7.50 },
  { id: 73, name: "Degustatie bordje", category: "Whisky", price: 8.00 },

    // ☕ Koffie & Thee
  { id: 74, name: "Koffie", category: "Koffie & Thee", price: 2.80 },
  { id: 75, name: "Deca", category: "Koffie & Thee", price: 2.80 },
  { id: 76, name: "Espresso", category: "Koffie & Thee", price: 2.80 },
  { id: 77, name: "Cappucino", category: "Koffie & Thee", price: 3.00 },
  { id: 78, name: "Latte Macchiato", category: "Koffie & Thee", price: 3.20 },
  { id: 79, name: "Verwen koffie", category: "Koffie & Thee", price: 8.50 },
  { id: 80, name: "Thee", category: "Koffie & Thee", price: 2.80 },
  { id: 81, name: "Warme cécémel", category: "Koffie & Thee", price: 3.00 },
  { id: 82, name: "Warme cécémel met slagroom", category: "Koffie & Thee", price: 3.50 },
  { id: 83, name: "Minute soep", category: "Koffie & Thee", price: 3.00 },
  { id: 84, name: "Verse soep", category: "Koffie & Thee", price: 6.50 },
  { id: 85, name: "Oreo koffie", category: "Koffie & Thee", price: 5.00 },
  { id: 86, name: "Speculoos koffie", category: "Koffie & Thee", price: 5.00 },
  { id: 87, name: "Caramel koffie", category: "Koffie & Thee", price: 5.00 },
  { id: 88, name: "Chocolade koffie", category: "Koffie & Thee", price: 5.00 },

  // ☕🥃 Sterke koffies
  { id: 89, name: "Irish Coffee", category: "Koffie & Thee", price: 8.00 },
  { id: 90, name: "French Coffee", category: "Koffie & Thee", price: 8.00 },
  { id: 91, name: "Italian Coffee", category: "Koffie & Thee", price: 8.00 },
  { id: 92, name: "Spaanse Coffee", category: "Koffie & Thee", price: 8.00 },
  { id: 93, name: "Hasseltse Coffee", category: "Koffie & Thee", price: 8.00 },
  { id: 94, name: "Baileys Coffee", category: "Cocktails", price: 8.00 },
  { id: 95, name: "Memories Coffee", category: "Cocktails", price: 8.00 },

  // 🍸 Cocktails
  { id: 96, name: "Cocktail van het Huis", category: "Cocktails", price: 9.50 },
  { id: 97, name: "Aperol Spritz", category: "Cocktails", price: 10.00 },
  { id: 98, name: "Memories Cocktail", category: "Cocktails", price: 9.50 },
  { id: 100, name: "Epacho pearl", category: "Cocktails", price: 9.50 },
  { id: 101, name: "Mimosa", category: "Cocktails", price: 10.00 },

  // 🍹 Alcoholvrije cocktails
  { id: 102, name: "Pisang Orange Mocktail", category: "Alcoholvrije cocktails", price: 6.00 },
  { id: 103, name: "Virgin Moijto", category: "Alcoholvrije cocktails", price: 6.00 },
  { id: 104, name: "Tropical sunrise", category: "Alcoholvrije cocktails", price: 6.00 },
  { id: 105, name: "Aperol spritz 0%", category: "Alcoholvrije cocktails", price: 6.00 },

  // 🍷 Wijnen & Bubbels
  { id: 106, name: "Witte Wijn", category: "Wijnen & Bubbels", price: 4.50 },
  { id: 107, name: "Rosé Wijn", category: "Wijnen & Bubbels", price: 4.50 },
  { id: 108, name: "Picon Vin Blanc", category: "Wijnen & Bubbels", price: 6.50 },
  { id: 109, name: "Cava", category: "Wijnen & Bubbels", price: 7.00 },
  { id: 110, name: "Cava fles", category: "Wijnen & Bubbels", price: 25.00 },
  { id: 111, name: "Champagne fles", category: "Wijnen & Bubbels", price: 35.00 },


    // 🥨 Geniet momentjes
  { id: 112, name: "Portie Kaas", category: "Geniet momentjes", price: 8.00 },
  { id: 113, name: "Portie Salami", category: "Geniet momentjes", price: 8.00 },
  { id: 114, name: "Portie Kaas & Salami", category: "Geniet momentjes", price: 15.00 },
  { id: 115, name: "Portie Olijven", category: "Geniet momentjes", price: 3.70 },
  { id: 116, name: "Mix warme snacks 16st.", category: "Geniet momentjes", price: 16.00 },
  { id: 117, name: "Warme snacks Memories 16st.", category: "Geniet momentjes", price: 16.00 },
  { id: 118, name: "Bitterballen 10st.", category: "Geniet momentjes", price: 10.00 },
  { id: 119, name: "Mini loempia's 10st.", category: "Geniet momentjes", price: 10.00 },
  { id: 120, name: "Tapas plank", category: "Geniet momentjes", price: 16.00 },
  { id: 121, name: "Croque uit het vuistje", category: "Geniet momentjes", price: 4.50 },
  { id: 122, name: "Chips paprika", category: "Geniet momentjes", price: 2.50 },
  { id: 123, name: "Chips zout", category: "Geniet momentjes", price: 2.50 },

  // 🍰 Desserts
  { id: 124, name: "Dame Blanche", category: "Desserts", price: 8.50 },
  { id: 125, name: "Dame Noir", category: "Desserts", price: 8.50 },
  { id: 125, name: "Coupe Bresilienne", category: "Desserts", price: 8.50 },
  { id: 126, name: "Coupe Advocaat", category: "Desserts", price: 10.00 },
  { id: 127, name: "Kinderijsje 2bollen naar keuze", category: "Desserts", price: 4.00 },
  { id: 128, name: "Snoepjeswolk 2bollen naar keuze", category: "Desserts", price: 6.50 },
  { id: 129, name: "Pannenkoek suiker", category: "Desserts", price: 8.00 },
  { id: 130, name: "Pannenkoek Confituur", category: "Desserts", price: 9.00},
  { id: 131, name: "Pannenkoek Slagroom", category: "Desserts", price: 9.00},
  { id: 132, name: "Pannenkoek bolletjes ijs", category: "Desserts", price: 10.00 },
  { id: 133, name: "Pannenkoek bolletje ijs en slagroom", category: "Desserts", price: 11.00 },
  { id: 134, name: "Pannenkoek Nutella", category: "Desserts", price: 10.00 },
  { id: 135, name: "Pannenkoek Bueno", category: "Desserts", price: 12.00 },
  { id: 136, name: "Pannenkoek Fruit", category: "Desserts", price: 12.00 },
  { id: 137, name: "Wafel suiker", category: "Desserts", price: 8.00 },
  { id: 138, name: "Wafel Confituur", category: "Desserts", price: 9.00 },
  { id: 139, name: "Wafel Slagroom", category: "Desserts", price: 9.00 },
  { id: 140, name: "Wafel bolletjes ijs", category: "Desserts", price: 10.00 },
  { id: 141, name: "Wafel bolletje ijs en slagroom", category: "Desserts", price: 11.00 },
  { id: 142, name: "Wafel Nutella", category: "Desserts", price: 10.00 },
  { id: 143, name: "Wafel Bueno", category: "Desserts", price: 12.00 },
  { id: 144, name: "Wafel Fruit", category: "Desserts", price: 12.00 },
  { id: 145, name: "Stuk taart", category: "Desserts", price: 6.50 },
  { id: 146, name: "Stuk gebak", category: "Desserts", price: 5.50 },

  // 🥐 Ontbijt
  {id: 147, name: "Kinder Ontbijt ", category: "Ontbijt", price: 9.00 },
  {id: 148, name: "Klein Ontbijt", category: "Ontbijt", price: 15.00 },
  {id: 149, name: "Memories Ontbijt", category: "Ontbijt", price: 22.00 },
  {id: 150, name: "Luxe Ontbijt", category: "Ontbijt", price: 30.00 },
  {id: 151, name: "Toast Avocado", category: "Ontbijt", price: 14.00 },
  {id: 152, name: "Toast Gerookte Zalm", category: "Ontbijt", price: 14.00 },
  {id: 153, name: "Toast Nutella", category: "Ontbijt", price: 10.00 },
  {id: 154, name: "Roerei natuur", category: "Ontbijt", price: 10.00 },
  {id: 155, name: "Roerei Ham", category: "Ontbijt", price: 12.00 },
  {id: 156, name: "Roerei Zalm", category: "Ontbijt", price: 14.00 },
];

export default products;