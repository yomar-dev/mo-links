import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  linksForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.linksForm = this.formBuilder.group({
      url: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  registerLink() {
    const { url, name } = this.linksForm.value;
    console.log(url, name);
  }
}
