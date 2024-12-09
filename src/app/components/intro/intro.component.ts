import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-intro',
    imports: [MatAnchor, RouterLink],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.scss'
})
export class IntroComponent {}
