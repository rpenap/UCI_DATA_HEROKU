function check() {
    if (document.getElementById("request").value == "default") {
        document.getElementById("request").setCustomValidity("Selecciona el tipo de solicitud");
    } else {
        document.getElementById("request").setCustomValidity("");
    }
    if (document.getElementById("program").value == "0") {
        document.getElementById("program").setCustomValidity("Selecciona el programa");
    } else {
        document.getElementById("program").setCustomValidity("");
    }
}


//document.getElementById("btn").onclick = check;
//document.getElementById("request").onchange = check;
//document.getElementById("program").onchange = check;
//document.getElementById("modifClase").onchange = check;

$(function () {    
    $('#Sel_UCI').mousedown(function () {
        var seleccionUCI = document.getElementById("Sel_UCI").value;

        console.log("el ID de la UCI ES ..........................");
        console.log(seleccionUCI);
        $.ajax({
            type: 'POST',
            //data: { seleccionUCI },
            //data: { fecha_Clase },
            //data2: { IdEscenario },
            url: '/admin/generarUCI',
            success: function (data) {
                var option = $('#Sel_UCI');
                option.html('');
                data.forEach(dat => {
                    //option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                    //option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                    //option.append(`<option value="${dat.idHorarios}">${dat.fecha}</option>`);
                    console.log("AJAX FUNCTION ESCOGER UCI______________****************************");
                    option.append(`<option value="${dat.id_UCI}">${dat.UCI}</option>`);
                })
            }
        })
    });

    $('#Sel_Cama').mousedown(function () {
        var seleccionUCI = document.getElementById("Sel_UCI").value;
        console.log("el ID de la UCI ES ..........................");
        console.log(seleccionUCI);
        $.ajax({
            type: 'POST',
            data: { seleccionUCI },
            //data: { fecha_Clase },
            //data2: { IdEscenario },
            url: '/admin/generarCama',
            success: function (data) {
                var option = $('#Sel_Cama');
                var UCI_Sel = seleccionUCI;
                option.html('');
                data.forEach(dat => {
                    //option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                    //option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                    //option.append(`<option value="${dat.idHorarios}">${dat.fecha}</option>`);
                    console.log("AJAX FUNCTION ESCOGER Cama______________****************************");
                    option.append(`<option value="${dat.numero_Cama}">${dat.numero_Cama}</option>`);
                })
            }
        })
    });

});

$(function () {
    $('#program').change(function () {
        //var program = document.getElementById("program").value;
        var fff = document.getElementById("fff").value;
        document.getElementById("fechaXXX").value = fff;
        console.log("el ID de la CLASE ES ..........................");
        console.log(program);
        $.ajax({
            type: 'POST',
            //data: { program },
            data: { fff },
            url: '/admin/escenarios',
            success: function (data) {
                var option = $('#subject');
                var option2 = $('#program2');
                console.log("option2");
                console.log(option2);
                option.html('');
                option2.html('');
                data.forEach(dat => {
                    //option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                    //option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                    //option.append(`<option value="${dat.idHorarios}">${dat.fecha}</option>`);
                    option2.append(`<option value="${dat.idClase}">${dat.idClase}</option>`)
                    option.append(`<option value="${dat.idClase}">${dat.horario_Clase}</option>`);
                })
            }
        })
    });
    
    $('#escenario').mousedown(function () {
        //var program = document.getElementById("program").value;
        var fecha_Clase = document.getElementById("fechaModifClase").value;
        var IdEscenario = document.getElementById("escenario").value;
        //document.getElementById("fechaModifClase").value = [fecha_Clase];
        console.log("el ID de la CLASE ES ..........................");
        console.log(fecha_Clase);
        $.ajax({
            type: 'POST',
            //data: { program },
            data: { fecha_Clase },
            data2: { IdEscenario },
            url: '/admin/generarEscenarios',
            success: function (data) {
                var option = $('#escenario');
                option.html('');
                data.forEach(dat => {
                    //option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                    //option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                    //option.append(`<option value="${dat.idHorarios}">${dat.fecha}</option>`);
                    console.log("AJAX FUNCTION MODIF CLASE______________****************************");
                    option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                })
            }
        })
    })

    

    
    /*
    $('#program').change(function () {
        var program = document.getElementById("program").value;
        console.log(program);
        $.ajax({
            type: 'POST',
            data: { program },
            url: '/admin/subject',
            success: function (data) {
                var option = $('#subject');
                option.html('');
                data.forEach(dat => {
                    option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                })
            }
        })
    });*/
});

/*
$(function () {
    $('#btnModifClase').mousedown(function () {
        var program = 'hola-...................';
        var idClase = document.getElementById("idClase");
        console.log(program);
        console.log(idClase);
    });
});*/



