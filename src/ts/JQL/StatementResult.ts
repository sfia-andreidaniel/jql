class JQLStatementResult {

    private affectedRows: number;

    public getAffectedRows(): number {
        return this.affectedRows;
    }

    public withAffectedRows( affectedRowsCount: number ): this {
        this.affectedRows = ~~affectedRowsCount;
        return this;
    }

}