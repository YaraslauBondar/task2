import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-button-extend',
  templateUrl: './button-extend.component.html',
  styleUrl: './button-extend.component.css'
})
export class ButtonExtendComponent implements OnChanges {

  @Input() isViewerDisabled: boolean = false;
  @Input() matButton!: MatButton;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isViewerDisabled']) {
      this.isViewerDisabled ? this.matButton.disabled = true : this.matButton.disabled = false;
    }
  }
}
