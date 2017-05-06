import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      sku: ["", Validators.required],
    });
    console.log(this.myForm);

    this.sku = this.myForm.controls["sku"];

    this.sku.valueChanges.subscribe(() => {
      console.log("改变值了");
    })
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.myForm);

  }
}
