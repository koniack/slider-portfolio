import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable'

@Injectable()

export class ProjectDetailIdService {
    public id: number;

    getId(){
        return this.id;
    }

    updateId(id: number){
        this.id = id;
    }

}
