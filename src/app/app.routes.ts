import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
//////////////////////importacion de componente simple
import { LoginComponent } from './Components/pages/login/login.component';
import { ProductosComponent } from './Components/pages/home_page/productos.component';
////////////////////////////////////////////
export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path: '**', component: LoginComponent },
    {path: 'home', component: ProductosComponent }
];


@NgModule({
    //{useHash: true} esto añadirá un # a la ruta, que es un viejo truco de los navegadores para evitar que el navegador recargue la pagina.
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }