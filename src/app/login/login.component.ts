import {
  Component,
  Inject,
  trigger,
  state,
  style,
  transition,
  animate,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from "@angular/router";
import { MdlDialogService, MdlDialogReference } from "angular2-mdl";

import { Observable } from "rxjs/Rx";

import { BingImageService } from "./image.service";
import { RegisterDialogComponent } from "./register-dialog/register-dialog.component";

// import { AuthService } from "../service/auth/auth.service";
import { Auth } from "../domain/entities";

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styles: [`
    input.ng-invalid {
      border-color: red;
    }
    input.ng-valid {
      border-color: green;
    }
    section.mdl-grid {
      height: calc(100vh - 64px);
    }

    form {
      background: rgba(255, 255, 255, .4);
      padding: 10px;
    }
  `],
  providers: [BingImageService],
  animations: [
    trigger("loginState", [
      state("inactive", style({
        transform: "scale(1)"
      })),
      state("active", style({
        transform: "scale(1.1)"
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  photo: string;
  slides: any[] = [];

  username: string = undefined;
  password: string = undefined;
  nametest: string = undefined;

  auth: Auth;

  subscription;

  loginBtnState: string;

  constructor(
   @Inject("auth") private service,
   private router: Router,
   private imgService: BingImageService,
   private dialogService: MdlDialogService
  ) {
    console.log`123`
  }

  ngOnInit() {
    this.imgService.getImageUrl().subscribe(e => {
      console.log(e);
      this.slides = e;
      this.rotateImages(this.slides);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  rotateImages(arr: any[]) {
    const len = arr.length;
    this.subscription = Observable.interval(4000).subscribe(e => {
      this.photo = arr[(e + 1) % len].contentUrl;
    })
  }

  onSubmit(value, obj) {
    console.log(value);
    console.log(obj);
    this.service.loginWithCre(this.username,this.password)
        .subscribe(auth => {
          this.auth = Object.assign({}, auth);
          if(!auth.hasError){
            this.router.navigate(['todo']);
          }
        })
  }

  toggleBtnState(isState: boolean) {
    this.loginBtnState = isState ? "active" : "inactive"
  }


  register($event: MouseEvent){
    $event.stopPropagation();
    $event.preventDefault();

    let pDialog = this.dialogService.showCustomDialog({
      component: RegisterDialogComponent,
      isModal: true,
      styles: {'width': '350px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
    });
    pDialog.map( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });

  }
}
