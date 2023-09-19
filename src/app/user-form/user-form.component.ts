import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-user-form-conmponent',
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
    // this.http
    //   .get('/api/HttpTrigger')
    //   .subscribe((resp: any) => (this.message = resp.text));
  }

  ngOnInit(): void {
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
    const payload = {
      ...this.userForm.value,
      picture: this.selectedFile, // Assuming this is a base64 string
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

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
