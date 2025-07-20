import { Component } from '@angular/core';
//Esto para ocupar los fontawesome
import{faUser, IconDefinition} from "@fortawesome/free-solid-svg-icons"
import{FontAwesomeModule} from"@fortawesome/angular-fontawesome"
import { UtilService } from '../../services/util-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public faUser: IconDefinition = faUser;
  private userName!: string;
  constructor( private obsUsuario: UtilService, private ruta:Router){
    obsUsuario.userTest.subscribe(
      valor =>{
        this.userName = valor;
      },
      error =>{
        this.userName = error;
        console.log(error);
      }
    )
  }

  get Usuario(){
    return this.userName;
  }
  cierreSesion(){
    this.ruta.navigateByUrl("/registro")
  }
  
}
