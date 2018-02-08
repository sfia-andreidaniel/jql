<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vendor/jquery-3.2.1.min.js"></script>
    <script src="JQL/Lexer/JQLGrammar.js"></script>
    <script src="build.js"></script>
    <link rel="stylesheet" type="text/css" href="demo.css" />

</head>
<body>

<?php

$authorizationToken = json_decode(file_get_contents('http://127.0.0.1/?action=token&token_type=viewer&user_id=1&form_id=1'));
$tableSchema = json_decode(file_get_contents('http://127.0.0.1?action=show-tables&auth=' . $authorizationToken), true);

?>

<form method="post" id="admin-table">
    <fieldset>
        <legend>Tables</legend>
        <label>
            <span>Table:</span>
            <select name="table-list">
                <option value="">Loading...</option>
            </select>
        </label>
        <button data-role="drop-table">Drop</button>
        <div id="describe-table">

        </div>
    </fieldset>
</form>

<form method="post" id="query">
    <fieldset>
        <legend>Execute JQL Query:</legend>
        <label>
            <span>JQL</span>
            <textarea style="height: 100px" name="jql" placeholder="SELECT * FROM foo WHERE foo=bar ORDER BY moo DESC, car ASC LIMIT 2">REMOTE SELECT * FROM persons2 LIMIT 3</textarea>
        </label>
        <button data-role="run-query">Run</button>
        <div id="allowed-queries"></div>
        <div id="sql-result"></div>
    </fieldset>
</form>

<script>

    (function ($) {

        window.db = (new JQLDatabase()).withJQuery($);

        $(function () {

            db
                .withAuthorizationToken(<?php echo json_encode($authorizationToken) ?>)
                .withRPCEndpointName("http://127.0.0.1/")
                .withTablesList( <?=json_encode($tableSchema);?> )
                .withFunction('sum', function (a, b) {
                    return a + b;
                });

        });

    })(jQuery.noConflict());

</script>

</body>
</html>