import { Injectable, Type, ViewContainerRef} from "@angular/core";
import { MarkdownBlockEnum} from "../../enums";
import { MarkdownCodeComponent } from "../../components";
import { Token} from "marked";

@Injectable()
export class MarkdownComponentCreatorService {
  private readonly componentMap = new Map<string, Type<any>>([
    [MarkdownBlockEnum.Code, MarkdownCodeComponent],
  ]);

  public create(markdownToken: Token, viewContainerRef: ViewContainerRef): void {
    const componentType = this.componentMap.get(markdownToken.type);
    const component = viewContainerRef.createComponent(componentType);
    component.instance.token = markdownToken;
  }

  public canCreate(tokenType: string): boolean {
    return this.componentMap.has(tokenType)
  }
}
