import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loggingService: LoggingService
  ) {
    this.http
      .get('/api/HttpTrigger')
      .subscribe((resp: any) => (this.message = resp.text));
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      licensePlate: ['', Validators.required],
      // picture: [null, Validators.required],
    });
  }

  onSubmit() {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${jouwTokenHier}`
    // );
    console.log('test', this.userForm.value);
    this.http
      // .post('/api/HttpTrigger', this.userForm.value, { headers })
      .post('/api/HttpTrigger', this.userForm.value)
      .subscribe(
        (response: any) => {
          //log success
          this.loggingService.logEvent("Nieuw persoon toegevoegd.");
          // Ga naar de succespagina of toon een succesmelding
          this.router.navigate(['/succespagina']);
        },
        (error) => {
          //log event
          console.log("error, logging to events");

        }
      );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.userForm.patchValue({
      picture: file,
    });
  }
}
