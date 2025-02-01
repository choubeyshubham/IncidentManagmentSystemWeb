import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidentService} from '../service/incident.service';

@Component({
  selector: 'app-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './incident.component.html',
  styles: [`
    .card { margin-top: 20px; }
    table { margin-top: 20px; }
  `]
})
export class IncidentComponent implements OnInit {
  incidentForm: FormGroup;
  incidents: any[] = [];
  // For demonstration, we simulate a logged-in user's ID.
  userId: number = 1;
  editing: boolean = false;
  currentIncidentId: number | null = null;

  constructor(private fb: FormBuilder, private incidentService: IncidentService) {
    this.incidentForm = this.fb.group({
      reporterName: ['', Validators.required],
      incidentDetails: ['', Validators.required],
      priority: ['MEDIUM', Validators.required],
      status: ['OPEN', Validators.required]
    });
  }

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidentService.getUserIncidents(this.userId).subscribe(data => {
      this.incidents = data;
    });
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      if (this.editing && this.currentIncidentId !== null) {
        this.incidentService.updateIncident(this.currentIncidentId, this.incidentForm.value, this.userId)
          .subscribe(response => {
            alert('Incident updated successfully!');
            this.resetForm();
            this.loadIncidents();
          });
      } else {
        this.incidentService.createIncident(this.incidentForm.value, this.userId)
          .subscribe(response => {
            alert('Incident created successfully! Incident ID: ' + response.incidentId);
            this.resetForm();
            this.loadIncidents();
          });
      }
    }
  }

  editIncident(incident: any) {
    if (incident.status === 'CLOSED') {
      alert('Cannot edit a closed incident.');
      return;
    }
    this.editing = true;
    this.currentIncidentId = incident.id;
    this.incidentForm.patchValue(incident);
  }

  resetForm() {
    this.editing = false;
    this.currentIncidentId = null;
    this.incidentForm.reset({
      reporterName: '',
      incidentDetails: '',
      priority: 'MEDIUM',
      status: 'OPEN'
    });
  }

  searchIncident(searchId: string) {
    if (!searchId) {
      this.loadIncidents();
      return;
    }
    this.incidentService.searchIncident(searchId, this.userId).subscribe(response => {
      this.incidents = [response];
    }, error => {
      alert('Incident not found.');
    });
  }
}
