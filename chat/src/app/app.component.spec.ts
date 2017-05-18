import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MessageService, UserService, DataService } from "../services";

import { AppComponent } from './app.component';
import { BarComponent } from "./components/chatBar/chatBar.component";
import { ChatUserComponent } from "./components/chatUser/chatUser.component";
import { ChatWindowComponent } from "./components/chatWindow/chatWindow.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BarComponent,
        ChatUserComponent,
        ChatWindowComponent,
      ],
      imports: [
        FormsModule,
        BrowserModule,
        HttpModule,
      ],
      providers: [
        MessageService,
        UserService,
        DataService,
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
