// frontend/src/app/incident.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials, { responseType: 'text' });
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, data, { responseType: 'text' });
  }

  // This method could either call a backend endpoint that uses an external API or be handled on the client side.
  getLocation(pinCode: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/location/${pinCode}`);
  }

  createIncident(incident: any, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/incidents?userId=${userId}`, incident);
  }

  updateIncident(incidentId: number, incident: any, userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/incidents/${incidentId}?userId=${userId}`, incident);
  }

  searchIncident(incidentId: string, userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/incidents/search?incidentId=${incidentId}&userId=${userId}`);
  }

  getUserIncidents(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/incidents?userId=${userId}`);
  }
}
