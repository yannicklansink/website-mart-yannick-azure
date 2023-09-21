import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggingService } from '../services/logging.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-form-conmponent',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  analysisPicture = '';
  autoMerk = '';
  private currentToken: string = null;
  selectedFile: File = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loggingService: LoggingService,
    private authService: AuthServiceService
  ) {
    // this.http
    //   .get('/api/HttpTrigger')
    //   .subscribe((resp: any) => (this.message = resp.text));
  }

  ngOnInit(): void {
    this.authService.currentAccessToken.subscribe((token) => {
      if (token) {
        this.currentToken = token;
      }
    });
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      licensePlate: [''],
    });
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    // if (!this.currentToken) {
    //   console.log('No token available');
    //   this.message = 'there is no current token';
    //   return;
    // }
    console.log('current token: ', this.currentToken);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentToken}`);

    // Your existing POST request

    const formData = new FormData();
    formData.append('firstName', this.userForm.get('firstName').value);
    formData.append('lastName', this.userForm.get('lastName').value);
    formData.append('licensePlate', this.userForm.get('licensePlate').value);
    if (this.selectedFile != null) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

    // = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .post(
        'https://apibackendmartyannick.azurewebsites.net/api/v1/users',
        // 'https://localhost:7056/api/v1/users',
        // 'https://localhost:2469/api/v1/users',
        // JSON.stringify(payload),
        formData
        // {
        //   headers,
        // }
      )
      .subscribe(
        (response: any) => {
          this.analysisPicture = response.analysis;
          this.autoMerk = response.autoMerk;
          console.log(this.analysisPicture);
          this.loggingService.logEvent(this.analysisPicture);
          this.loggingService.logEvent('Nieuw persoon toegevoegd.');
          this.router.navigate(['/succespagina'], {
            queryParams: {
              analysisPicture: this.analysisPicture,
              autoMerk: this.autoMerk,
            },
          });
        },
        (error) => {
          console.log('error, logging to events');
        }
      );
  }
}
