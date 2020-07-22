import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AppService} from './app.service';
import {skip, takeWhile} from 'rxjs/operators';
import {PointComponent} from './point/point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChildren('randomPosition') public randomPosition: QueryList<PointComponent>;

  public elemNum = 150;
  public flattenMatrix;
  public showMatrixJson;
  public matrix: any = [[1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9]];
  public str = 'песочница';
  public newStr;
  public title = 'sandbox';
  public time;
  public timer = true;
  public numOfRandomElem;
  public disableChaos = false;
  public autoChangeMatrix = false;

  private subscr;

  constructor(
    public service: AppService
  ) {

  }

  ngOnInit() {
    this.turnOver(this.str);
    console.log(this.factorial(4));

    this.subscription();

    this.flattenMatrix = this.intoOneDimensional(this.matrix);
  }

  intoOneDimensional(array) {
    return array.reduce((acc, val) => acc.concat(val), []);
  }

  factorial(n) {
    return n ? n * this.factorial(n - 1) : 1;
  }

  onStrChange(newValue) {
    this.turnOver(newValue);
  }

  onElemNumChange(newValue) {
    if (newValue > 300) {
      this.disableChaos = true;
    }
    this.elemNum = +newValue;
  }

  turnOver(value) {
    this.newStr = '';
    for (let i = value.length - 1; i >= 0; i--) {
      this.newStr += value[i];
    }
  }

  randomiseMatrix(event) {
    if (event) {
      const newMatrix = [];
      const newOneArr = [];
      const oneArr = Object.assign([], this.matrix.flat(1));

      while (oneArr.length > 0) {
        const randomNum = Math.floor(Math.random() * Math.floor(this.matrix.length));
        const a = oneArr.length > 1 ? oneArr.splice(randomNum < oneArr.length ? randomNum : 0, 1) : oneArr.splice(0, 1);
        newOneArr.push(a[0]);
      }

      for (let i = 0; i < 3; i++) {
        const t = newOneArr.splice(0, 3);
        newMatrix.push(t);
      }

      this.matrix = newMatrix;
      this.flattenMatrix = this.intoOneDimensional(newMatrix);
    }
  }

  subscription() {
    this.subscr = this.service.secondsCounter.subscribe(v => {
      this.time = v;
      if (this.autoChangeMatrix) {
        this.randomiseMatrix(v);
      }
    });
  }

  toggle() {
    this.timer = !this.timer;
    this.subscr.unsubscribe();
    this.numOfRandomElem = [];
    if (this.timer) {
      this.subscription();
    } else {
      this.numOfRandomElem = new Array(this.elemNum).fill(null);
    }
  }
}
