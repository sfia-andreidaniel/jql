class JQLV1ConfigurationDemoProvider {

    public static getConfig(): IJQLv1FormEventConfiguration[] {

        return [
            {
                eventType: EFormRuleEventType.ALL_EVENTS,
                controlId: "control_12322311",
                actions:   [
                    {
                        controlId: "control_123312",
                        jql:       "REMOTE SELECT * FROM persons2 LIMIT 3",
                    },
                    {
                        controlId: "control_2213",
                        jql:       "SELECT * FROM persons LIMIT 1",
                    },
                ],
                isRule:    false,
            },
        ];

    }

}