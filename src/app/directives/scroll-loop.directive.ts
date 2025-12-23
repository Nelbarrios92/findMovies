import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollLoop]',
})
export class ScrollLoopDirective implements AfterViewInit {

  private el!: HTMLElement;
  private half = 0;
  private resizeObserver: ResizeObserver | undefined;


  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.el = this.elementRef.nativeElement;
    this.calculateHalf();
  }

  @HostListener('scroll')
  onScroll() {
    if (!this.half) return;
    // inicio
    if (this.el.scrollLeft <= 0) {
      this.el.scrollLeft = this.half;
    }
    // final
    if (this.el.scrollLeft >= this.half * 2 - this.el.clientWidth) {
      this.el.scrollLeft = this.half - this.el.clientWidth;
    }
  }

  calculateHalf() {
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.half = this.el.scrollWidth / 2;
        this.el.scrollLeft = this.half;
      });
    });

    this.resizeObserver.observe(this.el);
  }

}
