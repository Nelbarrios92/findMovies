import { ElementRef } from '@angular/core';
import { ScrollLoopDirective } from './scroll-loop.directive';

describe('ScrollLoopDirective', () => {
  it('should create an instance', () => {
    const directive = new ScrollLoopDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
