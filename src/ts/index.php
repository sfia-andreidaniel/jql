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
    $authorizationToken = JQLMicroService::getInstance()->createAdminAuthenticationToken(1, 1);
    $tableSchema = JQLMicroService::getInstance()->getFormJQLConfiguration($authorizationToken);
} catch (\ContactForm\JQL\JQLMicroserviceError $e) {
    $authorizationToken = null;
    $tableSchema = null;
}


?>

<form method="post" id="create-table">
    <fieldset>
        <legend>Create table from file:</legend>
        <label>
            <span>Table name</span>
            <input type="text" name="name" placeholder="eg: persons"/>
        </label>
        <label>
            <span>Table namespace</span>
            <select name="namespace">
                <option value="private">Current form only</option>
                <option value="global">All forms where CSV connector is enabled</option>
            </select>
        </label>
        <label>
            <span>Storage engine</span>
            <select name="storage-engine">
                <option value="memory">Memory</option>
                <option value="remote">Server</option>
            </select>
        </label>
        <label>
            <span>Access mode</span>
            <select name="access-mode">
                <option value="r">Read</option>
                <option value="w">Write</option>
                <option value="rw">Read/Write</option>
            </select>
        </label>
        <label>
            <span>CSV File</span>
            <input type="file" name="file"/>
        </label>
        <label>
            <span>Field delimiter</span>
            <select name="field-delimiter">
                <option value="\t">TAB</option>
                <option value=",">,</option>
                <option value="|">|</option>
                <option value=";">;</option>
            </select>
        </label>
        <label>
            <span>Field enclosure</span>
            <select name="field-enclosure">
                <option value="&quot;">"</option>
                <option value="'">'</option>
            </select>
        </label>
        <label>
            <span>Enclose all fields</span>
            <input type="checkbox" name="enclose-all-fields"/>
        </label>
        <label>
            <span>Escape character</span>
            <select name="escape-character">
                <option value="\">\</option>
                <option value="#">#</option>
            </select>
        </label>
        <label>
            <span>Auto trim</span>
            <input type="checkbox" name="auto-trim"/>
        </label>
        <label>
            <span>Line terminator</span>
            <select name="line-terminator">
                <option value="\r\n">\r\n</option>
                <option value="\n">\n</option>
                <option value="\r">\r</option>
            </select>
        </label>
        <button>Create table</button>
    </fieldset>
</form>

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
                      placeholder="SELECT * FROM foo WHERE foo=bar ORDER BY moo DESC, car ASC LIMIT 2"></textarea>
        </label>
        <button data-role="run-query">Run</button>
        <div id="sql-result"></div>
    </fieldset>
</form>

<form method="post" id="config">
    <fieldset>
        <legend>Save JQL Configuration</legend>
        <label>
            <span>Configuration:</span>
            <textarea style="height: 100px" name="config"
                      placeholder="Paste here a JQL v.1.0 JSON configuration"></textarea>
        </label>
        <button data-role="save-config">Save</button>
        <div id="save-result"></div>
    </fieldset>
</form>

<script>

    (function ($) {

        window.db = (new JQL.Database).withJQuery($);

        $(function () {

            db
                .withAuthorizationToken(<?php echo json_encode($authorizationToken) ?>)
                .withRPCEndpointName("http://127.0.0.1/")
                .withTablesList( <?=json_encode(is_array($tableSchema) ? $tableSchema['tables'] : null);?> )
                .withFunction('sum', function (a, b) {
                    return a + b;
                });

        });

    })(jQuery.noConflict());

</script>

</body>
</html>