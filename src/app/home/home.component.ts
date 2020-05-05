import {Component, OnInit} from '@angular/core';
import {debounceTime, filter} from "rxjs/operators";
import {Subject} from "rxjs";
import {PokeApiService} from "../poke-api/poke-api.service";
import {Pokemon} from "../poke-api/model/pokemon";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm = new Subject<string>();
  searchResults: Pokemon[];

  currentSelection = '';

  opponent: Pokemon[] = [];
  player: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService) { }

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
    this.pokeApiService.findPokemonByName(this.currentSelection).subscribe(pokemon => this.player.push(pokemon));
    this.currentSelection = null;
  }

  addToOponnent() {
    this.pokeApiService.findPokemonByName(this.currentSelection).subscribe(pokemon => this.opponent.push(pokemon));
    this.currentSelection = null;
  }

  removeFromPlayer(pokemon) {
    const index = this.player.indexOf(pokemon);
    this.player.splice(index, 1);
  }

  removeFromOponnent(pokemon) {
    const index = this.opponent.indexOf(pokemon);
    this.opponent.splice(index, 1);
  }
}
