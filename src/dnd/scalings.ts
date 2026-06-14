import { Abilities, type Ability } from "./abilities.ts";
import { Skills, type Skill } from "./skills.ts";
import { Tools, type Tool } from "./tools.ts";

export const Scalings: Record<
  (typeof Abilities)[Ability] | (typeof Skills)[Skill] | (typeof Tools)[Tool],
  (typeof Abilities)[Ability]
> = {
  // ------------------------
  // Ability Checks
  // ------------------------
  [Abilities.Strenght]: Abilities.Strenght,
  [Abilities.Dexterity]: Abilities.Dexterity,
  [Abilities.Constitution]: Abilities.Constitution,
  [Abilities.Intelligence]: Abilities.Intelligence,
  [Abilities.Charisma]: Abilities.Charisma,
  [Abilities.Wisdom]: Abilities.Wisdom,
  // ------------------------
  // Skills
  // ------------------------
  [Skills.Acrobatics]: Abilities.Dexterity,
  [Skills.AnimalHandling]: Abilities.Wisdom,
  [Skills.Arcana]: Abilities.Intelligence,
  [Skills.Athletics]: Abilities.Strenght,
  [Skills.Deception]: Abilities.Charisma,
  [Skills.History]: Abilities.Intelligence,
  [Skills.Insight]: Abilities.Wisdom,
  [Skills.Intimidation]: Abilities.Charisma,
  [Skills.Investigation]: Abilities.Intelligence,
  [Skills.Medicine]: Abilities.Wisdom,
  [Skills.Nature]: Abilities.Intelligence,
  [Skills.Perception]: Abilities.Wisdom,
  [Skills.Persuasion]: Abilities.Charisma,
  [Skills.Performance]: Abilities.Charisma,
  [Skills.Religion]: Abilities.Wisdom,
  [Skills.SleightOfHand]: Abilities.Dexterity,
  [Skills.Stealth]: Abilities.Dexterity,
  [Skills.Survival]: Abilities.Wisdom,
  // ------------------------
  // Tools
  // ------------------------
  // Artisan's Tools
  [Tools.AlchemistSupplies]: Abilities.Intelligence,
  [Tools.BrewersSupplies]: Abilities.Intelligence,
  [Tools.CaligraphersSupplies]: Abilities.Dexterity,
  [Tools.CarpentersSupplies]: Abilities.Strenght,
  [Tools.CartographersTools]: Abilities.Wisdom,
  [Tools.CobblersTools]: Abilities.Dexterity,
  [Tools.CookUtensils]: Abilities.Wisdom,
  [Tools.GlassBlowersTools]: Abilities.Intelligence,
  [Tools.JewelersTools]: Abilities.Intelligence,
  [Tools.LeatherworkersTools]: Abilities.Dexterity,
  [Tools.MasonsTools]: Abilities.Strenght,
  [Tools.PaintersSupplies]: Abilities.Wisdom,
  [Tools.PottersTools]: Abilities.Intelligence,
  [Tools.SmithsTools]: Abilities.Strenght,
  [Tools.TinkersTools]: Abilities.Dexterity,
  [Tools.WeaversTools]: Abilities.Dexterity,
  [Tools.WoodcarversTools]: Abilities.Dexterity,
  // Gaming set
  [Tools.ChessSet]: Abilities.Wisdom,
  [Tools.DiceSet]: Abilities.Wisdom,
  [Tools.PlayingCardsSets]: Abilities.Wisdom,
  // Musical instrument
  [Tools.Bagpipes]: Abilities.Charisma,
  [Tools.Drum]: Abilities.Charisma,
  [Tools.Dulcimer]: Abilities.Charisma,
  [Tools.Flute]: Abilities.Charisma,
  [Tools.Horn]: Abilities.Charisma,
  [Tools.Lute]: Abilities.Charisma,
  [Tools.Lyre]: Abilities.Charisma,
  [Tools.PanFlute]: Abilities.Charisma,
  [Tools.Shawm]: Abilities.Charisma,
  [Tools.Viol]: Abilities.Charisma,
  // Vehicles
  [Tools.AirVehicle]: Abilities.Intelligence,
  [Tools.LandVehicle]: Abilities.Intelligence,
  [Tools.SpaceVehicle]: Abilities.Intelligence,
  [Tools.WaterVehicle]: Abilities.Intelligence,
  // Other
  [Tools.DisguiseKit]: Abilities.Charisma,
  [Tools.ForgeryKit]: Abilities.Dexterity,
  [Tools.Herbalism]: Abilities.Intelligence,
  [Tools.NavigatorsTools]: Abilities.Wisdom,
  [Tools.PoisonersKit]: Abilities.Intelligence,
  [Tools.ThievesTools]: Abilities.Dexterity,
} as const;