$(function () {
    $('#escenarioProfile').change(function () {
        console.log("IdHora de la CLASE ES ..........................");
        var fecha_Clase = document.getElementById("fechaAddClase").value;
        var IdEscenario = document.getElementById("escenarioProfile").value;
        console.log("Hora y Escenario de la CLASE ES ..........................");
        console.log(fecha_Clase);
        console.log(IdEscenario);
        $.ajax({
            type: 'POST',
            data: { fecha_Clase, IdEscenario },
            //data2: { IdEscenario },
            url: '/admin/generarHorarios',
            success: function (data) {
                var option = $('#idHora');
                option.html('');
                option.append(`<option value="0">Selecciona la Hora</option>`);
                data.forEach(dat => {
                    console.log("AJAX FUNCTION hora de la  CLASE______________****************************");
                    option.append(`<option value="${dat.horario_Clase}">${dat.horario_Clase}</option>`);
                    console.log(dat.idClase);
                })
            }
        })
    });

});

$(function () {
$('#idHora').change(function () {
    console.log("Id de la CLASE ES ..........................");
    var fecha_Clase = document.getElementById("fechaAddClase").value;
    var IdEscenario = document.getElementById("escenarioProfile").value;
    var IdHora = document.getElementById("idHora").value;
    console.log("Hora y Escenario de la CLASE ES ..........................");
    console.log(fecha_Clase);
    console.log(IdEscenario);
    console.log(IdHora);
    $.ajax({
        type: 'POST',
        data: { fecha_Clase, IdEscenario, IdHora },
        url: '/admin/generarIdClase',
        success: function (data) {
            var option = $('#idClaseReg');
            option.html('');
            option.append(`<option value="0">Selecciona la Clase</option>`);
            data.forEach(dat => {
                console.log("AJAX FUNCTION id de la CLASE______________****************************");
                console.log(dat.idClase);
                option.append(`<option value="${dat.idClase}"> ${dat.idClase} </option>`);
            })
        }
    })
});
});


$(function () {
    $('#idClaseReg').change(function () {
        console.log("DATOS RESTANTES REG CLASE ..........................");
        var IdClase = document.getElementById("idClaseReg").value;
        console.log("Id de la CLASE ES ..........................");
        console.log(IdClase);
        $.ajax({
            type: 'POST',
            data: { IdClase },
            url: '/admin/generarDataReg',
            success: function (data) {
                var option = $('#idProfesor');
                var option2 = $('#lineaReg');
                var option3 = $('#valorClaseReg');
                option.html('');
                data.forEach(dat => {
                    console.log("AJAX FUNCTION id de la CLASE______________****************************");
                    option.append(`<option value="${dat.idProfesor}"> ${dat.nombre_completo} </option>`);
                    option2.append(`<option value="default"> ${dat.linea} </option>`);
                    option3.append(`<option value="default"> ${dat.valor_Clase} </option>`);

                })
            }
        })
    });
    });


$(function () {
    $('#prof').keyup(function () {
        var program = 'hola';
        console.log(program);
    });
});

/*$(function () {
$('#modifClase').change(function () {
    //var program = document.getElementById("program").value;
    var escenariosCrearClase = document.getElementById("escenariosCrearClase").value;
    document.getElementById("fechaModifClase").value = [fecha_Clase];
    console.log("el ID de la CLASE ES ..........................");
    console.log(idClase);
    $.ajax({
        type: 'POST',
        //data: { program },
        data: { escenariosCrearClase },
        url: '/admin/generarEscenarios',
        success: function (data) {
            var option = $('#escenario');
            var option2 = $('#fechaModifClase');
            option.html('');
            data.forEach(dat => {
                //option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                //option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                //option.append(`<option value="${dat.idHorarios}">${dat.fecha}</option>`);
                console.log("*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.");
                option2.value(`<input value="${dat.idEscenario}">${dat.fecha_Clase}</input>`);
                option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
            })
        }
    })
})
});*/
/*
$(function () {
    $('#escenariosCrearClase').change(function () {
        //var program = document.getElementById("program").value;
        var escenariosCrearClase = '1';//document.getElementById("escenariosCrearClase").value;
        console.log(escenariosCrearClase);
        $.ajax({
            type: 'POST',
            //data: { program },
            data: { escenariosCrearClase },
            url: '/admin/generarEscenarios',
            success: function (data) {
                var option = $('#escenariosCrearClase');
                option.html('');
                data.forEach(dat => {
                    //option.append(`<option value="${dat.subject_id}">${dat.subject_name}</option>`);
                    //option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                    //option.append(`<option value="${dat.idHorarios}">${dat.fecha}</option>`);
                    option.append(`<option value="${dat.idEscenario}">${dat.nombreEscenario}</option>`);
                })
            }
        })
    })
});*/