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
    axios.get(url+'orders',{}).then(function (response){
     $.each(response.data, function(key,item){
        $('#selectO').append(
            $("<option></option>")
            .attr("value", item.id)
            .text(item.number)
     );
     });   
    }).catch(function(error){
        alert(error);
    });
}

function loadTable(){
    axios.get(url+'orders',{

    }).then (function (response){
        var table= new DataTable("#table_Order",{
            data:response.data,
            columns:[
                {data: 'id'},
                {data: 'number'},
                {data: 'email'},
                {data: 'product'},
                {data: 'price'},
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
    await axios.get(url+'orders/'+ id,{
}).then(function(response){
    $('#id').val(response.data.id)
    $('number').val(response.data.number)
    $('#email').val(response.data.email)
    $('#product').val(response.data.product)
    $('#quantity').val(response.data.quantity)
    $('#price').val(response.data.price)
    $("#selectO").val(response.data.order.id)
    }).catch(function(error){
        console.log(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function insert(){
    await axios.post(url+'orders',{
        id: $("#id").val(),
        number: $("#number").val(),
        email: $("#email").val(),
        product: $("#product").val(),
        quantity: $("#quantity").val(),
        price: $("#price").val(),
        order: $("#selectedO option:selected").val()
    }).then(function(response){
        alert("Registro Incluido com Sucesso!");
        refreshtable();

    }).catch(function(error){
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'orders/'+id,{
    }).then(function (response){
        alert("Registro Excluido com Sucesso!");
        refreshtable(); 

    }).catch(function(Error){
        console.log(error);
    });
}

async function update(){
 await axios.put(url + 'orders',{
    id:$("#id").val(),
    name: $("#umber").val(),
    email: $("#email").val(),
    product: $("#product").val(),
    quantity: $("#quantity").val(),
    price: $("#price").val(),
    order: $("#selectO option:selected").val()
 }).then(function response(){
    alert("Registro Atualizado com Sucesso");
    refreshtable();
 }).catch(function (error){
    console.log(error);
 });

    
}

function clear(){
    $("#id").val(""),
    $("#number").val(""),
    $("#email").val(""),
    $("#product").val(""),
    $("#quantity").val(""),
    $("#price").val("");
}





// import 'regenerator-runtime/runtime';
// import axios from 'axios';
// const url = "http://localhost:3000/"

// $(document).ready(function(){
//     axios.get(url+'orders',{
//     }).then(function(response){
//         $.each(response.data, function (key, item){
//             $('#selectO').append(
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
//     axios.get(url+ 'orders', {
//     }).then(function (response){
//         $("#table_Order").DataTable({
//             data: response.data,
//             columns: [
//                 {data:'id'},
//                 {data:'email'},
//                 {data:'product'},
//                 {data:'price'}
//             ]
//         });
//     }).catch(function (error){
//         alert(error);
//     });
// }

// $("#btnSalvar").click(async function () {
//     try {
//         await axios.post(url + 'orders', {
//             number: $("#number").val(),
//             email: $("#email").val(),
//             product: $("#product").val(),
//             quantity: $("#quantity").val(),
//             price: $("#price").val()
           
//         }).then(function (response) {
//             alert("Registro Incluído com Sucesso")
//             var table=$("#table_Order").DataTable();
//             table.row.add({
//                 "id": response.data.id,
//                 "email": response.data.email,
//                 "product": response.data.product,
//                 "price": response.data.price
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
//             $("#number").val(""),
//             $("#email").val(""),
//             $("#product").val(""),
//             $("#quantity").val(""),
//             $("#price").val("")

//         } catch (errors) {
//         console.error(errors);
//     }
// });