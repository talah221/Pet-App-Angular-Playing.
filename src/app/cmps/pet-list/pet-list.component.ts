import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DropResult, } from 'ngx-smooth-dnd';
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/models/pets';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  @Input() pets: Pet[]
  @Output() giveKiss = new EventEmitter()
  @Output() onMove = new EventEmitter()
  constructor(private toastr: ToastrService, private petService: PetService) { }
  ngOnInit(): void {
  }

  onGiveKiss(pet) {
    this.giveKiss.emit(pet)
  }

  swipeHandler(direction, pet) {
    pet = {...pet}
    switch (direction) {
      case 'left':
        this.toastr.info(`You unliked ${pet.name}`)
        pet.unlikes++
        break;
      case 'right':
        this.toastr.info(`You liked ${pet.name}`)
        pet.likes++
        break;
    }
    this.petService.savePet(pet)

  }

  onDrop(dropResult: DropResult) {
    let stocks = this._applyDrag(this.pets, dropResult);
    this.onMove.emit(this.pets)
  }

  _applyDrag(arr, dragResult) {
    const { removedIndex, addedIndex, payload, } = dragResult
    // console.log('PetListComponent ~ payload', payload);
    // console.log('PetListComponent ~ addedIndex', addedIndex);
    // console.log('PetListComponent ~ removedIndex', removedIndex);

  }

}
