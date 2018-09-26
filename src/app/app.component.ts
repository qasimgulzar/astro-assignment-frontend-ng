import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'support-wheel-fate-ng';
  private schedule;
  public filter = {
    date: moment().format('DD/MM/YYYY'),
    n_person: 10,
    days: 14,
    min: new Date()
  };

  constructor(private http: HttpClient) {
    this.getData();
  }

  filterChange(filters) {
    this.filter['date'] = moment(filters.value).format('DD/MM/YYYY');
    this.getData();
  }

  personsChange() {
    this.getData();
  }

  getData() {
    this.http.get(`http://localhost:8081/schedule/?from=${this.filter.date}&days=${this.filter.days}&n_persons=${this.filter.n_person}`).subscribe((payload) => {
      if (payload['status']) {
        this.schedule = payload['results'];
      }
    });
  }
}
