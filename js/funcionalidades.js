var acao = null;
var consulta_ativa = [];
var pos = 0;
var search_query = null;
var url_base = "https://teste-leonardoabevilacqua148955.codeanyapp.com/";
var acoes = ["incluir",
   "modificar",
   "excluir",
   "consultar",
   "anterior",
   "seguinte",
   "informar",
   "listar",
   "confirmar",
   "cancelar",
   "sair"];

var dados_carregados = [];

function carrega_dados(data) {
   var url = url_base + "clientes"/*data*/ + ".php" //obs
   for (let i = 0; i < campos.length; i++) {
      const element = campos[i];
      if (!element.disabled) {
         if (element.value != "") {
            if (!search_query) {
               search_query = "?" + element.id + "=" + element.value;
            } else {
               search_query += "&" + element.id + "=" + element.value;
            }
         }
      }
   }
   if (search_query) {
      url += search_query;
      search_query = null;
   }

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
         if (this.status === 200) {
            dados_carregados[id_atual] = JSON.parse(this.responseText);

            exibe_dados(Object.values(dados_carregados[id_atual][pos]));

            consulta_ativa[id_atual] = true;
            altera_estado_menu();
            altera_estado_campos();
         } else {
            altera_estado_menu();
            altera_estado_campos();
            acao_popup(true, "Erro", "Falha ao carregar os dados!\n");
         }
      }
      console.log(this.responseText);
   };
   xhttp.open("GET", url, true);
   xhttp.send();
   xhttp = null;
}

function exibe_dados(data) {
   for (let y = 0; y < campos.length; y++) {
      const field = campos[y];
      field.value = data[y];
   }
}

function altera_estado_menu() {
   for (let i = 0; i < acoes.length; i++) {
      const element = janela_atual.getElementsByClassName(acoes[i])[0];
      if (element) {
         element.classList.toggle("hidden");
      }

   }
}

function altera_estado_campos() {
   for (let i = 0; i < campos.length; i++) {
      const element = campos[i];
      if (element.className.includes("edit")) {
         element.disabled = !element.disabled;
      }
   }
}

function acao_consultar() {
   altera_estado_menu();
   altera_estado_campos();
   acao = acoes[3];
}

function acao_cancelar() {
   altera_estado_menu();
   altera_estado_campos();
}

function acao_confirmar(button) {
   if (acao == acoes[3]) {
      carrega_dados(button.id.split("-")[0]);
   }
}

function acao_paginar(funcao) {
   if (!consulta_ativa[id_atual]) {
      acao_popup(true, "Alerta", "realize a consulta primeiro!");
      return;
   }

   switch (funcao) {
      case acoes[4]:
         if (pos > 0) {
            pos--;
         } else {
            acao_popup(true, "Alerta", "Sem dados nessa direção");
            return;
         }
         break;
      case acoes[5]:
         if (pos < dados_carregados[id_atual].length - 1) {
            pos++;
         } else {
            acao_popup(true, "Alerta", "Sem dados nessa direção");
            return;
         }
      default:
         break;
   }
   exibe_dados(Object.values(dados_carregados[id_atual][pos]));
}

function acao_popup(acao, title, body) {
   if (acao) {
      document.getElementById("popup").className = "popup-background";
      document.getElementById("popup-title").innerText = title;
      document.getElementById("popup-body").innerText = body;
   } else {
      document.getElementById("popup").className = "popup-background hidden";
      document.getElementById("popup-title").innerText = "";
      document.getElementById("popup-body").innerText = "";
   }
}

function acao_sair() {
   console.log(dados_carregados["pedidos"]); //obs
   delete dados_carregados[id_atual];
   delete consulta_ativa[id_atual];
   console.log(dados_carregados["pedidos"]); //obs
   janela_atual.parentNode.removeChild(janela_atual);
}

/* teste
document.getElementById("link-clientes").click();
document.getElementById("toggle-panel").click();
*/

