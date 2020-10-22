import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatDatepickerInputEvent, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { Subject } from 'rxjs';

// https://github.com/angular/components/blob/master/src/material/datepicker/date-range-selection-strategy.ts
@Injectable()
export class DefaultMatCalendarRangeStrategy<D> implements MatDateRangeSelectionStrategy<D> {

  isComplete = new Subject();

  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D, currentRange: DateRange<D>) {
    let {start, end} = currentRange;

    if (start == null) {
      start = date;
    } else if (end == null && date && this._dateAdapter.compareDate(date, start) >= 0) {
      end = date;
    } else {
      start = date;
      end = null;
    }

    if (end != null && start != null && this._dateAdapter.compareDate(date, start) >= 0) {
      this.isComplete.next();
    }

    return new DateRange<D>(start, end);
  }

  createPreview(activeDate: D | null, currentRange: DateRange<D>) {
    let start: D | null = null;
    let end: D | null = null;

    if (currentRange.start && !currentRange.end && activeDate) {
      start = currentRange.start;
      end = activeDate;
    }

    return new DateRange<D>(start, end);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: DefaultMatCalendarRangeStrategy
  }]
})
export class AppComponent implements OnInit {

  tabs: string[] = [
    'first',
    'second',
    'third',
  ];
  form: FormGroup;
  start: string = '';
  end: string = '';

  constructor(@Inject(MAT_DATE_RANGE_SELECTION_STRATEGY) private strategy: DefaultMatCalendarRangeStrategy<Date>) {}

  ngOnInit() {
    this.form = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

    this.strategy.isComplete.subscribe(() => {
      console.log('this');
    })
  }

  startlog(event: MatDatepickerInputEvent<Date>) {
    this.form.get('start').setValue(event.value, { emitEvent: false });
  }
  endlog(event: MatDatepickerInputEvent<Date>) {
    this.form.get('end').setValue(event.value, { emitEvent: false });
  }
}
