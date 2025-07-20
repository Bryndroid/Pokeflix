import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
//Para poder ocupar ngClass
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  public mostrarSidebar: boolean = false;
  mostrar(){
    this.mostrarSidebar = !this.mostrarSidebar;
    this.enviarData();
  }
  //ENtrada para que yo reciba información de otro componente
  @Input()
  data: string ="cacadura";
  //Ahora yo voy a mandar info :0
  //Da error si no se coloca any
  @Output() ocultoSidebar: EventEmitter<any> = new EventEmitter<any>();
  enviarData(){
    this.ocultoSidebar.emit(this.mostrarSidebar);
  }

  

}
