import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../poke-api/model/pokemon";
import {FightService} from "./fight.service";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {

  playerTeam: Pokemon[];

  opponentTeam: Pokemon[];

  currentPlayerPokemon: Pokemon;
  currentOpponentPokemon: Pokemon;

  playerTurn: true;

  constructor(private fightService: FightService) { }

  ngOnInit(): void {
    this.initPokemon();
    this.initPlayerTurn();
  }

  private initPokemon() {
    this.playerTeam = this.fightService.playerTeam;
    this.opponentTeam = this.fightService.opponentTeam;

    this.currentPlayerPokemon = this.playerTeam[0];
    this.currentOpponentPokemon= this.opponentTeam[0];
  }

  private initPlayerTurn() {
    this.playerTurn = true;
  }

}
