import { Injectable } from '@angular/core'

@Injectable()

export class WindowDimensionsService {
    public winHeight: number = window.innerHeight;
    public winWidth: number = window.innerWidth;
    constructor(){}
}
