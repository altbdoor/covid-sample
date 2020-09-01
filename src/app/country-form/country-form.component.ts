import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CovidApiService } from 'src/app/covid-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-country-form',
    templateUrl: './country-form.component.html',
    styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent implements OnInit {
    countries$: Observable<Country[]>;
    form: FormGroup;

    @Output()
    selectedCountry = new EventEmitter<string>();

    constructor(private api: CovidApiService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.countries$ = this.api
            .getCountries()
            .pipe(
                map((countries) =>
                    countries.sort((a, b) => (a.Country > b.Country ? 1 : -1))
                )
            );

        this.form = this.fb.group({
            country: [''],
        });
    }

    selectCountry(data: { country: string }) {
        if (data.country) {
            this.selectedCountry.emit(data.country);
        }
    }

    directShowCountry(country: string) {
        this.form.get('country').setValue(country);
        this.selectedCountry.emit(country);
    }
}
