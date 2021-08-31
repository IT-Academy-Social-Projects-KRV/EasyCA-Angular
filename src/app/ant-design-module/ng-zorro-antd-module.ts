import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  exports: [
    NzIconModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzMenuModule,
    NzSelectModule,
    NzCardModule 
  ]
})
export class DemoNgZorroAntdModule {}
