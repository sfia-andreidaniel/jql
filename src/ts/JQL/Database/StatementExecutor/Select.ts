class JQLDatabaseStatementExecutorSelect implements IDatabaseStatementExecutor {

    private statement: JQLStatementSelect;

    private db: JQLDatabase;

    constructor(statement: JQLStatementSelect, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {

        return (): JQueryDeferred<JQLStatementResult> => {

            return <any>this.db.getJQuery().Deferred((defer) => {

                try {

                    let rows: object[];

                    // SELECT ROWS

                    if (!this.statement.getTable()) {

                        rows = [this.createSingleStatementRow()];

                    } else {

                        rows = this.applyLimit(this.applySorting(this.getStatementCandidateRows()));

                    }

                    let result = (new JQLStatementResultSelect()).addRows(rows);

                    // EXECUTE UNION

                    if (this.statement.getUnion()) {

                        (new JQLDatabaseStatementExecutorSelect(this.statement.getUnion(), this.db)).execute()().then(function (unionResult: JQLStatementResultSelect) {

                            result.addRows(unionResult.getRows());

                            defer.resolve(result);

                        }).fail(function (e) {

                            defer.reject(e);

                        });

                    } else {

                        defer.resolve(result);

                    }

                } catch (e) {

                    console.error(e);

                    defer.reject('Failed to execute INSERT statement!' );

                }

            }).promise();

        }

    }

    private createSingleStatementRow(): object {

        let result = Object.create(null),
            context: JQLRow = new JQLRow([], [], 0),
            fields = this.statement.getFields(),
            exprResult: JQLPrimitive,
            fieldName: string;

        if (fields.isSelectingAllFields()) {
            return result;
        }

        for (let i = 0, fieldsList = <JQLStatementSelectFieldsListSpecific>fields, specificFields = fieldsList.getFields(), len = specificFields.length; i < len; i++) {

            fieldName = specificFields[i].getLiteral();

            exprResult = specificFields[i].getExpression().compute(context);

            if (null === fieldName) {
                fieldName = specificFields[i].getExpression().getLiteral();
            }

            result[fieldName] = exprResult;

        }

        return result;

    }

    private getStatementCandidateRows(): object[] {

        let table: JQLTableStorageEngineInMemory = <JQLTableStorageEngineInMemory>this.db.getTable(this.statement.getTable().getName()),
            iterator                             = table.createIterator(),
            row: JQLRow,
            result: object[]                     = [],
            tableFieldsList                      = table.describe(),
            statementFieldsList                  = this.statement.getFields(),
            isAllFields: boolean                 = statementFieldsList.isSelectingAllFields(),
            specificFieldsList                   = <JQLStatementSelectFieldsListSpecific>statementFieldsList,
            specificFieldsListCollection: JQLStatementSelectField[],
            o: object,
            exprResult: JQLPrimitive,
            fieldName: string,
            addRow: boolean,
            where = this.statement.getFilter();

        if (!isAllFields) {
            specificFieldsListCollection = specificFieldsList.getFields();
        }

        while (row = iterator.next()) {

            if (!where) {
                addRow = true;
            } else {
                addRow = !!where.compute(row);
            }

            if (addRow) {

                if (isAllFields) {

                    result.push(row.toObject());

                } else {

                    o = Object.create(null);

                    for (let i = 0, len = specificFieldsListCollection.length; i < len; i++) {

                        fieldName = specificFieldsListCollection[i].getLiteral();

                        exprResult = specificFieldsListCollection[i].getExpression().compute(row);

                        if (null === fieldName) {
                            fieldName = specificFieldsListCollection[i].getExpression().getLiteral();
                        }

                        o[fieldName] = exprResult;

                    }

                    result.push(o);

                }

            }

        }

        return result;
    }

    private applySorting( rows: object[] ): object[] {

        let sorter = this.statement.getSorter();

        if ( !sorter || rows.length < 2 ) {
            return rows;
        }

        if ( sorter.isRandom() ) {
            return JQLUtils.shuffleArray( rows );
        }

        let expressions = (<JQLSorterStrategyByExpression>sorter).getSortExpressions(),
            numExpressions = expressions.length;

        let sortFunction = (function(){

            let walkers: any[] = [];

            for ( let i=0; i<numExpressions; i++ ) {

                if ( i === numExpressions - 1 ) {

                    // LAST WALKER

                    walkers.push((function(i){

                        return function( a: JQLRow, b: JQLRow ): number {

                            let exprA = expressions[i].getExpression().compute(a),
                                exprB = expressions[i].getExpression().compute(b),
                                result: number = JQLUtils.compare( exprA, exprB );

                            if ( expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING ) {
                                result = -result;
                            }

                            return result;

                        }

                    })(i));


                } else {

                    // NOT LAST WALKER

                    walkers.push((function(i){

                        return function( a: JQLRow, b: JQLRow ): number {

                            let exprA = expressions[i].getExpression().compute(a),
                                exprB = expressions[i].getExpression().compute(b),
                                result: number = JQLUtils.compare( exprA, exprB );

                            if ( expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING ) {
                                result = -result;
                            }

                            if ( 0 === result ) {
                                return walkers[ i + 1 ]( a, b );
                            } else {
                                return result;
                            }
                        }

                    })(i));
                }

            }

            return function(a: object, b: object): number {

                return walkers[0](
                    JQLRow.createFromObject(a),
                    JQLRow.createFromObject(b)
                );

            }


        })();

        return rows.sort( sortFunction );

    }

    private applyLimit( rows: object[] ): object[] {

        let limit = this.statement.getLimit();

        if ( !limit ) {
            return rows;
        }

        return rows.slice(limit.getSkip(), limit.getSkip() + limit.getLimit());

    }

}