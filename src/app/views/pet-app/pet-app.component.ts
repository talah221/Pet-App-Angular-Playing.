import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Pet } from 'src/app/models/pets';
import { PetService } from 'src/app/services/pet.service';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pet-app',
  templateUrl: './pet-app.component.html',
  styleUrls: ['./pet-app.component.scss']
})
export class PetAppComponent implements OnInit {
  subscription: Subscription
  filterBy = {
    name: ''
  }
  constructor(private toastr: ToastrService, public petService: PetService) { }

  ngOnInit(): void {
    if (!this.petService.isLoaded) {
      this.petService.loadPets()
    }
  }

  async giveKiss(pet) {
    pet = { ...pet, life: pet.life += 5 }
    await this.petService.savePet(pet)
    this.toastr.success(`${pet.name} Got 5 More Lifes For Your Kiss!`)
  }

  onFilterHandler(currFilter) {
    this.petService.loadPets(currFilter)
  }





}
