import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {debounce, delay, filter, first, map, skip, take, takeWhile} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-test-one',
  templateUrl: './test-one.component.html',
  styleUrls: ['./test-one.component.scss']
})
export class TestOneComponent implements OnInit, OnDestroy {

  public time;
  public table;

  private alive = true;

  constructor(private service: AppService) {
  }

  ngOnInit() {
    let count = 0;
    this.service.table$$.subscribe(v => {
      this.table = v;
    });
    this.service.secondsCounter
      .pipe(
        takeWhile(() => this.alive),
        filter((value, index) => {
          return index % 3 === 0;
        }),
        map(() => count++))
      .subscribe(v => {
        this.time = v;
        if (v) {
          this.service.generateRandomData();
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
