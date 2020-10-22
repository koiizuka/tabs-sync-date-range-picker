import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  start: string = '';
  end: string = '';

  ngOnInit() {
    this.form = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }
}
