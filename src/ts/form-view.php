<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vendor/jquery-3.2.1.min.js"></script>
    <script src="../build/demo.js"></script>
    <link rel="stylesheet" type="text/css" href="demo.css"/>

</head>
<body>

<?php

use ContactForm\JQL\JQLMicroService;

require_once __DIR__ . '/../autoloaders.php';

try {
    $authorizationToken = JQLMicroService::getInstance()->createAnonymousAuthenticationToken(1, 1);
    $jqlConfiguration = JQLMicroService::getInstance()->getFormJQLConfiguration($authorizationToken);
} catch (\ContactForm\JQL\JQLMicroserviceError $e) {
    $authorizationToken = null;
    $jqlConfiguration = null;
}

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
            <textarea style="height: 100px" name="jql"
                      placeholder="SELECT * FROM foo WHERE foo=bar ORDER BY moo DESC, car ASC LIMIT 2">REMOTE SELECT * FROM persons2 LIMIT 3</textarea>
        </label>
        <button data-role="run-query">Run</button>
        <div id="allowed-queries"></div>
        <div id="sql-result"></div>
    </fieldset>
</form>

<script>

    (function ($) {

        window.db = (new JQL.Database()).withJQuery($);

        $(function () {

            db
                .withAuthorizationToken(<?php echo json_encode($authorizationToken) ?>)
                .withRPCEndpointName("http://127.0.0.1/")
                .withTablesList( <?=
                    is_array($jqlConfiguration)
                        ?  json_encode($jqlConfiguration['tables'])
                        : '[]';
                ?>)
                .withFunction('sum', function (a, b) {
                    return a + b;
                });

        });

    })(jQuery.noConflict());

</script>

</body>
</html>