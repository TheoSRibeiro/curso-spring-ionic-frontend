import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadeService } from '../../Services/domain/cidade.services';
import { EstadoService } from '../../Services/domain/estado.services';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers:[
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule {}
