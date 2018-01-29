
interface IEventCallbackCollection {
    [key: string]: IEventEmitterCallback[];
}

class EventEmitter implements EventEmitterInterface {

    private disableEventTriggering: boolean;

    private syncMode: boolean;

    private events: IEventCallbackCollection;

    public isEventTriggeringEnabled(): boolean {
        return !!!this.disableEventTriggering;
    }

    public on(eventName: string, callback: IEventEmitterCallback): this {

        if ( this.events === undefined ) {
            this.events = {};
        }

        if ( this.events[ eventName ] === undefined ) {
            this.events[ eventName ] = [];
        }

        this.events[ eventName ].push( callback );

        return this;
    }

    public off( eventName: string, callback?: IEventEmitterCallback ): this {

        if ( this.events === undefined ) {
            return this;
        }

        if ( this.events[ eventName ] === undefined ) {
            return this;
        }

        if ( callback === undefined ) {

            delete this.events[ eventName ];

        } else {

            for ( let i=0, len = this.events[eventName].length; i<len; i++ ) {
                if ( this.events[eventName][i] === callback ) {
                    this.events[eventName].splice( i, 1 );
                    break;
                }
            }

            if ( this.events[eventName].length === 0 ) {
                delete this.events[eventName];
            }

        }

        return this;

    }

    public disableEvents(): this {
        this.disableEventTriggering = true;
        return this;
    }

    public enableEvents(): this {
        this.disableEventTriggering = undefined;
        return this;
    }

    public enableSyncMode(): this {
        this.syncMode = true;
        return this;
    }

    public disableSyncMode(): this {
        this.syncMode = undefined;
        return this;
    }

    public trigger( eventName, ...eventArgs: any[] ): this {

        if ( !this.disableEventTriggering && this.events !== undefined ) {

            if ( this.events[ eventName ] !== undefined ) {

                (function(self: EventEmitter ) {

                    for ( let i=0, len = self.events[eventName].length; i<len; i++ ) {

                        if ( self.syncMode ) {

                            self.events[eventName][i].apply(self, eventArgs);

                        } else {

                            (function (callback: IEventEmitterCallback) {

                                setTimeout(function () {
                                    callback.apply(self, eventArgs);
                                }, 0);

                            })(self.events[eventName][i]);

                        }

                    }

                })(this);

            }

        }

        return this;

    }

}
