declare var db: JQLDatabase;

(function ($: JQueryStatic) {

    $(function () {

        $("#create-table").on("submit", function (e) {

            e.preventDefault();
            e.stopPropagation();

            let request: IJQLCreateTableFromCSVFileRequest = {

                csvFile:             $(this).find("[name=file]").get(0)['files'][ 0 ] || null,
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

            db.createTableFromCSVFile( request ).then(function(t: any){

                alert(JSON.stringify(t) );

            }).fail(function(e){

                console.error(e);

            });

        });

    });

})(jQuery);
