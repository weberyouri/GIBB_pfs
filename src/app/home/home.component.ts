import {Component, OnInit} from '@angular/core';
import {debounceTime, filter} from "rxjs/operators";
import {Subject} from "rxjs";
import {PokeApiService} from "../poke-api/poke-api.service";
import {Pokemon} from "../poke-api/model/pokemon";
import {Router} from "@angular/router";
import {FightService} from "../fight/fight.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm = new Subject<string>();
  searchResults: Pokemon[];

  currentSelection = '';

  opponentTeam: Pokemon[] = [];
  playerTeam: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService,
              private fightService: FightService,
              private router: Router) { }

  ngOnInit(): void {
    this.searchTerm.pipe(
      filter(term => term.length > 1),
      debounceTime(500),
    ).subscribe(term => this.search(term));
  }

  search(term: string): void {
    console.log('searching with term: ' + term);
    this.pokeApiService.findAllPokemonByName(term).subscribe(result => {
      this.searchResults = result;
      console.log(result);
    });
  }

  add(event) {
    this.currentSelection = event.option.value;
  }

  addToPlayer() {
    this.pokeApiService.findPokemonByName(this.currentSelection).subscribe(pokemon => this.playerTeam.push(pokemon));
    this.currentSelection = null;
  }

  addToOponnent() {
    this.pokeApiService.findPokemonByName(this.currentSelection).subscribe(pokemon => this.opponentTeam.push(pokemon));
    this.currentSelection = null;
  }

  removeFromPlayer(pokemon) {
    const index = this.playerTeam.indexOf(pokemon);
    this.playerTeam.splice(index, 1);
  }

  removeFromOponnent(pokemon) {
    const index = this.opponentTeam.indexOf(pokemon);
    this.opponentTeam.splice(index, 1);
  }

  canStart(): boolean {
    return this.playerTeam.length > 0 && this.opponentTeam.length > 0;
  }

  startFight() {
    this.fightService.playerTeam = this.playerTeam;
    this.fightService.opponentTeam = this.opponentTeam;
    this.router.navigate(['fight']);
  }
}
