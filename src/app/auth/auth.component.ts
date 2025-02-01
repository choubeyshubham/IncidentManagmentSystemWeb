import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { IncidentService} from '../service/incident.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styles: [`
    .card { margin-top: 50px; }
    .nav-tabs .nav-link { cursor: pointer; }
  `]
})
export class AuthComponent {
  isLogin: boolean = true;

  loginForm: FormGroup;
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private router: Router  // Inject Router here
  ) {
    // Initialize Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Initialize Registration Form
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      pinCode: ['', Validators.required],
      city: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      password: ['', Validators.required]
    });
  }

  setMode(isLoginMode: boolean) {
    this.isLogin = isLoginMode;
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.incidentService.login(this.loginForm.value).subscribe({
        next: response => {
          alert('Login successful!');
          // Optionally, store the token if your API returns one
          // localStorage.setItem('userToken', response);
          // Redirect to incidents page:
          this.router.navigate(['/incidents']);
        },
        error: err => {
          console.error('Login error:', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    }
  }

  onRegistrationSubmit() {
    if (this.registrationForm.valid) {
      this.incidentService.registerUser(this.registrationForm.getRawValue()).subscribe({
        next: response => {
          alert('Registration successful!');
          this.setMode(true); // Switch to login mode after registration.
        },
        error: err => {
          console.error('Registration error:', err);
          alert('Registration failed. Please try again.');
        }
      });
    }
  }

  onPinCodeChange() {
    const pin = this.registrationForm.get('pinCode')?.value;
    if (pin) {
      this.incidentService.getLocation(pin).subscribe((location: any) => {
        this.registrationForm.patchValue({
          city: location.city,
          country: location.country
        });
      });
    }
  }
}
