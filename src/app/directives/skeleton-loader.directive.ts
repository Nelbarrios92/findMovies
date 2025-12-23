import { Directive, ElementRef, Renderer2, AfterViewInit, effect, inject } from '@angular/core';
import { FilmsStore } from '../state/films.store';

@Directive({
  selector: '[appSkeletonLoader]'
})
export class SkeletonLoaderDirective implements AfterViewInit {
  private store = inject(FilmsStore);
  isLoading = this.store.loading;

  private elements: NodeListOf<HTMLElement> = null as any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    effect(() => {
      this.updateSkeleton(this.isLoading());
    });
  }

  ngAfterViewInit() {
    this.elements = this.el.nativeElement.querySelectorAll('* .skeleton');
    this.updateSkeleton(this.isLoading());
  }

  private updateSkeleton(loading: boolean) {
    this.elements?.forEach((element) => {
      if (loading) {
        this.renderer.addClass(element, '!bg-gray-500');
        this.renderer.addClass(element, '!text-gray-500');
        this.renderer.addClass(element, '!text-transparent');
        this.renderer.addClass(element, '!rounded');
        this.renderer.addClass(element, '!animate-pulse');
        this.renderer.addClass(element, '!border-none');
        if (element.tagName === 'IMG') {
          this.renderer.setAttribute(element, 'src', '');
        }
      } else {
        this.renderer.removeClass(element, '!bg-gray-500');
        this.renderer.removeClass(element, '!text-gray-500');
        this.renderer.removeClass(element, '!text-transparent');
        this.renderer.removeClass(element, '!rounded');
        this.renderer.removeClass(element, '!animate-pulse');
        this.renderer.removeClass(element, '!border-none');
      }
    });
  }
}
