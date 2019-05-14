import {AbstractControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';

export function DateValidation(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        let myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        let formDate = (control.value);
        if(myDate < formDate){
                    return {'DateOfBirtherr': true}
        }
    }

    return null;
}