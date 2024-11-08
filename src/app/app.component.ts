import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //@ViewChild('matButton') matButton!: MatButton;
  @ViewChild('tooltip') tooltip!: MatInput;

  viewerTooltip: string = 'У вас нет прав на выполнение этого действия';
  isViewerDisabled: boolean = false; // Установите true/false в зависимости от логики
  hasPermission: boolean = false;

  //isViewerDisabled: boolean = true;

  toggleState(): void {
    this.isViewerDisabled = !this.isViewerDisabled;
  }
}
