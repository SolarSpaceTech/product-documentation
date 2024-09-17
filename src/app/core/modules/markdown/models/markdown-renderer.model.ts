import { Token } from 'marked';
import { Injector, Renderer2, ViewContainerRef } from '@angular/core';

export interface MarkdownRendererModel {
  tokens: Token[];
  parentElement: HTMLElement;
  renderer: Renderer2;
  injector: Injector;
  viewContainerRef: ViewContainerRef;
}
