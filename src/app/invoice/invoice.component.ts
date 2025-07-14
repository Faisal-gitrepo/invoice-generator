import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InvoiceItem {
  id: number;
  product: string;
  quantity: number;
  rate: number;
  mrp: number;
  gst: number;
  total: number;
}

interface InvoiceMeta {
  customerName: string;
  customerNumber: string;
  invoiceNumber: string;
  reference: string;
  date: string;
  salesperson: string;
  paymentMethod: string;
  fullyPaid: boolean;
  discount: number;
  adjustment: number;
  customerNotes: string;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  invoiceMeta: InvoiceMeta = {
    customerName: 'John',
    customerNumber: '9876543210',
    invoiceNumber: 'INV-78784',
    reference: 'REF-54879',
    date: '2025-07-11',
    salesperson: 'Priya Sharma',
    paymentMethod: 'UPI',
    fullyPaid: true,
    discount: 10,
    adjustment: 0,
    customerNotes: 'Thank you for shopping with us! Visit again.',
  };

  invoiceItems: InvoiceItem[] = [
    {
      id: 1,
      product: 'Blue Denim Jeans',
      quantity: 2,
      rate: 1299,
      mrp: 1499,
      gst: 5,
      total: 0,
    },
    {
      id: 2,
      product: 'Casual White Shirt',
      quantity: 1,
      rate: 899,
      mrp: 999,
      gst: 5,
      total: 0,
    },
    {
      id: 3,
      product: 'Leather Wallet',
      quantity: 1,
      rate: 499,
      mrp: 549,
      gst: 12,
      total: 0,
    },
  ];

  calculations = {
    subtotal: 0,
    totalTax: 0,
    discountAmount: 0,
    grandTotal: 0,
  };

  ngOnInit() {
    this.calculateTotals();
  }

  calculateTotals() {
    // Calculate item totals
    this.invoiceItems.forEach((item) => {
      const itemSubtotal = item.quantity * item.rate;
      const itemTax = (itemSubtotal * item.gst) / 100;
      item.total = itemSubtotal + itemTax;
    });

    // Calculate summary
    this.calculations.subtotal = this.invoiceItems.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    this.calculations.totalTax = this.invoiceItems.reduce(
      (sum, item) => sum + (item.quantity * item.rate * item.gst) / 100,
      0
    );

    const subtotalWithTax =
      this.calculations.subtotal + this.calculations.totalTax;
    this.calculations.discountAmount =
      (subtotalWithTax * this.invoiceMeta.discount) / 100;
    this.calculations.grandTotal =
      subtotalWithTax -
      this.calculations.discountAmount +
      this.invoiceMeta.adjustment;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Reset to original dummy data
  cancelInvoice() {
    if (
      confirm(
        'Are you sure you want to cancel? All unsaved changes will be lost.'
      )
    ) {
      this.invoiceMeta = {
        customerName: 'John',
        customerNumber: '9876543210',
        invoiceNumber: 'INV-78784',
        reference: 'REF-54879',
        date: '2025-07-11',
        salesperson: 'Priya Sharma',
        paymentMethod: 'UPI',
        fullyPaid: true,
        discount: 10,
        adjustment: 0,
        customerNotes: 'Thank you for shopping with us! Visit again.',
      };
      this.calculateTotals();
    }
  }

  saveInvoice() {
    alert('Invoice saved successfully!');
  }

  // Save the invoice
  saveAndPrint() {
    this.saveInvoice();
    //trigger print
    setTimeout(() => {
      window.print();
    }, 100);
  }
}
