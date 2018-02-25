import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../material.module';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../auth/auth.service';
import { CoursesService } from '../service/courses.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    const authServiceStub = {
      currentUserObservable: null
    };

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: CoursesService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
