import { EventEmitter, OnInit, Output, Component,  ViewChild, ElementRef } from '@angular/core';
import { PokeApiService } from '../../../../poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('pokemonTheme') pokemonTheme!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioButton') audioButton!: ElementRef<HTMLButtonElement>;

  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) { }

  isPlaying: boolean = false;

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public search(value: string){
    this.emmitSearch.emit(value);
  }


  public getSearch(value: string){
    const filter = this.setAllPokemons.filter( (res: any ) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }


  toggleAudio() {
    const audio = this.pokemonTheme.nativeElement;
    const button = this.audioButton.nativeElement;

    if (this.isPlaying) {
      audio.pause();
      audio.onpause = () => {
        button.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Change to volume up icon
        this.isPlaying = false;
      };
    } else {
      audio.play().then(() => {
        button.innerHTML = '<i class="fas fa-volume-up"></i>'; // Change to mute icon
        this.isPlaying = true;
      }).catch(error => console.error('Error playing audio:', error));
    }
  }
}



