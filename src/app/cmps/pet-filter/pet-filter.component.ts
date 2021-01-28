import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pet-filter',
  templateUrl: './pet-filter.component.html',
  styleUrls: ['./pet-filter.component.scss']
})
export class PetFilterComponent implements OnInit {
  filterBy = {
    name: '',
  }
  @Output() onFilter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
 