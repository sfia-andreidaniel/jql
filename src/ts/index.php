<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vendor/jquery-3.2.1.min.js"></script>
    <script src="JQL/Lexer/JQLGrammar.js"></script>
    <script src="build.js"></script>
</head>
<body>

<?php

$authorizationToken = json_decode(file_get_contents('http://127.0.0.1/?action=token&token_type=admin&user_id=1&form_id=1'));

?>

<script>

    (function ($) {

        window.db = (new JQLDatabase()).withJQuery($);

        db
            .withAuthorizationToken(<?php echo json_encode($authorizationToken) ?>)
            .withTable(
                'persons',
                JQLTable.createFromInMemoryArrayOfObjects(
                    [
                        {id: 1, name: "Jack", age: 12},
                        {id: 2, name: "Jill", age: 14},
                        {id: 3, name: "Betty", age: 32}
                    ],
                    [
                        {
                            name: "id",
                            type: EJQLTableColumnType.NUMBER,
                            default: null,
                            unique: true,
                            autoIncrement: true
                        },
                        {name: "name", type: EJQLTableColumnType.STRING, default: "", unique: false},
                        {name: "age", type: EJQLTableColumnType.NUMBER, default: 0, unique: false}
                    ]
                )
            )
            .withTable(
                'products',
                JQLTable.createFromInMemoryArrayOfObjects(
                    [
                        {id: 1, name: "VGA Card", ownerId: 1},
                        {id: 2, name: "CPU", ownerId: 1},
                        {id: 4, name: "Computer keyboard", ownerId: 3}
                    ]
                )
            )
            .withTable(
                'remote',
                JQLTable.createFromRemoteTableDefinition(
                    [
                        {
                            "name": "id",
                            "type": EJQLTableColumnType.NUMBER,
                            "default": null,
                            "unique": true,
                            "autoIncrement": true
                        },
                        {
                            "name": "email",
                            "type": EJQLTableColumnType.STRING,
                            "default": "",
                        },
                        {
                            "name": "age",
                            "type": EJQLTableColumnType.NUMBER
                        }
                    ]
                )
            )
            .withFunction('sum', function (a, b) {
                return a + b;
            });

    })(jQuery.noConflict());

</script>

</body>
</html>