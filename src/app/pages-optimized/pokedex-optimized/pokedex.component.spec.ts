import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { vi } from 'vitest';

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

@Component({
  selector: 'app-banner-grid',
  standalone: true,
  template: '<div>Mock Banner Grid</div>',
})
class MockBannerGridComponent {}

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let mockMatDialog: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockMatDialog = {
      open: vi.fn().mockReturnValue({
        afterClosed: () => of(null),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [PokedexComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
    })
      .overrideComponent(PokedexComponent, {
        set: {
          imports: [
            MockPokemonListComponent,
            MockFormComponent,
            MockBannerGridComponent,
          ],
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
});
