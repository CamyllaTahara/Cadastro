import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$ (document).ready(function(){
    Loadselect();
    loadTable();
});

$("#btnSalvar").click(async function(){
    try{
        if($("#id").val()==""){
            await insert();

        }else{
            await update();

        }
        clear();
        
    } catch (errors) {
        console.error(errors);

    }
});

$("#btnLimpar").click(async function (){
    try{
        clear();

    }catch (errors){
        console.error(errors);
    }
});

function Loadselect(){
    axios.get(url+'categorys',{}).then(function (response){
     $.each(response.data, function(key,item){
        $('#selectC').append(
            $("<option></option>")
            .attr("value", item.id)
            .text(item.name)
     );
     });   
    }).catch(function(error){
        alert(error);
    });
}

function loadTable(){
    axios.get(url+'categorys',{

    }).then (function (response){
        var table= new DataTable("#table_Category",{
            data:response.data,
            columns:[
                {data: 'id'},
                {data: 'name'},
                {data: 'supplier'},
                {
                    data: null,
                    defaultContent: '<button class="btn-editar"id="edit">Editar</button>&nbsp;<button class="btn-excluir" id="excluir">Excluir</button>',
                    targets: -1
                },
            ]
        });
        table.on('click', 'button', function(e){
            var data = table.row($(this).parents('tr')).data();
            alert(data.id);
            if(this.id==='edit'){
                loadUser(data.id);
            }else{
                deleteRecord(data.id);
            }
        });
    }).catch(function(error){
        console.log(error);
    });
}


async function loadUser(id){
    await axios.get(url+'categorys/'+ id,{
}).then(function(response){
    $('#id').val(response.data.id)
    $('#name').val(response.data.name)
    $('#supplier').val(response.data.supplier)
    $("#selectC").val(response.data.category.id)
    }).catch(function(error){
        console.log(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function insert(){
    await axios.post(url+'categorys',{
        id: $("#id").val(),
        name: $("#name").val(),
        supplier: $("#supplier").val(),
        category: $("#selectedC option:selected").val()
    }).then(function(response){
        alert("Registro Incluido com Sucesso!");
        refreshtable();

    }).catch(function(error){
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'categorys/'+id,{
    }).then(function (response){
        alert("Registro Excluido com Sucesso!");
        refreshtable(); 

    }).catch(function(Error){
        console.log(error);
    });
}

async function update(){
 await axios.put(url + 'categorys',{
    name: $("#name").val(),
    supplier: $("#supplier").val(),

    category: $("#selectC option:selected").val()
 }).then(function response(){
    alert("Registro Atualizado com Sucesso");
    refreshtable();
 }).catch(function (error){
    console.log(error);
 });

    
}

function clear(){
    $("#id").val(""),
    $("#name").val(""),
    $("#supplier").val("");
}







// import 'regenerator-runtime/runtime';
// import axios from 'axios';
// const url = "http://localhost:3000/"

// $(document).ready(function(){
//     axios.get(url+'categorys',{
//     }).then(function(response){
//         $.each(response.data, function (key, item){
//             $('#selectC').append(
//                 $("<option></option>")
//                 .attr("value", item.id)
//                 .text(item.description)
//             );
//         });
//     }).catch(function(error){
//         alert(error);
//     })
//     loadTable();
// });

// function loadTable(){
//     axios.get(url+ 'categorys', {
//     }).then(function (response){
//         $("#table_Category").DataTable({
//             data: response.data,
//             columns: [
//                 {data:'id'},
//                 {data:'name'},
//                 {data:'supplier'}
//             ]
//         });
//     }).catch(function (error){
//         alert(error);
//     });
// }

// $("#btnSalvar").click(async function () {
//     try {
//         await axios.post(url + 'categorys', {
//             name: $("#name").val(),
//             supplier: $("#supplier").val()
           
//         }).then(function (response) {
//             alert("Registro Incluído com Sucesso")
//             var table=$("#table_Category").DataTable();
//             table.row.add({
//                 "id": response.data.id,
//                 "name": response.data.name,
//                 "supplier": response.data.supplier
//             }).draw();
//         }).catch(function (error) {
//           console.log(error);
//         });
//     } catch (errors) {
//         console.error(errors);
//     }
// });
// $("#btnLimpar").click(async function () {
//     try {
//         $("#id").val(""),
//             $("#name").val(""),
//             $("#supplier").val("")
//         } catch (errors) {
//         console.error(errors);
//     }
// });