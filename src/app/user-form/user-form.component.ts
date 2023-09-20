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
  message = '';
  private currentToken: string = null;

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

  selectedFile: File = null;

  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.userForm.get('picture').setValue(base64String);
    };
  }

  onSubmit() {
    if (!this.currentToken) {
      console.log('No token available');
      this.message = 'there is no current token';
      return;
    }
    console.log('current token: ', this.currentToken);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentToken}`);

    // Your existing POST request

    const payload = {
      ...this.userForm.value,
      picture: this.selectedFile, // Assuming this is a base64 string
    };

    // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .post(
        'https://apibackendmartyannick.azurewebsites.net/api/v1/users',
        JSON.stringify(payload),
        {
          headers,
        }
      )
      .subscribe(
        (response: any) => {
          this.message = 'Successfully talked to backend';
          this.loggingService.logEvent('Nieuw persoon toegevoegd.');
          this.router.navigate(['/succespagina']);
        },
        (error) => {
          console.log('error, logging to events');
        }
      );
  }
}
