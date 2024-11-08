import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appPermissionButton]',
  providers: [MatTooltip],
})
export class PermissionButtonDirective {
  @Input() viewerTooltip: string = 'У вас нет разрешения';
  @Input() isViewerDisabled: boolean = false; // Внешнее условие отключения кнопки
  @Input() hasPermission: boolean = true; // Проверка прав

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tooltip: MatTooltip
  ) {}

  ngOnInit() {
    this.updateButtonState();
  }

  ngOnChanges() {
    this.updateButtonState();
  }

  private updateButtonState() {
    if (!this.hasPermission || this.isViewerDisabled) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  private disableButton() {
    // Устанавливаем состояние disabled на элементе кнопки
    this.renderer.setProperty(this.el.nativeElement, 'disabled', true);
    // Применяем стиль курсора
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
    // Устанавливаем текст подсказки, если у пользователя нет прав
    if (!this.hasPermission) {
      this.tooltip.message = this.viewerTooltip;
      this.tooltip.show();
    }
  }

  private enableButton() {
    // Убираем состояние disabled и стиль курсора
    this.renderer.setProperty(this.el.nativeElement, 'disabled', false);
    this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    this.tooltip.hide();
  }

  // Скрываем подсказку при выходе курсора с кнопки
  @HostListener('mouseleave') onMouseLeave() {
    this.tooltip.hide();
  }
}
