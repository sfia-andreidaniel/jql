class JQLDatabaseQueryPlanner {

    private queryId: number = 0;

    private database: JQLDatabase;

    private queue: IJQLPlannerQueueEntry[] = [];

    private running: boolean = false;

    constructor(database: JQLDatabase) {

        this.database = database;

    }

    public scheduleStatement(statement: JQLStatement, strategy: IJQLQueryExecuteStrategy): JQueryPromise<JQLStatementResult> {

        return (function (self: JQLDatabaseQueryPlanner, $: JQueryStatic): JQueryPromise<JQLStatementResult> {

            return <any>$.Deferred(function (defer) {

                self.queryId++;

                (<any>self.queue).push({
                    queryId: self.queryId,
                    statement: statement,
                    strategy: strategy,
                    defer: defer,
                });

                if (1 === self.queue.length && !self.running) {
                    self.next();
                }

            }).promise();

        })(this, this.database.getJQuery());

    }

    private next() {

        if (this.running) {
            return;
        }

        let item: IJQLPlannerQueueEntry = this.queue.shift();

        if (undefined === item) {
            return;
        }

        this.running = true;

        item.strategy().then(function (result: JQLStatementResult) {

            item.defer.resolve(result);

        }).fail(function (e) {

            item.defer.reject(e);

        }).always(() => {

            this.running = false;

            if (0 !== this.queue.length) {
                this.next();
            }

        });

    }

}