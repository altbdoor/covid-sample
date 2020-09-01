import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/models/country';
import { CaseData } from 'src/app/models/case-data';

@Injectable({
    providedIn: 'root',
})
export class CovidApiService {
    private baseUrl = 'https://api.covid19api.com';

    constructor(private http: HttpClient) {}

    getCountries() {
        return this.http.get<Country[]>(`${this.baseUrl}/countries`);
    }

    getCountryData(countrySlug: string) {
        const url = new URL(`${this.baseUrl}/total/country/${countrySlug}`);

        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);

        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 30);

        url.searchParams.append('from', startDate.toISOString());
        url.searchParams.append('to', endDate.toISOString());

        return this.http.get<CaseData[]>(url.toString());
    }
}
