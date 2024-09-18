import { Component, Input } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { SCIconModule } from '@ui-kit/icon/icon.module';
import { convertPropertyToBool } from '@ui-kit/helpers/functions';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  standalone: true,
  imports: [NgFor, AsyncPipe, JsonPipe, SCIconModule, NgIf],
})
export class BreadcrumbsComponent {
  @Input()
  public set withHome(value: boolean) {
    this.hasHome = convertPropertyToBool(value)
  };

  public hasHome = false;

  @Input({ required: true })
  public items: string[] = [];
}
