import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

  ngOnInit() {
    this.form = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  startlog(event: MatDatepickerInputEvent<Date>) {
    console.log('start', event.value);
    this.form.get('start').setValue(event.value, { emitEvent: false });
  }
  endlog(event: MatDatepickerInputEvent<Date>) {
    console.log('end', event.value);
    this.form.get('end').setValue(event.value, { emitEvent: false });
  }
}
