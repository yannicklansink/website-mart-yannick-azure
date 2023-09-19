import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router
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
    const formData = new FormData();
    formData.append('firstName', this.userForm.get('firstName').value);
    formData.append('lastName', this.userForm.get('lastName').value);
    formData.append('licensePlate', this.userForm.get('licensePlate').value);
    formData.append('picture', this.selectedFile);

    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${jouwTokenHier}`
    // );
    console.log('test', this.userForm.value);
    this.http
      // .post('/api/HttpTrigger', this.userForm.value, { headers })
      .post('/api/HttpTrigger', formData)
      .subscribe(
        (response: any) => {
          // Ga naar de succespagina of toon een succesmelding
          this.router.navigate(['/succespagina']);
        },
        (error) => {
          // Foutafhandeling
        }
      );
  }
}
