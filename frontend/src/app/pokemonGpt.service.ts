import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delayWhen, mergeMap, retryWhen } from 'rxjs/operators';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonGptService {
  private chatGPTUrl = 'https://api.openai.com/v1/engines/davinci-002/completions';
  private openAIKey = "sk-proj-aO10f3uRyHIl2EKTFnlhT3BlbkFJpA4FD2DohwvISSk30rv2"

  constructor(private http: HttpClient) { }

  generateBattleDescription(pokemon1: string, pokemon2: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.openAIKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      prompt: `Describe a Pokémon battle between ${pokemon1} and ${pokemon2}. Who wins and why?`,
      max_tokens: 150
    };

    return of(body).pipe(
      mergeMap(body => this.http.post(this.chatGPTUrl, body, { headers: headers }).pipe(
        retryWhen(errors => errors.pipe(
          mergeMap((error: HttpErrorResponse, i: number) => {
            if (error.status === 429 && i < 10) {
              return timer(i * 4000);
            }
            return throwError(error);
          })
        ))
      ))
    );
  }
}
