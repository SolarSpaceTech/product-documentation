import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { MarkdownTokenModel } from 'markdown/models';
import { BlockquoteTypeEnum, MarkdownInlineEnum } from 'markdown/enums';
import { MarkdownContentDirective } from 'markdown/diretives';
import { SCIconModule } from '@ui-kit/icon/icon.module';

@Component({
  selector: 'blockquote.markdown-blockquote',
  templateUrl: './markdown-blockquote.component.html',
  styleUrls: ['./markdown-blockquote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, MarkdownContentDirective, SCIconModule],
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownBlockquoteComponent {
  protected readonly BlockquoteTypeEnum = BlockquoteTypeEnum;

  @Input()
  public set token(value: MarkdownTokenModel) {
    this.type = this.getType(value?.tokens);
    this.items = this.getItems(value?.tokens);
  }

  @HostBinding('attr.data-sc-type')
  public type: BlockquoteTypeEnum = BlockquoteTypeEnum.Info;

  public items: MarkdownTokenModel[] = [];

  private getType(tokens: MarkdownTokenModel[] = []): BlockquoteTypeEnum {
    const contentTypeToken = tokens[0]?.tokens?.[0];
    const contentType = contentTypeToken.text.toLowerCase() as BlockquoteTypeEnum;
    return Object.values(BlockquoteTypeEnum).includes(contentType) ? contentType : BlockquoteTypeEnum.Info;
  }

  private getItems(tokens: MarkdownTokenModel[] = []): MarkdownTokenModel[] {
    const withoutContentTypeToken = tokens[0]?.tokens?.[0]?.type !== MarkdownInlineEnum.Strong;
    if (withoutContentTypeToken) {
      return tokens;
    }

    const tokensOfFirstItem = tokens[0].tokens.slice(1);

    const result = [];
    if (tokensOfFirstItem?.length > 0) {
      result.push({
        ...tokens[0],
        tokens: tokens[0].tokens.slice(1),
      });
    }
    tokens.forEach((token, index) => {
      if (index > 0) {
        result.push(token);
      }
    })
    return result;
  }
}
