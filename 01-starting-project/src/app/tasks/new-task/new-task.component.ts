import { Component, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})

export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();

  enteredTitle = '';
  enteredSummary = ''
  enteredDate = ''

  //----Using Signals with two-way binding
  // enteredTitle = signal ('');
  // enteredSummary = signal ('')
  // enteredDate = signal('')

  onCancel(){
    this.cancel.emit();
  }
}
