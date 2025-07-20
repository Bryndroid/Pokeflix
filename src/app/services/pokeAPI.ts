import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Pokepeticion{
    private url: string;
    constructor(private _http: HttpClient){
        this.url = "https://pokeapi.co/api/v2/pokemon/"
  
    }
    getPokemons(value:number): Observable<Pokemon>{
     return this._http.get<Pokemon>(this.url + value).pipe(map((valor)=>{
      //Mapeo los valores que me va a dar esta api para ocuparlos ya formateados.
      //...valor por que quiero que lo demás este como siempre. pero height y weight lo convierto a  SI
      //+ para convertirlo todo a number, ya que toFixed devuelve una cadena de texto. (parse method)
      return {
        ...valor,
        height: +(valor.height*0.1).toFixed(1),
        weight: +(valor.weight*0.1).toFixed(1)
      }
     }));
    }
}