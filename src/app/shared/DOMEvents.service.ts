import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()

export class DOMEvents{

    private doc: Document

    constructor(@Inject(DOCUMENT) doc: any ){
        this.doc = doc
    }

    // PUBLIC METHODS

    // Trigger the given event on the document root.
    public triggerOnDocument( eventType: string): Event {
        return(this.triggerOnElement(this.doc, eventType))
    }

    // Trigger the given event configuration on the given element.
    public triggerOnElement(
        nativeElement: any,
        eventType: string,
        bubbles: boolean = true,
        cancelable: boolean = false
    ) : Event {
        var customEvent = this.createEvent(eventType, bubbles, cancelable)
        nativeElement.dispatchEvent(customEvent)
        return(customEvent)
    }

    //PRIVATE METHODS

    // Create and return a custom event with the given configuration.
    private createEvent(
        eventType: string,
        bubbles: boolean,
        cancelable: boolean
    ) : Event {

        // IE (shakes fist) uses some other kind of event initialization. As such,
        // we'll default to trying the "normal" event generation and then fallback to
        // using the IE version.
        try {
            var customEvent: any = new CustomEvent(
                eventType,
                {
                    bubbles: bubbles,
                    cancelable: cancelable
                }

            )
        } catch (error){
            var customEvent: any = this.doc.createEvent( "CustomEvent")

            customEvent.initCustomEvent( eventType, bubbles, cancelable)
        }
        return(customEvent)
    }
}