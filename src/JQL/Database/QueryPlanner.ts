class JQLDatabaseQueryPlanner {

    private database: JQLDatabase;

    constructor( database: JQLDatabase ) {

        this.database = database;

    }

    public scheduleStatement( statement: JQLStatement ): JQueryPromise<JQLStatementResult> {

        return (function( self: JQLDatabaseQueryPlanner, $: JQueryStatic ): JQueryPromise<JQLStatementResult> {

            return $.Deferred(function( defer ){

                defer.reject( new Error('Work in progress') );

            } ).promise();

        })(this, this.database.getJQuery());

    }

}