import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaymentsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'neueda-technical-angular';
}
