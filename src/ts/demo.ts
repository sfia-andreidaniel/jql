declare var db: JQLDatabase;

class DummyAutoDatabaseBinder implements IQueryBindingProvider {

    public canBind(bindingName: string): boolean {
        return /^binding_test_[\d]+$/.test(bindingName);
    }

    public getBindedValue(bindingName: string): JQLPrimitive {
        return bindingName;
    }

}

(function ($: JQueryStatic) {

    $(function () {

        db
            .withAutoBindingProvider(new DummyAutoDatabaseBinder())
            .withTable("virtual_table", JQLVirtualTableDemo.create(db));

        let refreshTablesInAdminTableForm = function () {

            let tables = db.enumerateTables();

            $("#admin-table [name=table-list]").each(function () {

                let previousValue: string = this.value;

                while (this.options.length > 0) {
                    this.remove(0);
                }

                let blankOption: HTMLOptionElement = document.createElement("option");
                blankOption.text = "<select table>";
                blankOption.value = "";
                this.add(blankOption);

                for (let i = 0, len = tables.length; i < len; i++) {
                    let opt: HTMLOptionElement = document.createElement("option");
                    opt.text = opt.value = tables[ i ].name;
                    this.add(opt);
                }

                this.value = previousValue;

                if (this.selectedIndex === -1) {
                    this.value = "";
                }

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

            if (!confirm("Are you sure you want to delete table " + JSON.stringify(tableName) + "?")) {
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

        let describeTable = function (tableName) {

            if (tableName) {

                try {

                    let table   = db.getTable(tableName),
                        columns = table.describe(),
                        indexes = table.getIndexes() || [],
                        buffer  = "";

                    buffer += "<p><b>Table name:</b> " + tableName + "</p>";

                    buffer += "<p><b>Storage engine:</b> " + table.getStorageEngine() + "</p>";

                    buffer += `<table width="100%"><thead><tr><td>Column</td><td>Type</td><td>Index</td></tr></thead><tbody>`;

                    for (let i = 0, len = columns.length; i < len; i++) {

                        buffer += `<tr><td>` + columns[ i ].name + `</td><td>` + columns[ i ].type + `</td>`;

                        let indexText           = "",
                            indexFound: boolean = false;

                        for (let j = 0, n = indexes.length; j < n; j++) {

                            if (indexes[ j ].getDescriptors()[ 0 ].name !== columns[ i ].name) {
                                continue;
                            }

                            indexFound = true;

                            if ( table.isIndexable() ) {

                                indexText += "<label>UNI: <input type=checkbox name=\"uniq_" + columns[ i ].name + "\" " + (indexes[ j ].isUnique()
                                    ? "checked"
                                    : "") + "/></label>";

                                if (columns[ i ].type === EJQLTableColumnType.NUMBER) {

                                    indexText += "<label>AUTO: <input type=radio name=\"autoincrement\" value=\"" + columns[ i ].name + "\" " + (indexes[ j ].isAutoIncrement()
                                        ? "checked"
                                        : "") + "/></label>";

                                }

                            }

                        }

                        if (!indexFound) {

                            if ( table.isIndexable() ) {

                                indexText += "<label>UNI: <input type=checkbox name=\"uniq_" + columns[ i ].name + "\" /></label>";

                                if (columns[ i ].type === EJQLTableColumnType.NUMBER) {

                                    indexText += "<label>AUTO: <input type=radio name=\"autoincrement\" value=\"" + columns[ i ].name + "\" /></label>";

                                }

                            }

                        }

                        if ( table.isIndexable() ) {
                            indexText += "<a data-role=\"drop-index\" href=\"javascript:;\">x</a>";
                        } else {
                            indexText = 'Not Supported';
                        }

                        buffer += `<td>${indexText}</td></tr>`;

                    }

                    buffer += "<tr class=\"footer\"><td colspan=\"2\">&nbsp;</td><td><button data-role=\"apply-indexes\">Apply Indexes</button></td></tr>";

                    buffer += `</tbody></table>`;

                    $("#describe-table").html(buffer);

                }
                catch (e) {
                    $("#describe-table").text(e.toString);
                    console.error(e);
                }

            } else {
                $("#describe-table").text("");

            }
        };

        let applyTableIndexModifications = function () {

            let indexes: IJQLTableIndexDescriptor[] = [],
                tableName: string                   = $("#admin-table select[name=table-list]").val();

            if (!tableName) {
                return;
            }

            $("#admin-table table").each(function () {

                $(this).find("tr").each(function () {

                    let indexName: string        = null,
                        isUnique: boolean        = null,
                        isAutoIncrement: boolean = false;

                    $(this).find("input[type=checkbox][name^=\"uniq_\"]").each(function () {

                        indexName = $(this).attr("name").substr(5);
                        isUnique = this.checked;

                    });

                    if (null === indexName) {
                        return;
                    }

                    $(this).find("input[type=radio][name=autoincrement]").each(function () {
                        isAutoIncrement = this.checked;
                    });

                    if (!isUnique && !isAutoIncrement) {
                        return;
                    }

                    if (isAutoIncrement) {
                        isUnique = true;
                    }

                    indexes.push({
                        name:          indexName,
                        autoIncrement: isAutoIncrement,
                        unique:        isUnique,
                    });

                });

                indexes = indexes.length
                    ? indexes
                    : null;

                db.getTable(tableName).alterIndexes(indexes).then(() => {

                    $(this).find("tr.footer > td:first-child").html("<span class=success>SUCCESS</span>");

                }).fail((e) => {

                    $(this).find("tr.footer > td:first-child").html("<span class=error>FAILED</span>");

                });

            });


        };

        $("#admin-table").each(function () {

            $(this)
                .on("submit", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                })
                .on("click", "button[data-role]", function (e) {

                    let buttonRole: string        = this.getAttribute("data-role"),
                        selectedTableName: string = $(this).closest("form").find("[name=table-list]").val();

                    if (!selectedTableName) {
                        return;
                    }

                    switch (buttonRole) {
                        case "drop-table":
                            dropTable(selectedTableName);
                            break;
                        case "apply-indexes":
                            applyTableIndexModifications();
                            break;
                    }

                })
                .on("click", "table input[type=radio], table input[type=checkbox]", function () {

                    $(this).closest("table").addClass("modified");

                })
                .on("click", "a[data-role=drop-index]", function () {

                    $(this).closest("td").find("input:checked").each(function () {
                        this.checked = false;
                    });

                    $(this).closest("table").addClass("modified");

                });

        });

        $("body").on("change", "#admin-table [name=table-list]", function () {
            describeTable(this.value);
        });

        let nl2br = function (s: string): string {
            return String(s || "")
                .replace(/[\r\n]+/g, "\n")
                .split("\n").join("<br />");
        };

        let htmlentities = (function () {

            let escaper = document.createElement("div");

            return function (s: string): string {
                escaper.textContent = String(s || "");
                return escaper.innerHTML;
            };

        })();

        let castColumnToString = function (col: JQLPrimitive): string {
            if (null === col) {
                return "<NULL>";
            } else if (true === col) {
                return "TRUE";
            } else if (false === col) {
                return "FALSE";
            } else if ("string" === typeof col) {
                return col;
            } else {
                return String(col);
            }
        };

        let dumpSQLResult = function (result: JQLStatementResultSelect): string {

            let buffer: string = "<table style=\"width: 100%\"><thead><tr>",
                rows           = result.getRows(),
                cols: string[] = [];

            if (!rows.length) {
                return "0 rows";
            }

            let firstRow = rows[ 0 ];

            for (let colName in firstRow) {
                buffer += "<td>" + htmlentities(colName) + "</td>";
                cols.push(colName);
            }

            buffer += "</tr></thead><tbody>";

            for (let i = 0, len = rows.length; i < len; i++) {
                buffer += "<tr>";
                for (let j = 0, n = cols.length; j < n; j++) {
                    buffer += "<td>" + htmlentities(castColumnToString(rows[ i ][ cols[ j ] ])) + "</td>";
                }
                buffer += "</tr>";
            }

            buffer += "</tbody></table>";

            return buffer;

        };

        $("#query").each(function () {

            $(this).on("submit", function (e) {
                e.preventDefault();
                e.stopPropagation();

                $("#sql-result").html("");

                let statement: JQLStatement;

                try {
                    statement = db.createStatement($(this).find("[name=jql]").val());
                }
                catch (e) {

                    console.error(e);

                    $("#sql-result").html("<div class=error>" + nl2br(e.toString()) + "</div>");
                    return;

                }

                $("#sql-result").html("executing...");


                let queryStartTime = +new Date;

                db.executeStatement(statement).then(function (result: JQLStatementResult) {

                    $("#sql-result").html("<div class=success>Completed in " + ((+new Date - queryStartTime)) + " milliseconds");

                    if (!result.hasRows()) {

                        $("#sql-result").append(result.getAffectedRows() + " rows affected");

                    } else {

                        $("#sql-result").append(dumpSQLResult(<JQLStatementResultSelect>result));

                    }

                }).fail(function (e) {

                    $("#sql-result").html("<div class=error>" + nl2br(e instanceof Error
                        ? e.toString()
                        : JSON.stringify(e)) + "</div>");

                });

            });

        });

        $("#config").each(function () {

            $(this).on("submit", function (e) {

                e.preventDefault();
                e.stopPropagation();

                try {

                    let config: IJQLv1FormEventConfiguration[] = JSON.parse($(this).find("[name=config]").val());

                    db.saveJQLFormConfiguration(config).then(() => {

                        $("#save-result").html("<span class=success>SAVED</span>");

                    }).fail((e) => {

                        $("#save-result").html("<span class=error>" + e.toString() + "</span>");

                    });

                }
                catch (e) {

                    $(this).find("#save-result").html("<span class=error>" + e.toString() + "</span>");

                }

            });

            $(this).find("[name=config]").val(
                JSON.stringify(
                    JQLV1ConfigurationDemoProvider.getConfig(),
                    undefined,
                    4,
                ),
            );

            $(this).find("#allowed-queries").each(function () {

            });

        });

    });


})(jQuery);
