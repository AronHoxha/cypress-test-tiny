import {Component, OnInit} from '@angular/core';
import {ReplaySubject, timer} from "rxjs";

@Component({
  selector: 'first',
  templateUrl: 'first.component.html',
})
export class FirstComponent implements OnInit {

  title$ = new ReplaySubject<string>(1);

  public ngOnInit() {
    this.title$.next('Hello cy')
    timer(1500).subscribe(() => this.title$.next('other title'))
  }
}
