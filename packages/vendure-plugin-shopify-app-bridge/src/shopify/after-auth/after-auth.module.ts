import { AfterAuthHandlerService } from './after-auth-handler.service';
import { ServiceCoreModule } from '@vendure/core/dist/service/service.module';
import {
  ConfigModule,
  ConnectionModule,
  EventBusModule,
  VendurePlugin,
} from '@vendure/core';
import { ShopsModule } from '../../shops/shops.module';
@VendurePlugin({
  imports: [
    ShopsModule,
    ServiceCoreModule,
    ConnectionModule,
    ConfigModule,
    EventBusModule,
  ],
  providers: [AfterAuthHandlerService],
  exports: [AfterAuthHandlerService],
})
export class AfterAuthModule {}
