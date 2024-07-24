import { Component, Input, Output, EventEmitter} from '@angular/core';

//----custom types

// type User = {
//   id: string;
//   avatar: string;
//   name: string;
// }

//---Interfaces

// interface User {
//   id: string;
//   avatar: string;
//   name: string;
// }

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent  {
  @Input({ required: true }) user!:{
    id: string;
    avatar: string;
    name: string;
  };
  
  //---Output properties

  @Output () select = new EventEmitter<string>();
  // select = output<string>();

  get imagePath(){
    return 'assets/users/' + this.user.avatar;
  }

  // //---Accepting inputs via signals---
  // avatar = input.required<string>(); // generics
  // name = input.required<string>();

  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar;
  // });

  onSelectUser (){
    this.select.emit(this.user.id);
  }
}
