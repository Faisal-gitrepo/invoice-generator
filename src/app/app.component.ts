import { Component } from '@angular/core';
import { InvoiceComponent } from './invoice/invoice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceComponent],
  template: `
    <app-invoice></app-invoice>
  `,
  styles: []
})
export class AppComponent {
  title = 'invoice-generator';
}