import { NgModule } from "@angular/core";
import { NavBarComponent } from "./navbar/navbar.component";
import { DataService } from "./services/data.service";
import { FilterService } from "./services/filter.service";
import { RouterModule } from "@angular/router";
import { LoggerService } from "./services/logger.service";
import { GrowlerModule } from "./growler/growler.module";
import { AuthService } from "./services/auth.service";
import { ModalModule } from "./modal/modal.module";
import { OverlayModule } from "./overlay/overlay.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { EventBusService } from "./services/event-bus.service";
import { SorterService } from "./services/sorter.service";
import { TrackByService } from "./services/trackby.service";

@NgModule({
  imports: [RouterModule, GrowlerModule, ModalModule, OverlayModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent, GrowlerModule, ModalModule, OverlayModule],
  providers: [
    DataService,
    FilterService,
    LoggerService,
    AuthService,
    SorterService,
    TrackByService,
    EventBusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: "Window",
      useFactory: () => window
    }
  ]
})
export class CoreModule {}
