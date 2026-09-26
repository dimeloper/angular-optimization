import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsOptimizedPageComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonStore } from '../../stores/pokemon-store';
import { vi } from 'vitest';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

  it('should call fetchAndCachePokemonDetails when route param is set', async () => {
    // Triggers a new emission of route parameters (e.g., { name: 'pikachu' })
    params$.next({ name: 'pikachu' });

    // Let zoneless change detection flush the toSignal(...) update and the effect()
    await fixture.whenStable();

    expect(mockStore.fetchAndCachePokemonDetails).toHaveBeenCalledWith(
      'pikachu'
    );
  });
});
