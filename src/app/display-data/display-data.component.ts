import { Component, Input } from '@angular/core';
import { CaseData } from '../models/case-data';

@Component({
    selector: 'app-display-data',
    templateUrl: './display-data.component.html',
    styleUrls: ['./display-data.component.scss'],
})
export class DisplayDataComponent {
    @Input()
    data: CaseData[] = [];
}
