import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [IonicModule],
  exports: [HeaderComponent, FooterComponent],
  declarations: [HeaderComponent, FooterComponent],
  providers: [],
})
export class SharedModule {}
