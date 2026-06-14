export const Tools = {
  // artisan's tools
  AlchemistSupplies: "alchemist",
  BrewersSupplies: "brewer",
  CaligraphersSupplies: "caligrapher",
  CarpentersSupplies: "carpenter",
  CartographersTools: "cartographer",
  CobblersTools: "cobbler",
  CookUtensils: "cook",
  GlassBlowersTools: "glassblower",
  JewelersTools: "jeweler",
  LeatherworkersTools: "leatherworker",
  MasonsTools: "mason",
  PaintersSupplies: "painter",
  PottersTools: "potter",
  SmithsTools: "smith",
  TinkersTools: "tinker",
  WeaversTools: "weaver",
  WoodcarversTools: "woodcarver",

  // gaming set
  ChessSet: "chess",
  DiceSet: "dice",
  PlayingCardsSets: "card",

  // musical instrument
  Bagpipes: "bagpipes",
  Drum: "drum",
  Dulcimer: "dulcimer",
  Flute: "flute",
  Horn: "horn",
  Lute: "lute",
  Lyre: "lyre",
  PanFlute: "panflute",
  Shawm: "shawn",
  Viol: "viol",

  // vehicles
  AirVehicle: "air",
  LandVehicle: "land",
  SpaceVehicle: "space",
  WaterVehicle: "water",

  // other
  DisguiseKit: "disg",
  ForgeryKit: "forg",
  Herbalism: "herb",
  NavigatorsTools: "navg",
  PoisonersKit: "pois",
  ThievesTools: "thief",
} as const;

export type Tool = keyof typeof Tools;

export type ToolValue = (typeof Tools)[Tool];
