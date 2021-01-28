import { Injectable } from '@angular/core';
import { PetService } from './pet.service';
import { Pet } from '../models/pets'
@Injectable({
  providedIn: 'root'
})
export class LifeUpdaterService {
  pets: Pet[]
  constructor(private petService: PetService) {
    petService.pets$.subscribe(pets => this.pets = pets)
  }

  public updateLife() {

    let updatedPets = this.pets.map(pet => {
      return { ...pet, life: pet.life-- }
    })
    console.log('Updated Pets:', updatedPets);
    this.petService.setPets(updatedPets)
  }
}
