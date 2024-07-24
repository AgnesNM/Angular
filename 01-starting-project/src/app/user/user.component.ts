import { Component, Input, output, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent  {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;

  //---Output properties

  // @Output () select = new EventEmitter();

  select = output<string>();

  get imagePath(){
    return 'assets/users/' + this.avatar;
  }

  // //---Accepting inputs via signals---
  // avatar = input.required<string>(); // generics
  // name = input.required<string>();

  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar;
  // });

  onSelectUser (){
    this.select.emit(this.id);
  }
}
