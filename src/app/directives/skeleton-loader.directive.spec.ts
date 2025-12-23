import { SkeletonLoaderDirective } from './skeleton-loader.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('SkeletonLoaderDirective', () => {
  it('should create an instance', () => {
    const elMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new SkeletonLoaderDirective(elMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
