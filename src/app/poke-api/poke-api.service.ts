import {Injectable} from '@angular/core';
import {Pokemon} from "./model/pokemon";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {filter, flatMap, map, mergeMap} from "rxjs/operators";
import {ListResponse} from "./model/list-response";
import {Move} from "./model/move";

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private static readonly URL = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {
  }

  public findAllPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http.get<ListResponse>(PokeApiService.URL + 'pokemon?limit=1000').pipe(
      flatMap(references => {
          return forkJoin(references.results
            .filter(reference => reference.name.toLowerCase().startsWith(name.toLowerCase()))
            .map(reference => this.findPokemonByName(reference.name))
          )
        }
      )
    )
  }

  public findPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get(PokeApiService.URL + 'pokemon/' + name).pipe(
      mergeMap((pokemon: any) => {
        return forkJoin({
          types: forkJoin(pokemon.types.map((type) => this.getTypeByName(type.type.name))),
          moves: forkJoin(pokemon.moves.map((move) => this.getMoveByName(move.move.name)))
        })
      }, (pokemon, result) => {
        pokemon.types = result.types;
        pokemon.moves = result.moves;
        return pokemon;
      })
    )
  }

  public getMoveByName(name: string): Observable<Move> {
    return this.http.get<Move>(PokeApiService.URL + 'move/' + name);
  }


  private getTypeByName(name: string) {
    return this.http.get(PokeApiService.URL + 'type/' + name);
  }

}
