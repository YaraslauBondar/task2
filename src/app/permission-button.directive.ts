import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  AfterViewInit, OnDestroy,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appPermissionButton]',
  providers: [MatTooltip],
})
export class PermissionButtonDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() viewerTooltip: string = 'You do not have permissions';
  @Input() isViewerDisabled: boolean = false;

  overlay: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tooltip: MatTooltip
  ) {
    this.overlay = this.renderer.createElement('div');
  }

  ngAfterViewInit(): void {
    this.updateButtonState();
    this.createOverlay();
    this.updateOverlayPosition();
  }

  ngOnChanges() {
    this.updateButtonState();
    this.updateOverlayPosition();
  }

  private updateButtonState() {
    if (this.isViewerDisabled) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  private createOverlay() {
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.overlay);

    this.renderer.setStyle(this.overlay, 'position', 'absolute');
    this.renderer.setStyle(this.overlay, 'cursor', 'not-allowed');
    this.renderer.setStyle(this.overlay, 'width', '100%');
    this.renderer.setStyle(this.overlay, 'height', '100%');

    this.overlay.addEventListener('mouseenter', () => {
      this.tooltip.show();
    });
    this.overlay.addEventListener('mouseleave', () => {
      this.tooltip.hide();
    });

    window.addEventListener('resize', () => {
      this.updateOverlayPosition();
    } )

    this.tooltip.message = this.viewerTooltip;
    this.tooltip.disabled = true;
  }

  private updateOverlayPosition() {
    const buttonRect = this.el.nativeElement.getBoundingClientRect();

    this.renderer.setStyle(this.overlay, 'width', `${buttonRect.width}px`);
    this.renderer.setStyle(this.overlay, 'height', `${buttonRect.height}px`);
    this.renderer.setStyle(this.overlay, 'top', `${buttonRect.top}px`);
    this.renderer.setStyle(this.overlay, 'left', `${buttonRect.left}px`);
  }

  private disableButton() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', true);
    this.renderer.setStyle(this.overlay, 'z-index', '1000');

    this.tooltip.disabled = false;
    this.tooltip.message = this.viewerTooltip;
  }

  private enableButton() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', false);
    this.renderer.setStyle(this.overlay, 'z-index', '-1');

    this.tooltip.disabled = true;
    this.tooltip.message = null;
  }

  ngOnDestroy() {
    this.overlay.removeEventListener('mouseenter', () => {});
    this.overlay.removeEventListener('mouseleave', () => {});

    window.removeEventListener('resize', () => {
      this.updateOverlayPosition();
    });
  }
}
