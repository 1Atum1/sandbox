import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appAutoContrast]'
})
export class AutoContrastDirective implements OnInit{

  @Input('bgColor')
  // E.g. 'blue'
  public bgColor: string;

  constructor(private el: ElementRef) { }

  public ngOnInit(): void {
    this.colorBackground();
  }

  private colorBackground(): void {
    this.el.nativeElement.style.backgroundColor = this.bgColor;
  }

}
