import {Injectable} from '@angular/core';
import {Pokemon} from "./model/pokemon";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {flatMap} from "rxjs/operators";
import {ListResponse} from "./model/list-response";

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private static readonly URL = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {
  }

  public findPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http.get<ListResponse>(PokeApiService.URL + 'pokemon').pipe(
      flatMap(references => {
          return forkJoin(references.results
            .filter(reference => reference.name.toLowerCase().startsWith(name.toLowerCase()))
            .map(reference => this.findOnePokemonByName(reference.name))
          )
        }
      )
    )
  }

  public findOnePokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(PokeApiService.URL + 'pokemon/' + name).pipe();
  }
}
