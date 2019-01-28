var acao = null;
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

function carrega_dados(data) {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         var json = JSON.parse(this.responseText);
         var array = Object.keys(json[1]).map(i => json[1][i]);
         //console.log(array);

         for (let i = 0; i < array.length; i++) {
            if (!campos[i]) {
               console.warn("Campo faltando!");
               continue;
            }
            var element = array[i];
            campos[i].value = element;

         }
      }
   };
   xhttp.open("GET", "json/" + data + ".json", true);
   xhttp.send();

   altera_estado_menu();
   altera_estado_campos();
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

function acao_confirmar() {
   if (acao == acoes[3]) {
      carrega_dados("clientes");
   }
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
   janela_atual.parentNode.removeChild(janela_atual);
}

/* teste */
document.getElementById("link-pedido").click();
document.getElementById("toggle-panel").click();


