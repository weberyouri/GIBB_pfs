import { Injectable } from '@angular/core';
import {Pokemon} from "../poke-api/model/pokemon";

@Injectable({
  providedIn: 'root'
})
export class FightService {

  public playerTeam: Pokemon[] = [];
  public opponentTeam: Pokemon[] = [];

  constructor() { }

}
