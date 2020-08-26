function consultarRestaurantes(){
 $.ajax({
     url: "http://localhost:8080/restaurantes",
     type: "get",

     success: function(response){
        $("#conteudo").text(JSON.stringify(response));
     }
 });
}

function fecharRestaurantes(){
    $.ajax({
        url: "http://localhost:8080/restaurantes/1/fechamento",
        type: "put",
   
        success: function(response){
           alert("Restaurante foi fechado!");
        }
    });
}

function consultarCozinhas(){
    $.ajax({
        url: "http://localhost:8080/cozinhas",
        type: "get",
   
        success: function(response){
           $("#conteudo").text(JSON.stringify(response));
        }
    });
   }


function consultar() {
    $.ajax({
        url: "http://localhost:8080/formas-pagamento",
        type: "get",
   
        success: function(response){
            preencherTabela(response);
        }
    });
  }

  function consultarUm() {
      var idFormaPagamento = $("#id-forma-pagamento").val() 
    $.ajax({
        url: "http://localhost:8080/formas-pagamento/" + idFormaPagamento,
        type: "get",
   
        success: function(response){
            var reponseArray = []
            reponseArray.push(response)
            preencherTabela(reponseArray);
        }
    });
  }

  function cadastrar(){
      var formaPagamentoJson = JSON.stringify({
        "descricao":  $("#campo-descricao").val() 
      });

      console.log(formaPagamentoJson);
      $.ajax({
        url: "http://localhost:8080/formas-pagamento",
        type: "post",
        data: formaPagamentoJson,
        contentType: "application/json",

        success: function(response){
            alert("Forma de pagamento cadastrada!");
            consultar();
        },
        error: function(error){
            if(error.status == 400)  {
                var problem = JSON.parse(error.responseText);
                alert(problem.userMessage);
            }else{
                alert("Erro ao cadastrar forma de pagamento!");
            }
        }
    });
  }

  function excluir(formaPagamento){
    var url = "http://localhost:8080/formas-pagamento/" + formaPagamento.id;
    $.ajax({
        url: url,
        type: "delete",
        success: function(response){
            alert("Forma de pagamento deletada!");
            consultar();
        },
        error: function(error){
            if(error.status >= 400 && error.status <= 499)  {
                var problem = JSON.parse(error.responseText);
                alert(problem.userMessage);
            }else{
                alert("Erro ao deletar forma de pagamento!");
            }
        }
    });
  }
  
  
  function preencherTabela(formasPagamento) {
    $("#tabela tbody tr").remove();

    console.log(formasPagamento);
  
    $.each(formasPagamento, function(i, formaPagamento) {
      var linha = $("<tr>");
      console.log(formaPagamento);
      var linkAcao = $("<a href='#'>")
      .text("Excluir")
      .click(function(event){
          event.preventDefault();
          excluir(formaPagamento)
      })
  
      linha.append(
        $("<td>").text(formaPagamento.id),
        $("<td>").text(formaPagamento.descricao),
        $("<td>").append(linkAcao)
      );
  
      linha.appendTo("#tabela");
    });
  }
  

  $("#botao").click(consultarCozinhas);
  $("#btn-consultar").click(consultar);
  $("#btn-cadastrar").click(cadastrar);
  $("#btn-buscar").click(consultarUm);

  

