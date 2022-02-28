import { AbstractControl, AsyncValidatorFn, ControlContainer } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from "./userservice.service";
import { map } from 'rxjs/operators';

export class UniqueEmailValidator
{
    constructor(private userservice: UserService)
    {}

    static createValidator(userService: UserService): AsyncValidatorFn
    {
        return (control: AbstractControl): Observable<ValidationErrors | null> =>
        {
            if (control.value == null)
            {
                console.log("null");
                return new Observable<null>();
            }
            return userService.isEmailTaken(control.value)
            .pipe(map((result: boolean) => (result ? {invalidAsync: true} : null)));
        }
    }
}
