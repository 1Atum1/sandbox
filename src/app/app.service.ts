import { Injectable } from '@angular/core';
import {BehaviorSubject, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  data = {
    rows: ['col_1', 'col_2', 'col_3', 'col_4', 'col_5'],
    content: ['-', '-', '-', '-', '-']
  };

  public table$: BehaviorSubject<any> = new BehaviorSubject<any>(this.data);
  public table$$ = this.table$.asObservable();

  public record$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public secondsCounter = timer(0, 1000);
  // public randomSecondsCounter = interval(Math.floor(Math.random() * 7000));

  constructor() { }

  generateRandomData() {
    const arr = [];
    for (let i = 0; i <= this.data.rows.length - 1; i++) {
      arr.push(Math.floor(Math.random() * this.data.rows.length) + 1);
    }
    this.data.content = [...arr];

    this.table$.next(this.data);
  }

  // startTimer() {
  //   this.record$.switchMap()
  // }
}
