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
    axios.get(url+'products',{}).then(function (response){
     $.each(response.data, function(key,item){
        $('#selectP1').append(
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
    axios.get(url+'products',{

    }).then (function (response){
        var table= new DataTable("#table_Product",{
            data:response.data,
            columns:[
                {data: 'id'},
                {data: 'name'},
                {data: 'code'},
                {data: 'price'},
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
    }).catch(function(error){
        console.log(error);
    });
}


async function loadUser(id){
    await axios.get(url+'products/'+ id,{
}).then(function(response){
    $('#id').val(response.data.id)
    $('#name').val(response.data.name)
    $('#code').val(response.data.code)
    $('#price').val(response.data.price)
    $('#category').val(response.data.category)
    
    $("#selectP1").val(response.data.product.id)
    }).catch(function(error){
        console.log(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function insert(){
    await axios.post(url+'products',{
        id: $("#id").val(),
        name: $("#name").val(),
        code: $("#code").val(),
        price: $("#price").val(),
        category: $("#category").val(),
        product: $("#selectedP1 option:selected").val()
    }).then(function(response){
        alert("Registro Incluido com Sucesso!");
        refreshtable();

    }).catch(function(error){
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'products/'+id,{
    }).then(function (response){
        alert("Registro Excluido com Sucesso!");
        refreshtable(); 

    }).catch(function(Error){
        console.log(error);
    });
}

async function update(){
 await axios.put(url + 'products',{
    id:$("#id").val(),
    name: $("#name").val(),
    code: $("#code").val(),
    price: $("#price").val(),
    category: $("#category").val(),
    product: $("#selectP option:selected").val()
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
    $("#code").val(""),
    $("#price").val(""),
    $("#category").val("");
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











// import 'regenerator-runtime/runtime';
// import axios from 'axios';
// const url = "http://localhost:3000/"

// $(document).ready(function(){
//     axios.get(url+'products',{
//     }).then(function(response){
//         $.each(response.data, function (key, item){
//             $('#selectP1').append(
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
//     axios.get(url+ 'products', {
//     }).then(function (response){
//         $("#table_Product").DataTable({
//             data: response.data,
//             columns: [
//                 {data:'id'},
//                 {data:'name'},
//                 {data:'price'}
//             ]
//         });
//     }).catch(function (error){
//         alert(error);
//     });
// }


// $("#btnSalvar").click(async function () {
//     try {
//         await axios.post(url + 'products', {
//             name: $("#name").val(),
//             code: $("#code").val(),
//             price: $("#price").val(),
//             category: $("#category").val()
//         }).then(function (response) {
//             alert("Registro Incluído com Sucesso")
//             var table=$("#table_Product").DataTable();
//             table.row.add({
//                 "id": response.data.id,
//                 "name": response.data.name,
//                 "price": response.data.price
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
//             $("#code").val(""),
//             $("#price").val(""),
//             $("#category").val("")
//     } catch (errors) {
//         console.error(errors);
//     }
// });