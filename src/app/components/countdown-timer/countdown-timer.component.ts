import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, map, takeUntil, takeWhile, timer } from 'rxjs';


@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})

export class CountdownTimerComponent implements OnInit {

  totalSeconds: number = 120;
  timer$!: Observable<number>;
  timerSubscription!: Subscription;
  public stop$ = new Subject<boolean>();
  public isPaused = false;

  constructor() { }

  ngOnInit(): void {
    this.runTimer();
  }

  public runTimer() {
      this.timer$ = timer(0, 1000).pipe(
        map((secondsPassed) => this.totalSeconds - secondsPassed),
        takeWhile(time => time >= 0),
        takeUntil(this.stop$)
      );
      this.timerSubscription = this.timer$.subscribe();
  }


  public togglePause() {
    if (this.isPaused) {
      this.runTimer();
    } else {
      this.isPaused = true;
      this.stop$.next(false);
    }
  }
}
