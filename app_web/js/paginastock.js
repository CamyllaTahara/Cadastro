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
    axios.get(url+'stocks',{}).then(function (response){
     $.each(response.data, function(key,item){
        $('#selectS').append(
            $("<option></option>")
            .attr("value", item.id)
            .text(item.product)
     );
     });   
    }).catch(function(error){
        alert(error);
    });
}

function loadTable(){
    axios.get(url+'stocks',{

    }).then (function (response){
        var table= new DataTable("#table_Stock",{
            data:response.data,
            columns:[
                {data: 'id'},
                {data: 'product'},
                {data: 'quantity'},
                {data: 'category'},
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
    await axios.get(url+'stocks/'+ id,{
}).then(function(response){
    $('#id').val(response.data.id)
    $('#product').val(response.data.product)
    $('#quantity').val(response.data.quantity)
    $('#category').val(response.data.category)
    $('#supplier').val(response.data.supplier)

    $("#selectS").val(response.data.stock.id)
    }).catch(function(error){
        console.log(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function insert(){
    await axios.post(url+'stocks',{
        id: $("#id").val(),
        product: $("#product").val(),
        quantity: $("#quantity").val(),
        category: $("#category").val(),
        supplier: $("#supplier").val(),
        stock: $("#selectedS option:selected").val()
    }).then(function(response){
        alert("Registro Incluido com Sucesso!");
        refreshtable();

    }).catch(function(error){
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'stocks/'+id,{
    }).then(function (response){
        alert("Registro Excluido com Sucesso!");
        refreshtable(); 

    }).catch(function(Error){
        console.log(error);
    });
}

async function update(){
 await axios.put(url + 'stocks',{
    id:$("#id").val(),
    product: $("#product").val(),
    quantity: $("#quantity").val(),
    category: $("#category").val(),
    supplier: $("#supplier").val(),
    stock: $("#selectS option:selected").val()
 }).then(function response(){
    alert("Registro Atualizado com Sucesso");
    refreshtable();
 }).catch(function (error){
    console.log(error);
 });

    
}

function clear(){
    $("#id").val(""),
    $("#product").val(""),
    $("#quantity").val(""),
    $("#category").val(""),
    $("#supplier").val("");
}





// import 'regenerator-runtime/runtime';
// import axios from 'axios';
// const url = "http://localhost:3000/"

// $(document).ready(function(){
//     axios.get(url+'stocks',{
//     }).then(function(response){
//         $.each(response.data, function (key, item){
//             $('#selectS').append(
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
//     axios.get(url+ 'stocks', {
//     }).then(function (response){
//         $("#table_Stock").DataTable({
//             data: response.data,
//             columns: [
//                 {data:'id'},
//                 {data:'product'},
//                 {data:'quantity'}
//             ]
//         });
//     }).catch(function (error){
//         alert(error);
//     });
// }


// $("#btnSalvar").click(async function () {
//     try {
//         await axios.post(url + 'stocks', {
//             product: $("#product").val(),
//             quantity: $("#quantity").val(),
//             category: $("#category").val(),
//             supplier: $("#supplier").val()
//         }).then(function (response) {
//             alert("Registro Incluído com Sucesso")
//             var table=$("#table_Stock").DataTable();
//             table.row.add({
//                 "id": response.data.id,
//                 "product": response.data.product,
//                 "quantity": response.data.quantity
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
//             $("#product").val(""),
//             $("#quantity").val(""),
//             $("#category").val(""),
//             $("#supplier").val("")
//     } catch (errors) {
//         console.error(errors);
//     }
// });