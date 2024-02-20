import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { FooterAnimationComponent } from './components/footer-animation/footer-animation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    FooterAnimationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menuTrigger') menuTrigger!: ElementRef;

  constructor(private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.toggleButton == null || this.menuTrigger == null) {
        return;
      }

      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       *
       * And the menu itself is checked here, and it's where we check just outside
       * the menu and button the condition above must close the menu
       */
      if (
        e.target !== this.toggleButton.nativeElement &&
        e.target !== this.menuTrigger.nativeElement
      ) {
        this.menuTrigger.nativeElement.closeMenu();
      }
    });
  }

  title = 'PokeDex App';
}
