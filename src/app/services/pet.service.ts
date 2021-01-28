import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of, Subscriber, interval, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pets';
import { retry, catchError, map, take, tap, timeInterval, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PetService {
  interval;
  constructor(private http: HttpClient) { }
  private BASE_URL = 'http://localhost:3000/pet'
  private _pets$ = new BehaviorSubject<Array<Pet>>([])
  public pets$ = this._pets$.asObservable()
  public isLoaded: boolean = false
  public loadPets(filterBy = { name: '' }): Observable<Pet[]> {
    this.isLoaded = true
    this.http.get<Pet[]>(this.BASE_URL)
      .pipe(
        map(pets => {
          return pets.filter(({ name }) => {
            return name.toLowerCase().includes(filterBy.name.toLowerCase())
          })
        })
      ).subscribe(
        pets => {
          this._pets$.next(pets)
          if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
          }

          this.interval = setInterval(() => {
            var newPets = pets.map(pet => {pet.life--; return pet})
            this._pets$.next(newPets)

          }, 1000)


        },
        error => console.log('got error: ', error),
        () => console.log('Stream is finished')
      )

  }
  public setPets(pets: Pet[]) {
    this._pets$.next(pets)
  }
  public intervalPets() {
    console.log('hi');
    var inter = interval(1000).pipe(

    )
  }

  public decrementLife() {
    this.pets$.pipe(
      map((pets) => {
        var currPets;
        return currPets = pets.map(pet => {
          if (pet.life === 0) return;
          return { ...pet, life: pet.life-- }
        })
      })).subscribe()
  }


  public getPetById(id: string) {
    return this.http.get<Pet>(this.BASE_URL + `/${id}`)
      .pipe(
        retry(1),
        catchError(() => throwError('no Pet found!'))
      )
  }

  public savePet(pet) {
    if (pet._id) return this.http.put<any>(this.BASE_URL + `/${pet._id}`, pet).subscribe();

  }




}
