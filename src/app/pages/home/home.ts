import { Component, Input, OnInit, Output } from '@angular/core';
import { UtilService } from '../../services/util-service';
import { Pokepeticion } from '../../services/pokeAPI';
import { Pokemon } from '../../interfaces/pokemon';
//Para ngCLASS
//--Según, en Angular 20 ya no se necesita este import
import { BrowserModule } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
 public oyente1: boolean
 = false;
public Pokemons: Pokemon[];
private PokemonsTrue: Pokemon[];
public cargado: Boolean  =false;
private actual = 1;
private total = 1000;
private batchSize = 35;
private anterior: string  ="";
 constructor(private anchuraIf: UtilService, private prueba: Pokepeticion){
  this.Pokemons  =[];
  this.PokemonsTrue = [];
 }
 ngOnInit(): void {
    this.anchuraIf.booleanTest.subscribe(estado =>{
    this.oyente1 = estado;
   })
   this.cargarPokemon();
 }
 onClick(){
  this.cargarPokemon();
 }

 originalOrder(){
  //Para que no agarre la dirección de memoria del vector pokemonstrue
  this.Pokemons = [...this.PokemonsTrue];
 }
 tipoPokemon(tipo:string | null){
    let srTipo  = tipo?.toLowerCase().trim();
    this.Pokemons.forEach((valor, indice)=>{
     const tipo1 = valor.types[0]?.type?.name;
    const tipo2 = valor.types[1]?.type?.name;

    if (tipo1 === srTipo || tipo2 === srTipo) {
      //Le digo el indice desde dónde yo voy a empezar, cuantos elementos voy a seleccionar (ene este caso eliminar) y le colo corchetes a 0 para que me devuelva el string
      const elemento =  this.Pokemons.splice(indice,1)[0];
      this.Pokemons.splice(0,0,elemento);
    }
    })
  }
 cargarPokemon(){
  if(this.actual > this.total){
    this.cargado = true;
    return;
  }
  const requests = [];
    for (let i = this.actual; i <= this.actual   + this.batchSize && i<= this.total; i++) {
      requests.push(this.prueba.getPokemons(i));
    }
    //Ocupando forkjoin para cargar por lotes. Lo que hace forkjoin es esperar que se completen todas las peticiones y luego mandar todo enforma de array
    forkJoin(requests).subscribe({
      next: (respuestas) => {
        this.Pokemons.push(...respuestas);
        this.PokemonsTrue = [...this.Pokemons];
        //+1 Para evitar duplicados
        this.actual += (this.batchSize + 1);
      },
      error: (err) => {
        console.error('Error en lote:', err);
        this.cargado = true;
      }
    });
    //Si haces esto, haces que PokemonsTrue apunte a la misma referencia en memoria de Pokemons XD, asi que si cambia Pokemons, cambia este maje
     //this.PokemonsTrue = this.Pokemons;
  }
  gifPokemon(item: Pokemon){
    this.anterior = item.sprites.front_default;
    item.sprites.front_default = item.sprites.other.dream_world.front_default;
  }
  resetPokegif(item:Pokemon){
    item.sprites.front_default = this.anterior;
  }
 }


