import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-form-sku',
  templateUrl: './form-sku.component.html',
  styleUrls: ['./form-sku.component.css']
})
export class FormSkuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submit(form: FormGroup) {
    console.log(form);


  }
}
