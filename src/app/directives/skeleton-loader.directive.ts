import { Directive, ElementRef, Renderer2, Input, AfterViewInit, OnChanges, SimpleChanges, signal, input, effect, inject } from '@angular/core';
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
    // Seleccionamos todos los div y button dentro del contenedor
    this.elements = this.el.nativeElement.querySelectorAll('* .skeleton');
    this.updateSkeleton();
  }

  private updateSkeleton(loading: boolean = this.isLoading()) {
    this.elements?.forEach((element) => {
      if (loading) {
        // Aplicar clases de Tailwind para skeleton
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
        // Limpiar clases cuando no está cargando
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
