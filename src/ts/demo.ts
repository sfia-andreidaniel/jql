declare var db: JQLDatabase;

(function ($: JQueryStatic) {

    $(function () {

        let refreshTablesInAdminTableForm = function () {

            let tables = db.enumerateTables();

            $("#admin-table [name=table-list]").each(function () {

                let previousValue: string = this.value;

                while (this.options.length > 0) {
                    this.remove(0);
                }

                for (let i = 0, len = tables.length; i < len; i++) {
                    let opt: HTMLOptionElement = document.createElement("option");
                    opt.text = opt.value = tables[ i ].name;
                    this.add(opt);
                }

                this.value = previousValue;

            });
        };

        db.on("schema-changed", function () {
            console.warn("schema-changed");
            refreshTablesInAdminTableForm();
        });

        $("#create-table").on("submit", function (e) {

            e.preventDefault();
            e.stopPropagation();

            let request: IJQLCreateTableFromCSVFileRequest = {

                csvFile:             $(this).find("[name=file]").get(0)[ "files" ][ 0 ] || null,
                tableName:           $(this).find("[name=name]").val().trim(),
                tableNamespace:      $(this).find("[name=namespace]").val(),
                tableAccessMode:     $(this).find("[name=access-mode]").val(),
                tableStorageEngine:  $(this).find("[name=storage-engine]").val(),
                csvFieldDelimiter:   $(this).find("[name=field-delimiter]").val(),
                csvFieldEnclosure:   $(this).find("[name=field-enclosure]").val(),
                csvEncloseAllFields: $(this).find("[name=enclose-all-fields]").is(":checked"),
                csvEscapeCharacter:  $(this).find("[name=escape-character]").val(),
                csvAutoTrim:         $(this).find("[name=auto-trim]").is(":checked"),
                csvLineTerminator:   $(this).find("[name=line-terminator]").val(),
            };

            db.createTableFromCSVFile(request).then(function (t: any) {

                alert(JSON.stringify(t));

            }).fail(function (e) {

                console.error(e);

            });

        });

        let dropTable = function (tableName) {

            if (!confirm("Are you sure you want to delete table " + JSON.stringify(tableName)  + "?" )) {
                return;
            }

            db.dropTable(tableName)
                .then(function () {
                    alert("Table " + JSON.stringify(tableName) + " has been deleted!");
                })
                .fail(function (e) {
                    console.error(e);
                    alert("Failed to delete table " + JSON.stringify(tableName) + ": " + e.toString());
                });

        };

        $("#admin-table").each(function () {

            $(this).on("submit", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $(this).on("click", "button[data-role]", function (e) {

                let buttonRole: string        = this.getAttribute("data-role"),
                    selectedTableName: string = $(this).closest("form").find("[name=table-list]").val();

                if (!selectedTableName) {
                    return;
                }

                switch (buttonRole) {
                    case "drop-table":
                        dropTable(selectedTableName);
                        break;

                    case "describe-table":
                        break;
                }

            });

        });

    });

})(jQuery);
