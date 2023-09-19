import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.http
      .get('/api/HttpTrigger')
      .subscribe((resp: any) => (this.message = resp.text));
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      licensePlate: ['', Validators.required],
      picture: [null, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.userForm.patchValue({
      picture: file,
    });
  }
}
