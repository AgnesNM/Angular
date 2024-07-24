import { Component, Input, computed, input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent  {
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;

  get imagePath(){
    return 'assets/users/' + this.avatar;
  }

  // //---Accepting inputs via signals---
  // avatar = input.required<string>(); // generics
  // name = input.required<string>();

  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar;
  // });

  onSelectUser (){}
}
