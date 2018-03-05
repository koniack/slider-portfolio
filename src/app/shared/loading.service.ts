import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
    private loadingObs$ = new Subject<boolean>();

    getData(): Observable<boolean> {
        return this.loadingObs$;
    }

    updateData(data: boolean) {
        this.loadingObs$.next(data);
    }
}