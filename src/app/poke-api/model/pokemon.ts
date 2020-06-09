import {Type} from "./type";
import {Sprites} from "./sprites";
import {Move} from "./move";

export class Pokemon {

  id: number;
  name: string;
  types: Type[];
  sprites: Sprites;
  moves: Move[];
}
