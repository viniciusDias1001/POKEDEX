import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';

//Observable
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
 
  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons():Observable<any>{
    return this.http.get<any>(this.url).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map( (resPokemons: any) => {

          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );

        })
      })
    )
  }

  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      switchMap(pokemon => this.http.get<any>(pokemon.species.url).pipe(
        map(species => ({
          ...pokemon,
          species: species,
          description: species.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text.replace(/[\n\f]/g, ' '),
        }))
      ))
    )
  }
}
