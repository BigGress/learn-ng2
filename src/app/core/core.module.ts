import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserServiceService } from "./user-service.service";
import { AuthGuardService } from "./auth-guard.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: "user", useClass: UserServiceService},
    AuthGuardService,
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(`CoreModule 只能在AppModule注入`)
    }
  }
}
