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

$(btnLimpar).click(async function (){
    try{
        clear();
    }catch (errors){
        console.error(errors);
    }
});

function Loadselect(){
    axios.get(url+'users',{}).then(function (response){
     $.each(response.data, function(key,item){
        $('#selectU').append(
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
    axios.get(url+'users',{

    }).then (function (response){
        var table= new DataTable("#table_User",{
            data:response.data,
            columns:[
                {data: 'id'},
                {data: 'name'},
                {data: 'email'},
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
    await axios.get(url+'users/'+ id,{
}).then(function(response){
    $('#id').val(response.data.id)
    $('#name').val(response.data.name)
    $('#email').val(response.data.email)
    if(response.data.admin){
        admin=$("#admin").prop('checked:true')

    }
    $("#selectP").val(response.data.profile.id)
    }).catch(function(error){
        console.log(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function insert(){
    await axios.post(url+'users',{
        name: $("#name").val(),
        email: $("#email").val(),
        admin: $("#admin").prop('checked'),
        password: $("#password").val(),
        profile: $("#selectedU option:selected").val()
    }).then(function(response){
        alert("Registro Incluido com Sucesso!");
        refreshtable();

    }).catch(function(error){
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'users/'+id,{
    }).then(function (response){
        alert("Registro Excluido com Sucesso!");
        refreshtable(); 

    }).catch(function(Error){
        console.log(error);
    });
}

async function update(){
 await axios.put(url + 'users',{
    id:$("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    admin: $("#admin").prop('checked'),
    password: $("#password").val(),
    profile: $("#selectU option:selected").val()
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
    $("#admin").prop('checked', false),
    $("#password").val("");
}

// $(document).ready(function () {
//     axios.get(url + 'users', {
//     }).then(function (response) {
//         $.each(response.data, function (key, item) {                      
//             $('#selectU').append(
//                 $("<option></option>")
//                   .attr("value", item.id)
//                   .text(item.description)
//             );
//         });   
//     }).catch(function (error) {
//         alert(error);
//     });
//     loadTable();
// });


// function loadTable(){
//     axios.get(url+ 'users', {
//     }).then(function (response){
//         $("#table_User").DataTable({
//             data: response.data,
//             columns: [
//                 {data:'id'},
//                 {data:'name'},
//                 {data:'email'}
//             ]
//         });
//     }).catch(function (error){
//         alert(error);
//     });
// }

// $("#btnSalvar").click(async function () {
//     try {
//         await axios.post(url + 'users', {
//             name: $("#name").val(),
//             email: $("#email").val(),
//             admin: $("#admin").prop('checked'),
//             password: $("#password").val()
//         }).then(function (response) {
//             alert("Registro Incluído com Sucesso")
//             var table=$("#table_User").DataTable();
//             table.row.add({
//                 "id": response.data.id,
//                 "name": response.data.name,
//                 "email": response.data.email
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
//             $("#admin").prop('checked', false),
//             $("#password").val("")
//     } catch (errors) {
//         console.error(errors);
//     }
// });

