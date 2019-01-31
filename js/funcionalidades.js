var acao = null;
var consulta_ativa = [];
var pos = [];
var search_query = null;
var url_base = "https://testes580.azurewebsites.net/";
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
   var url = url_base + data + ".php";
   for (let i = 0; i < campos[id_atual].length; i++) {
      const element = campos[id_atual][i];
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

   pos[id_atual] = 0;

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
         if (this.status === 200) {
            dados_carregados[id_atual] = JSON.parse(this.responseText);

            exibe_dados(Object.values(dados_carregados[id_atual][pos[id_atual]]));

            consulta_ativa[id_atual] = true;
            altera_estado_menu();
            altera_estado_campos();
         } else {
            altera_estado_menu();
            altera_estado_campos();
            acao_popup(true, "Erro", "Falha ao carregar os dados!\n");
         }
      }
   };
   xhttp.open("GET", url, true);
   xhttp.send();
   xhttp = null;
}

function exibe_dados(data) {
   var table = document.getElementsByClassName("grid");
   var table_index = 0;
   var table_body = null;

   for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i])) {
         table_body = table[table_index];
         table_body.innerHTML = "";

         for (let j = 0; j < data[i].length; j++) {
            var linha = table_body.insertRow(0);
            var element = data[i][j];
            element = Object.values(element);

            for (let j = 0; j < element.length; j++) {
               const e = element[j];
               linha.insertCell(j).innerHTML = e;
            }
         }
      } else {
         const field = campos[id_atual][i];
         field.value = data[i];
      }
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
   for (let i = 0; i < campos[id_atual].length; i++) {
      const element = campos[id_atual][i];
      if (element.className.includes("edit")) {
         element.disabled = !element.disabled;
      }
   }
}

function limpa_dados_tela() {
   for (let i = 0; i < document.getElementsByClassName("grid").length; i++) {
      const element = document.getElementsByClassName("grid")[i];
      element.innerHTML = ""
   };

   for (let i = 0; i < campos[id_atual].length; i++) {
      const element = campos[id_atual][i];
      element.value = "";      
   };
}

function acao_consultar() {
   limpa_dados_tela();
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
         if (pos[id_atual] > 0) {
            pos[id_atual]--;
         } else {
            acao_popup(true, "Alerta", "Sem dados nessa direção");
            return;
         }
         break;
      case acoes[5]:
         if (pos[id_atual] < dados_carregados[id_atual].length - 1) {
            pos[id_atual]++;
         } else {
            acao_popup(true, "Alerta", "Sem dados nessa direção");
            return;
         }
      default:
         break;
   }
   exibe_dados(Object.values(dados_carregados[id_atual][pos[id_atual]]));
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
   delete dados_carregados[id_atual];
   delete consulta_ativa[id_atual];
   id_atual = "";
   janela_atual.parentNode.removeChild(janela_atual);
}

/* teste
document.getElementById("link-clientes").click();
document.getElementById("toggle-panel").click();
*/

