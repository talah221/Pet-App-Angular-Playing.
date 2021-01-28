import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Pet } from 'src/app/models/pets';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit, OnDestroy {
  pet: Pet = null;
  subscription: Subscription
  constructor(private toastr: ToastrService, public petService: PetService, public route: ActivatedRoute, private location: Location) { }

  async ngOnInit(): Promise<void> {
    const id: string = this.route.snapshot.paramMap.get('id')
    this.subscription = this.petService.pets$.subscribe(allPets => {
      const petToFind = allPets.find(pet => pet._id === id)
      this.pet = petToFind
    })
    if (!this.pet) {
      this.subscription = this.petService.getPetById(id).subscribe(pet => {
        this.pet = pet
      })
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  get getImg() {
    return `https://robohash.org/${this.pet.name}`;
  }
  goBack() {
    this.location.back()

  }

  onGift(): void {
    this.toastr.success(`${this.pet.name} Got 10 More Lifes For Your Gift!`)
    this.petService.savePet({ ...this.pet, life: this.pet.life += 10 })

  }

}
