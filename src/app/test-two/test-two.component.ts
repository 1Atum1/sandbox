import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestOneComponent as testtOne} from '../test-one/test-one.component';
import {AppService} from '../app.service';
import {filter, map, skip, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-test-two',
  templateUrl: './test-two.component.html',
  styleUrls: ['./test-two.component.scss']
})
export class TestTwoComponent implements OnInit, OnDestroy {

  public time;
  private alive = true;

  constructor(public service: AppService) {
  }

  ngOnInit() {
    let count = 0;
    this.service.secondsCounter
      .pipe(
        takeWhile(() => this.alive),
        filter((value, index) => {
          return index % 60 === 0;
        }),
        map(v => v = count++))
      .subscribe(v => {
        this.time = v;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
