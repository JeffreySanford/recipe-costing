import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { ActivatedRoute } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
  const fixture = TestBed.createComponent((window as any).App || require('./app').App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title "costing-frontend"', () => {
  const fixture = TestBed.createComponent((window as any).App || require('./app').App);
    const app = fixture.componentInstance;
    expect((app as any).title).toBe('costing-frontend');
  });
});
