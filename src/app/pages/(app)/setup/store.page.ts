
import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './store.page.html'
})
export default class SetupStorePage implements OnInit {

  constructor() {}

  ngOnInit(): void {

  }

}
