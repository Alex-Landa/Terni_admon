import { Routes } from '@angular/router';
import { LoginComponent } from './Components/pages/login/login.component';
import { LogsComponent } from './Components/pages/logs/logs.component';

export const routes: Routes = [
  { path: '**', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'estructura', component: LogsComponent },
  { path: 'empleados', component: LogsComponent },
  { path: 'reportes', component: LogsComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'permisos', component: LogsComponent },
];
