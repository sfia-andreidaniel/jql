class JQLStatementResult {

    private affectedRows: number;

    private affectingRows: boolean = false;

    public getAffectedRows(): number {
        return this.affectedRows;
    }

    public withAffectedRows(affectedRowsCount: number): this {
        this.affectedRows = ~~affectedRowsCount;
        return this;
    }

    public hasRows(): boolean {
        return false;
    }

}