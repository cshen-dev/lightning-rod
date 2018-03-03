import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MaterialModule } from '../../material';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from './header.component';
import { appRoutes } from '../../app.routes';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    const authServiceStub = {
      currentUserObservable: null
    };

    class RouterStub {
      navigate() { return; }
    }

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
