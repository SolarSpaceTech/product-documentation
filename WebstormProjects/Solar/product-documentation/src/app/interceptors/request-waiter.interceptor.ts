import { Injectable, ɵPendingTasks } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class RequestWaiterInterceptor implements HttpInterceptor {
  constructor(private readonly pendingTasks: ɵPendingTasks) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const taskId: number = this.pendingTasks.add();
    return next.handle(req).pipe(
      tap(() => this.pendingTasks.remove(taskId)),
    );
  }

}
