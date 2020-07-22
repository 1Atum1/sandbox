import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointComponent implements OnInit, OnDestroy {

  alive = true;
  intervalOne;
  intervalTwo;
  posx;
  posy;
  speed;
  color: string;
  emoji: string;
  colorTemplate = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'f'];
  emojiTemplate = ['😀', '😃', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋', '😖', '😫', '😩', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '😴', '🤤', '😪', '😵', '🤐', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠', '👽', '👾', '🤖', '🎃'];

  constructor(public service: AppService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.service.secondsCounter.pipe(takeWhile(() => this.alive)).subscribe(_ => {
      this.color = '#';


      for (let i = 0; i < 6; i++) {
        this.color += this.colorTemplate[(Math.random() * this.colorTemplate.length).toFixed()];
      }
    });
    this.intervalOne = setInterval(_ => {
      this.posx = (Math.random() * (window.innerWidth - 80)).toFixed();
      this.posy = (Math.random() * (window.innerHeight - 80)).toFixed();
      this.speed = ((Math.random() * 10) + 1).toFixed();
      this.changeDetection.detectChanges();
    }, Math.floor(Math.random() * 4000) + 800);
    this.intervalTwo = setInterval(_ => {
      this.emoji = this.emojiTemplate[(Math.random() * this.emojiTemplate.length).toFixed()];
      this.changeDetection.detectChanges();
    }, Math.floor(Math.random() * 15000) + 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalOne);
    clearInterval(this.intervalTwo);
    this.alive = false;
  }

}
