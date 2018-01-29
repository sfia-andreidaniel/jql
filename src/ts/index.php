<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vendor/jquery-3.2.1.min.js"></script>
    <script src="JQL/Lexer/JQLGrammar.js"></script>
    <script src="build.js"></script>
    <style>
        body > form {
            display: inline-block;
            vertical-align: top;
        }

        body > form  {
            width: 500px;
        }

        body > form label, body > form button {
            display: inline-block;
            height: 40px;
            box-sizing: content-box;
        }

        body > form > * {
            display: inline-block;
            vertical-align: middle;
            line-height: 34px;
        }

        body > form label > span {
            display: inline-block;
            width: 150px;
        }

        body > form label > span + input:not([type=checkbox]),
        body > form label > span + select {
            width: 300px;
            height: 34px;
            box-sizing: content-box;
            padding: 0;
            margin: 0;
        }
    </style>

</head>
<body>

<?php

$authorizationToken = json_decode(file_get_contents('http://127.0.0.1/?action=token&token_type=admin&user_id=1&form_id=1'));

$tableSchema = json_decode(file_get_contents('http://127.0.0.1?action=show-tables&auth=' . $authorizationToken), true);

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
        <button data-role="describe">Describe</button>
    </fieldset>
</form>

<script>

    (function ($) {

        window.db = (new JQLDatabase()).withJQuery($);

        db
            .withAuthorizationToken(<?php echo json_encode($authorizationToken) ?>)
            .withRPCEndpointName("http://127.0.0.1/")
            .withTablesList( <?=json_encode($tableSchema);?> )
            .withFunction('sum', function (a, b) {
                return a + b;
            });

    })(jQuery.noConflict());

</script>

</body>
</html>