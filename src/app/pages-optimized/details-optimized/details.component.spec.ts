import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsOptimizedPageComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonStore } from '../../stores/pokemon-store';
import { vi } from 'vitest';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

describe('DetailsOptimizedPageComponent', () => {
  let component: DetailsOptimizedPageComponent;
  let fixture: ComponentFixture<DetailsOptimizedPageComponent>;
  let mockStore: {
    fetchAndCachePokemonDetails: ReturnType<typeof vi.fn>;
    pokemonDetailsMap: ReturnType<typeof vi.fn>;
  };
  let params$: BehaviorSubject<any>;

  beforeEach(async () => {
    params$ = new BehaviorSubject({});

    mockStore = {
      fetchAndCachePokemonDetails: vi.fn().mockResolvedValue({
        name: 'pikachu',
        id: 'pikachu',
        height: 4,
        weight: 60,
        sprites: { front_default: 'pikachu.png' },
      }),
      pokemonDetailsMap: vi.fn().mockReturnValue({}),
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DetailsOptimizedPageComponent,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PokemonStore, useValue: mockStore },
        {
          provide: ActivatedRoute,
          useValue: { params: params$.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsOptimizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchAndCachePokemonDetails when route param is set', fakeAsync(() => {
    // Triggers a new emission of route parameters (e.g., { name: 'pikachu' })
    params$.next({ name: 'pikachu' });

    // Run change detection again to ensure the component picks up the new route params
    // This allows the toSignal(...) inside the component to update with the latest value
    fixture.detectChanges();

    // Advance Angular's internal timers to flush signal reactions and effect() calls
    // This ensures the effect that calls fetchAndCachePokemonDetails runs synchronously in the test
    tick();

    expect(mockStore.fetchAndCachePokemonDetails).toHaveBeenCalledWith(
      'pikachu'
    );
  }));
});
