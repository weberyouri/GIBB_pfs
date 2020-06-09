import {Type} from "./type";

export class Move {
  id: number;
  name: string;
  power: number;
  accuracy: number;
  pp: number;
  type: Type;
  damage_class: {
    name: string;
  }
}
