import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { PokedexComponent } from './pokedex.component';
import { PokemonService } from '../../services/pokemon.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

// Create Mock Components
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  template: '<div>Mock Pokemon List</div>',
})
class MockPokemonListComponent {}

@Component({
  selector: 'app-form',
  standalone: true,
  template: '<div>Mock Form</div>',
})
class MockFormComponent {}

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let mockPokemonService: {
    updateListParams: ReturnType<typeof vi.fn>;
    pokemonListWithDetails: ReturnType<typeof of<never>>;
  };

  const mockBreakpointObserver = {
    observe: vi.fn().mockReturnValue(of({ matches: false, breakpoints: {} })),
  };

  const mockMatDialog = {
    open: vi.fn().mockReturnValue({
      afterClosed: () => of(null),
    }),
  };

  beforeEach(async () => {
    mockPokemonService = {
      updateListParams: vi.fn(),
      pokemonListWithDetails: of<never>(),
    };

    await TestBed.configureTestingModule({
      imports: [PokedexComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    })
      .overrideComponent(PokedexComponent, {
        set: {
          imports: [MockPokemonListComponent, MockFormComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hideForm to false when openForm is called', () => {
    expect(component.hideForm).toBe(true);
    component.openForm();
    expect(component.hideForm).toBe(false);
  });

  it('should open dialog when openDialog is called', () => {
    component.openDialog();
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should set banner, cols and rowHeight for XSmall breakpoint', () => {
    mockBreakpointObserver.observe = vi.fn().mockReturnValue(
      of({
        matches: true,
        breakpoints: { [Breakpoints.XSmall]: true },
      })
    );

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.banner).toBe(component.banners.mobile);
    expect(component.cols).toBe((component as any).gridByBreakpoint.xs);
    expect(component.rowHeight).toBe('250px');
  });
});
