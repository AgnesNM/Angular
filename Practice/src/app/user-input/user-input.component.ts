import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<{
    initialInvestment: number;
    duration: number;
    expectedReturn: number;
    annualInvestment: number;
  }>();

  enteredInitialInvestment: string = '0';
  enteredAnnualInvestment: string = '0';
  enteredExpectedReturn: string = '5';
  enteredDuration: string = '10';

  onSubmit() {
    this.calculate.emit({
      initialInvestment: +this.enteredInitialInvestment,
      duration:+this.enteredDuration,
      expectedReturn:+this.enteredExpectedReturn,
      annualInvestment:+this.enteredAnnualInvestment
    });
  }
}
