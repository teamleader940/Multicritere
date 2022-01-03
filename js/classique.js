var array = [];
var ligne = 0;
var col = 0;
var clear = true;
$("#lol").on("click", function () {
    if (!clear) {
        $(".header>th").remove();
        $("#body>tr").remove();
        $("#MRresult>tr").remove();
        $("#result>tr").remove();
        array = [];
        ligne = 0;
        col = 0;
    }
    ligne = $("#nligne").val();
    col = $("#ncol").val();
    createTable(ligne, col);
    setupMR();
    clear = false;
});
$("#cal").on("click", function () {
    save("#body tr", array);
});

function createTable(ligne, col) {
    // Header
    var header = '<th scope="col">#</th>';
    for (let e = 0; e < col; e++) {
        header += ('<th scope="col">E' + (e + 1) + '</th>');
    }
    $(".header").append(header);
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
                arrayOfThisRow.push($(this).val());
            });
            arr.push(arrayOfThisRow);
        }

    });
    setup();
}

function setup() {

    wald_opt_lap();
    Savage();
}
// Wald
function avg(arr) {
    sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += parseFloat(arr[i]);
    }
    return parseFloat(sum / arr.length);
}

function wald_opt_lap() {
    for (let i = 0; i < ligne; i++) {
        var array_r = array[i];
        var min = Math.min(...array_r);
        var max = Math.max(...array_r);
        var moy = avg(array_r);
        var r_l = ('<tr><td>' + min + '</td><td>' + max + '</td><td>' + moy + '</td></tr>')
        $('#result').append(r_l);
        // Example
    }
}

function setupMR() {
    // Body
    var tbody = '';
    for (let i = 0; i < ligne; i++) {
        var l = ('<tr><th scope="row">I' + (i + 1) + '</th></tr>');
        tbody += l;
    }
    $("#MRresult").append(tbody);
}
// Savage
function Savage() {

    var maximums = [];

    for (let i = 0; i < col; i++) {
        var array_c = array.map(function (value, index) {
            return value[i];
        });
        maximums.push(Math.max(...array_c));
    }

    for (let l = 0; l < ligne; l++) {
        var matRL = '';
        var array_l = array[l];

        var max_reg = parseFloat(maximums[0]) - parseFloat(array_l[0]);
        for (let c = 0; c < col; c++) {
            var nreg = parseFloat(maximums[c]) - parseFloat(array_l[c]);
            if (nreg > max_reg) {
                max_reg = nreg;
            }
            matRL += '<td>' + nreg + '</td>';
        }
        console.log(max_reg);
        var reg_tbl = '<td>' + max_reg + '</td>';

        var css_reg = '#MRresult >tr:nth-child(' + (l + 1) + ')';
        $(css_reg).append(matRL);

        var css_regt = '#result >tr:nth-child(' + (l + 1) + ')';
        $(css_regt).append(reg_tbl);
    }
}