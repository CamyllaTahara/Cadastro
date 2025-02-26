import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"


$("#btnReset").click(async function () {
    try {
        await axios.post(url + 'reset', {
            email: $("#email").val()
           
        }).then(function (response) {
            alert("Senha enviada com sucesso no email cadastrado")
        }).catch(function (error) {
          console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
});
$("#btnLimpar").click(async function () {
    try {
        $("#id").val(""),
            $("#name").val(""),
            $("#supplier").val("")
        } catch (errors) {
        console.error(errors);
    }
});