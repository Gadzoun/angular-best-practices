import {Component, Input} from '@angular/core'

@Component({
  selector: 'wb-loading-spinner',
  // Comme il ni a qu'un ligne on peut ne pas créer de fichier html
  template: '<img *ngIf="loading" src="../../assets/images/loading.gif" />',
})
export class LoadingSpinnerComponent {
  @Input() loading: boolean = false;
}
