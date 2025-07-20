import { Component, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import{ FormsModule, FormControl, ReactiveFormsModule, Validators} from "@angular/forms"
import { UtilService } from '../../services/util-service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  public name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]);
  public value2: string ="";
  public error: string = "";
  constructor(public ruta:  Router, public render:  Renderer2, private usuario: UtilService
  ) {
  
  }
   onClick(): void {
    const nombre = this.name.value;
     if(this.name.errors){
        if(this.name.errors["pattern"] || this.name.errors["minlength"])
        {
          this.error = "Por favor ingresa un nombre válido"; return;
        }
        if(this.name.errors["required"]){
          this.error = "¡Queremos saber como te llamaremos!"; return;
        }
        //Por que el tipado es string o null
    }else if(nombre != null){
      this.usuario.usuarioValue(nombre);
    this.ruta.navigateByUrl('/Pokecasa')
    }

  }
}
