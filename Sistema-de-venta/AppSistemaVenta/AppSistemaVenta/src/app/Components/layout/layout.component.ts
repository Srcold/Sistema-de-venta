import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';

import { MenuService } from 'src/app/Services/menu.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  listaMenus:Menu[] = [];
  correoUsuario:string = '';
  rolUsuario:string = '';
  // darkMode: boolean = false;
  // toggleDarkMode(): void {
  //   this.darkMode = !this.darkMode;
  //   const body = document.querySelector('body');
  //   body!.classList.toggle('dark-mode', this.darkMode);
  // }







  constructor(
    private router:Router,
    private _menuServicio : MenuService,
    private _utilidadServicio: UtilidadService,

  ) { }

  ngOnInit(): void {


    const usuario = this._utilidadServicio.obtenerSesionUsuario();


    if(usuario != null){

      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;


      this._menuServicio.lista(usuario.idUsuario).subscribe({
        next: (data) =>{
          if(data.status) this.listaMenus = data.value;
        },
        error:(e)=>{}
      })

    }

  }



  cerrarSesion(){
    Swal.fire({
      title: '¿Está seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Volver a la app',
      background: '#000000',
      color: '#ffffff',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__bounceOut'
      }

    }).then((result) => {
      if (result.isConfirmed) {
        this._utilidadServicio.eliminarSesionUsuario();
        this.router.navigate(['login']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          this._utilidadServicio.mostrarAlerta("Operación cancelada", "Información")
      }
    })




  }




}
