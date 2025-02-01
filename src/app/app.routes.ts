import { Routes } from '@angular/router';
import { AuthComponent} from './auth/auth.component';
import { ForgotPasswordComponent} from './forget-password/forget-password.component';
import { IncidentComponent} from './incident/incident.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'incidents', component: IncidentComponent },
  { path: '**', redirectTo: '' }
];
