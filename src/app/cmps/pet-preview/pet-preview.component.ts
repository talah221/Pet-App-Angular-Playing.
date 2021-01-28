import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from 'src/app/models/pets';

@Component({
  selector: 'app-pet-preview',
  templateUrl: './pet-preview.component.html',
  styleUrls: ['./pet-preview.component.scss'],
})
export class PetPreviewComponent implements OnInit {
  @Input() pet: Pet
  @Output() onGiveKiss = new EventEmitter()
  constructor(public router: Router) { }

  ngOnInit(): void {

  }
  giveGift() {
  this.router.navigateByUrl(`/pet/${this.pet._id}`)
  }
  get getImg() {
    return `https://robohash.org/${this.pet.name}`;
  }


}
