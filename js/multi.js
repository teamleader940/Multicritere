var array = [];
var Proba = [];
var ligne = 0;
var col = 0;
var clear = true;
$("#lol").on("click", function () {
    if (!clear) {
        $(".header>th").remove();
        $("#body>tr").remove();
        $("#proba>th").remove();
        $("#result>tr").remove();
        array = [];
        ligne = 0;
        col = 0;
    }
    ligne = $("#nligne").val();
    col = $("#ncol").val();
    createTable(ligne, col);
    clear = false;
});
$("#cal").on("click", function () {
    save("#body tr", array);
    save("#proba th", Proba);
    esp();
});

function createTable(ligne, col) {
    // Header
    var header = '<th scope="col">#</th>';
    var footer = '<th scope="col">Proba</th>';
    for (let e = 0; e < col; e++) {
        header += ('<th scope="col">E' + (e + 1) + '</th>');
        footer += ('<th scope="col"><input class="form-control datasE"></th>');
    }
    $(".header").append(header);
    $("#proba").append(footer);
    // Body
    var tbody = '';
    for (let i = 0; i < ligne; i++) {
        var l = ('<tr><th scope="row">I' + (i + 1) + '</th>');
        for (let e = 0; e < col; e++) {
            l += ('<td><input class="form-control datasE"></td>');
        }
        l += '</tr>';
        tbody += l;
    }
    $("#body").append(tbody);
}


function save(tr, arr) {
    $(tr).each(function () {
        var arrayOfThisRow = [];
        var tableData = $(this).find('input');
        if (tableData.length > 0) {
            tableData.each(function () {
                arrayOfThisRow.push(parseFloat($(this).val()));
            });
            arr.push(arrayOfThisRow);
        }
    });
}

function esp() {
    for (let i = 0; i < ligne; i++) {
        var array_l = array[i];
        var res = 0;
        for (let c = 0; c < col; c++) {
            res += parseFloat(array_l[c]) * Proba[c];
        }
        $("#result").append('<tr><td>' + res + '</td></tr>');
    }
}