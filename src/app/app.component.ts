import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('matButton') matButton!: MatButton;
  @ViewChild('tooltip') tooltip!: MatInput;

  isViewerDisabled: boolean = true;

  toggleState(): void {
    this.isViewerDisabled = !this.isViewerDisabled;
  }
}
