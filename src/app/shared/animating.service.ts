import {
    Injectable,
	Component,
	OnInit,
	Output,
	EventEmitter
 } from '@angular/core';

 @Injectable()
export class AnimatingService {
    @Output() loadingPage = new EventEmitter()
    @Output() stopLoadingPage = new EventEmitter()
    
    public loadPage(){
        this.loadingPage.emit()
        console.log('animating service: loadingPage.emit')
    }
    public stopLoadPage(){
        this.stopLoadingPage.emit()
        console.log('animating service: stopLoadingPage.emit')
    }
}