import { Component, OnInit, Inject, ViewChild, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MdlDialogReference, MdlTextFieldComponent } from "angular2-mdl";

import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  @ViewChild("firstEl") private inputElement: MdlTextFieldComponent;
  public form: FormGroup;
  public processingRegister: boolean = false;
  public statusMessage: any = "";
  private subscription: Subscription;

  constructor(
    private dialog: MdlDialogReference,
    private fb: FormBuilder,
    private router: Router,
    @Inject("auth") private authService
  ) {
    this.form = fb.group({
      'username':  new FormControl('',  Validators.required),
      'passwords': fb.group({
        'password': new FormControl('', Validators.required),
        'repeatPassword': new FormControl('', Validators.required)
      },{validator: this.passwordMatchValidator})
    });

    this.dialog.onHide().subscribe((auth) => {
      console.log("hide");
      console.log(auth);
    });

    this.dialog.onVisible().subscribe(() => {
      this.inputElement.setFocus();
    })
  }

  ngOnInit() {
  }

  passwordMatchValidator(group: FormGroup) {
    let password = group.get("password").value;
    let confirm = group.get("repeatPassword").value;

    if (password.pristine || confirm.pristine) {
      return null
    }
    if (password === confirm) {
      return null
    }
    return {'mismatch': true};
  }

  public register() {
    this.processingRegister = true;
    this.statusMessage = "注册中...";
    this.subscription = this.authService.register(
      this.form.get("username").value,
      this.form.get("passwords").get("password").value
    )
    .subscribe(auth => {
      this.processingRegister = false;
      this.statusMessage = "注册成功,登陆中...";
      setTimeout(() => {
        this.dialog.hide(auth);
        this.router.navigate(["todo"]);
      })
    }, err => {
      this.processingRegister = false;
      this.statusMessage = err.message;
    })
  }

  // @HostBinding("keydown.esc")
  // public onEsc() {
  //   if (this.subscription !== undefined) {
  //     this.subscription.unsubscribe()
  //   }
  //   this.dialog.hide();
  // }
}
