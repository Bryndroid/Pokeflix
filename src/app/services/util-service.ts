import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private booleanObs: BehaviorSubject<boolean>
  private userObs: BehaviorSubject<string>
  constructor() { 
    this.booleanObs = new BehaviorSubject<boolean>(false);
    this.userObs = new BehaviorSubject<string>("DefaultUser");
  }
  get booleanTest(){
    //Lo retorno como observable, para que se puedan subscribir a esta vaina y asi obtener la información ya actualizada
    return this.booleanObs.asObservable();
  }
  get userTest(){
    return this.userObs.asObservable();
  }
  booleanValue(value1: boolean){
    this.booleanObs.next(value1);
  }
  usuarioValue(value1:string){
    this.userObs.next(value1);
  }
}
