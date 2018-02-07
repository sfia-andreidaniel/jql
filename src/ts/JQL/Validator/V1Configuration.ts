class JQLValidatorV1Configuration {

    public static assertJQLV1ConfigurationStructure(structure: any) {

        if (!(structure instanceof Object)) {
            throw new Error("Object expected!");
        }

        if (undefined === structure.controlId) {
            throw new Error("Missing property \"controlId\"");
        }

        if ("string" !== typeof structure.controlId) {
            throw new Error("Property \"controlId\" type should be string");
        }

        if (undefined === structure.eventType) {
            throw new Error("Missing property \"eventType\"");
        }

        if ("number" !== typeof structure.eventType) {
            throw new Error("Property \"eventType\" type should be number");
        }

        if (!Array.isArray(structure.actions)) {
            throw new Error("Missing property \"actions\"");
        }

        if (undefined !== structure.isRule) {
            if ("boolean" !== typeof structure.isRule) {
                throw new Error("Property \"isRule\" type should be boolean|undefined");
            }
        }

        for (let i = 0, len = structure.actions.length; i < len; i++) {
            this.assertJQLV1EventActionStructure(structure.actions[ i ]);
        }

    }

    private static assertJQLV1EventActionStructure(action: any) {

        if (!(action instanceof Object)) {
            throw new Error("Action object expected!");
        }

        if (undefined === action.controlId) {
            throw new Error("Action property \"controlId\" type should be string");
        }

        if ("string" !== typeof action.controlId) {
            throw new Error("Action property \"controlId\" should be string");
        }

        if (undefined === action.jql) {
            throw new Error("Action property \"jql\" should be string");
        }

        if ("string" !== typeof action.jql) {
            throw new Error("Action property \"jql\" should be string");
        }

    }
}