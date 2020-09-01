import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, filter, map, distinctUntilChanged } from 'rxjs/operators';
import { CaseData } from './models/case-data';
import { CovidApiService } from './covid-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private countrySub$ = new BehaviorSubject({ country: '' });
    country$ = this.countrySub$.asObservable();

    caseData$: Observable<CaseData[]>;

    constructor(private api: CovidApiService) {}

    ngOnInit() {
        this.caseData$ = this.country$.pipe(
            map((data) => data.country),
            distinctUntilChanged(),
            filter((country) => !!country),
            switchMap((country) => this.api.getCountryData(country)),
            map((data) => data.reverse())
        );
    }

    changeCountry(country: string) {
        this.countrySub$.next({ country });
    }
}
