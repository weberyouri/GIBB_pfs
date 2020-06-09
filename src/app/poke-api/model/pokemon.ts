import {Type} from "./type";
import {Sprites} from "./sprites";
import {Move} from "./move";

export class Pokemon {

  id: number;
  name: string;
  types: Type[];
  sprites: Sprites;
  moves: Move[];
  stats: Stat[];
}

export class Stat {
  base_stat: number;
  lvl_stat: number;
  current_stat: number;
  stat: {
    name: string;
  }
}
