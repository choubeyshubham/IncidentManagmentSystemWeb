import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">Incident Management</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active">Login/Signup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/forgot-password" routerLinkActive="active">Forgot Password</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/incidents" routerLinkActive="active">Incidents</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent { }
