import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({ selector: '[mouseWheel]' }) 

export class MouseWheelDirective {

    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

    deltas: any[] = [null, null, null, null, null, null, null, null, null];
    lock: number = 0;
    seen: number = 0;


  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    //var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    var delta = event.wheelDelta || -event.detail;
    this.update(delta);

    if(this.hasPeak() && delta < 0) {
        this.mouseWheelUp.emit(event);
    } else if(this.hasPeak() && delta > 0) {
        this.mouseWheelDown.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if(event.preventDefault) {
        event.preventDefault();
    }
  }

  update(delta: any) {
    if (this.hasPeak()) {
        this.lock  = 40;
        this.seen++;
    }
    this.deltas.shift();
    this.deltas.push(Math.abs(delta));
  }


  hasPeak() {
      if (this.lock > 0) {
          this.lock--;
          return false
      }

      if (this.deltas[0] == null){
        return false;
      }

      if (
        this.deltas[0] <  this.deltas[4] &&
        this.deltas[1] <= this.deltas[4] &&
        this.deltas[2] <= this.deltas[4] &&
        this.deltas[3] <= this.deltas[4] &&
        this.deltas[5] <= this.deltas[4] &&
        this.deltas[6] <= this.deltas[4] &&
        this.deltas[7] <= this.deltas[4] &&
        this.deltas[8] <  this.deltas[4]
      ) 
      {
          return true;
      }

      return false;
  }

}