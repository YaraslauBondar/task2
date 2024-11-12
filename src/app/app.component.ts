import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  defaultTooltip: string = 'You do not have permissions';

  viewerTooltip: FormControl = new FormControl();
  isViewerDisabled: boolean = false;

  ngOnInit() {
    this.viewerTooltip.setValue(this.defaultTooltip);
  }

  toggleState(): void {
    this.isViewerDisabled = !this.isViewerDisabled;
  }
}
