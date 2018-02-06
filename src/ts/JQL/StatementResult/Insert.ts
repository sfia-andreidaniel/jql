class JQLStatementResultInsert extends JQLStatementResult {

    private lastInsertId: number;

    public getLastInsertId(): number {
        return this.lastInsertId;
    }

    public withLastInsertId(lastInsertId: number): this {
        this.lastInsertId = lastInsertId;
        return this;
    }

}