import { Injectable } from "@angular/core";

import * as ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';


//declare let ScrollMagic: any;

@Injectable()

export class ScrollMagicService {
    public ScrollMagic : any;
    public controller :any;
    public scene : any;
    
    constructor(){
        this.ScrollMagic = ScrollMagic;
        this.controller = new this.ScrollMagic.Controller();
        this.scene = new this.ScrollMagic.Scene();
    }
    
    /*scene(duration?: any, offset?: number, triggerElement?: any, triggerHook?: any, reverse?: boolean, loglevel?: number){
        ScrollMagic.Scene(duration, offset, triggerElement, triggerHook, reverse, loglevel);
        
    }

    controller(){
        ScrollMagic.Controller();
    }

    setClassToggle(element: string, classes: string){
        ScrollMagic.Scene.setClassToggle(element, classes);
    }*/
    
}