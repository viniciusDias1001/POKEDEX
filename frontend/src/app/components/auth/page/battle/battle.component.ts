import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonGptService } from 'src/app/pokemonGpt.service';



@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {



  pokemons?: any[] = [];
  selectedPokemon1: any;
  selectedPokemon2: any;
  battleText: string = '';

  battleForm: FormGroup = new FormGroup({
    'pokemon1': new FormControl(null),
    'pokemon2': new FormControl(null)
  });

  constructor(private http: HttpClient, private pokekomService : PokemonGptService) { }

  ngOnInit(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=50').subscribe(data => {
      this.pokemons = data.results;
    });
  }

  generateBattle() {
    const selectedPokemon1 = this.battleForm.get('pokemon1')?.value;
    const selectedPokemon2 = this.battleForm.get('pokemon2')?.value;

    if (selectedPokemon1 && selectedPokemon2) {
      this.pokekomService.generateBattleDescription(selectedPokemon1.name, selectedPokemon2.name)
        .subscribe({
          next: (response) => {
            this.battleText = response.choices[0].text;
          },
          error: (err) => {
            console.error("Error fetching battle description:", err);
          }
        });
    }
  }
}
