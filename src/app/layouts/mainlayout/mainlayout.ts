import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Footer } from "../../components/footer/footer";
import { UtilService } from '../../services/util-service';
@Component({
  selector: 'app-mainlayout',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css'
})
export class Mainlayout {
 public data2: string ="Info mandada desde el main layout";
 public catch1: boolean =false;
 constructor( private sidebarTest:  UtilService){}
  ifSidebar(valor:boolean){
  this.sidebarTest.booleanValue(valor);
 }

}
