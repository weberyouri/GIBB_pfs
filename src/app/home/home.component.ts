import { Component, OnInit } from '@angular/core';
import {debounceTime, filter} from "rxjs/operators";
import {Subject} from "rxjs";
import {PokeApiService} from "../poke-api/poke-api.service";
import {Pokemon} from "../poke-api/model/pokemon";
import {log} from "util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm = new Subject<string>();
  searchResults: Pokemon[];

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
}
