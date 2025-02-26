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
            await insert ();

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
    axios.get(url+'suppliers',{}).then(function (response){
     $.each(response.data, function(key,item){
        $('#selectS1').append(
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
    axios.get(url+'suppliers',{

    }).then (function (response){
        var table= new DataTable("#table_Supplier",{
            data:response.data,
            columns:[
                {data: 'id'},
                {data: 'name'},
                {data: 'email'},
                {data: 'category'},
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
        
    })
}


async function loadUser(id){
    await axios.get(url+'suppliers/'+ id,{
}).then(function(response){
    $('#id').val(response.data.id)
    $('#name').val(response.data.name)
    $('#email').val(response.data.email)
    $('#category').val(response.data.category)
    $("#selectS1").val(response.data.supplier.id)
    }).catch(function(error){
        console.log(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function insert(){
    await axios.post(url+'suppliers',{
        id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        category: $("#category").val(),
        supplier: $("#selectedS1 option:selected").val()
    }).then(function(response){
        alert("Registro Incluido com Sucesso!");
        refreshtable();

    }).catch(function(error){
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'suppliers/'+id,{
    }).then(function (response){
        alert("Registro Excluido com Sucesso!");
        refreshtable(); 

    }).catch(function(Error){
        console.log(error);
    });
}

async function update(){
 await axios.put(url + 'suppliers',{
    id:$("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    category: $("#category").val(),
    supplier: $("#selectS1 option:selected").val()
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
    $("#email").val(""),
    $("#category").val("");
}




// import 'regenerator-runtime/runtime';
// import axios from 'axios';
// const url = "http://localhost:3000/"

// $(document).ready(function(){
//     axios.get(url+'suppliers',{
//     }).then(function(response){
//         $.each(response.data, function (key, item){
//             $('#selectS1').append(
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
//     axios.get(url+ 'suppliers', {
//     }).then(function (response){
//         $("#table_Supplier").DataTable({
//             data: response.data,
//             columns: [
//                 {data:'id'},
//                 {data:'email'},
//                 {data:'category'}
//             ]
//         });
//     }).catch(function (error){
//         alert(error);
//     });
// }

// $("#btnSalvar").click(async function () {
//     try {
//         await axios.post(url + 'suppliers', {
//             name: $("#name").val(),
//             email: $("#email").val(),
//             category: $("#category").val(),
//         }).then(function (response) {
//             alert("Registro Incluído com Sucesso")
//             var table=$("#table_Supplier").DataTable();
//             table.row.add({
//                 "id": response.data.id,
//                 "email": response.data.email,
//                 "category": response.data.category
//             }).draw();
//         }).catch(function (error) {
//             console.log(error);
//         });
//     } catch (errors) {
//         console.error(errors);
//     }
// });
// $("#btnLimpar").click(async function () {
//     try {
//         $("#id").val(""),
//             $("#name").val(""),
//             $("#email").val(""),
//             $("#category").val("")
//     } catch (errors) {
//         console.error(errors);
//     }
// });