---
title: test
displayName: Тестовая страница
published: true
order: 3
---
# Сервер лицензирования

NgDoc is just a library, so first you need to create an Angular application that will be used to display
documentation, it can be a separate application or an existing one.

When you install NgDoc, it will be integrated into the build process of your application, and will generate
and components based on you code, that can be used in your application to display documentation.

## [Описание задачи](task-description)

[Аутентификация](https://confluence.solarsecurity.ru/plugins/servlet/applinks/oauth/login-dance/authorize?applicationLinkID=7e840fef-85d9-37ac-a117-2ba7c03aac37) для
просмотра подробных данных проблемы

> **INFO**
> #### Information alert message
> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Vivamus imperdiet leo velit, nec consectetur metus auctor at. 

### [Требования к подсистеме](subsystem-requirements)
Примечание:
- Приоритет задаётся цветом: высокий - красный, средний - желтый, низкий - зеленый
- Статус: new, rejected, implemented

### [Требования реализации](implementation-requirements)
Прошедшее демо:
- Install keyauth server
- генерировали лицензию средствами KeyAuth через GUI
- клиент регистрировал свое приложение на сервере с помощью выданной лицензии, СВОЕГО логина/пароля через HTTP API:
  - при этом на стороне клиента генерировался HWID
  - сервер  keyauth привязывал лицензию к HWID клиента
- передавали лицензию клиенту

```typescript
import { Injectable } from '@angular/core';
import { Token } from 'marked';
import { MarkdownRendererModel } from 'markdown/models/markdown-renderer.model';
import { MarkdownHtmlElementBuilderService } from './markdown-html-element-builder.service';
import { MarkdownOtherElementBuilderService } from './markdown-other-element-builder.service';
import { MarkdownComponentBuilderService } from './markdown-component-builder.service';

@Injectable()
export class MarkdownRendererService {
  constructor(
    private readonly markdownComponentBuilderService: MarkdownComponentBuilderService,
    private readonly markdownHtmlElementBuilderService: MarkdownHtmlElementBuilderService,
    private readonly markdownOtherElementBuilderService: MarkdownOtherElementBuilderService,
  ) {
  }

  public render(params: MarkdownRendererModel): void {
    params.tokens.forEach((token: Token) => {
      if (this.markdownComponentBuilderService.has(token.type)) {
        this.appendComponent(params, token);
        return;
      }

      if (this.markdownOtherElementBuilderService.has(token.type)) {
        this.appendOtherElement(params, token);
        return;
      }

      if (this.markdownHtmlElementBuilderService.has(token.type)) {
        this.appendHtmlElement(params, token);
        return;
      }
    });
  }

  private appendComponent(params: MarkdownRendererModel, token: Token): void {
    this.markdownComponentBuilderService.createElement(params, token);
  }

  private appendOtherElement(params: MarkdownRendererModel, token: Token): void {
    if ('tokens' in token) {
      this.render({
        ...params,
        tokens: token.tokens,
      });
    } else {
      const element = this.markdownOtherElementBuilderService.createElement(params, token);
      params.renderer.appendChild(params.parentElement, element);
    }
  }

  private appendHtmlElement(params: MarkdownRendererModel, token: Token): void {
    const element = this.markdownHtmlElementBuilderService.createElement(params, token);

    const tokens = this.getTokens(token);
    if (tokens?.length) {
      this.render({
        ...params,
        tokens: this.getTokens(token),
        parentElement: element,
      });
    } else if ('text' in token) {
      this.render({
        ...params,
        tokens: [{ ...token, type: 'text'}],
        parentElement: element,
      });
    }

    params.renderer.appendChild(params.parentElement, element);
  }

  private getTokens(token: Token): Token[] {
    let tokens = [];
    if ('tokens' in token) {
      tokens = token.tokens;
    } else if ('items' in token) {
      tokens = token.items;
    }
    return tokens;
  }
}
```

```typescript
export enum MarkdownOtherEnum {
  Html = 'html',
  Text = 'text',
  Space = 'space',
  Escape = 'escape',
}
```

![image](https://placehold.co/800x360 "Some text")

## [HLD](hld)
### [Архитектура приложения](application-architecture)
Прошедшее демо:
- Install keyauth server
- генерировали лицензию средствами KeyAuth через GUI
- передавали лицензию клиенту
- клиент регистрировал свое приложение на сервере с помощью выданной лицензии, СВОЕГО логина/пароля через HTTP API:
    - при этом на стороне клиента генерировался HWID
    - сервер  keyauth привязывал лицензию к HWID клиента

### [Описание клиентской части](frontent-description)
Настроенный сервер KeyAuth практически без изменений:
- Создано приложение botshield на сервере
- Преднастроены лицензионные ключи

### [Описание серверной части](backend-description)
First of all you need to add builders from NgDoc library to your application, replace `application` and
`dev-server` builders for `build` and `serve` targets with alternatives from the NgDoc as shown in the
example below
