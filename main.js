/* ========================= Lista ========================= */
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
   coll[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var content = this.nextElementSibling;
      var icon = this.firstChild;
      if (content.style.maxHeight) {
         content.style.maxHeight = null;
         icon.className = "fa-li fa fa-plus-square";
      } else {
         content.style.maxHeight = content.scrollHeight + "px";
         icon.className = "fa-li fa fa-minus-square";
      }
   });
}

/* ========================= Painel ========================= */
function toggle_panel(div) {
   div.classList.toggle("change");

   var leftPanel = document.getElementById("left-panel");

   if (div.classList.contains('change')) {
      leftPanel.style.width = null;
      leftPanel.style.marginLeft = null;

      leftPanel.classList.toggle("col-3");
      leftPanel.classList.toggle("col-s-5");
   } else {
      leftPanel.classList.toggle("col-3");
      leftPanel.classList.toggle("col-s-5");

      leftPanel.style.width = "0";
      leftPanel.style.marginLeft = "-100%";

   }
}

/* ========================= arrastar janelas ========================= */
/*dragElement(document.getElementById("mydiv"));

for (let i = 0; i < document.getElementsByClassName("janela").length; i++) {
   const element = document.getElementsByClassName("janela")[i];
   dragElement(element);  
   element.addEventListener("pointerdown", window_focus.bind(null, element));
}*/

function dragElement(element) {
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   if (document.getElementById(element.id + "header")) {
      document.getElementById(element.id + "header").onpointerdown = dragMouseDown;
   }

   function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onpointerup = closeDragElement;
      document.onpointermove = elementDrag;
   }

   function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
   }

   function closeDragElement() {
      document.onpointerup = null;
      document.onpointermove = null;
   }
}

function window_focus(element) {
   for (let i = 0; i < document.getElementsByClassName("janela").length; i++) {
      const e = document.getElementsByClassName("janela")[i];
      e.classList.remove("focus");
   }

   element.classList.add('focus');
}

/* ========================= criar janela ========================= */
for (let i = 0; i < document.getElementsByClassName("opcoes-link").length; i++) {
   const element = document.getElementsByClassName("opcoes-link")[i];
   element.addEventListener("click", cria_janela.bind(null, element));
}

function cria_janela(element) {
   var nome = element.getAttribute("id").split("-")[1];

   for (let i = 0; i < coll.length; i++) {
      if (coll[i].classList.contains("active")) {
         coll[i].click();
      }
   }
   document.getElementById("toggle-panel").click();

   if (document.getElementById(nome)) {
      return;
   }
   var t = "";

   var janela = document.createElement("DIV");
   janela.addEventListener("pointerdown", window_focus.bind(null, janela));
   janela.setAttribute("id", nome);
   janela.setAttribute("class", "janela focus");

   var janela_header = document.createElement("DIV");
   janela_header.setAttribute("class", "janela-header");
   janela_header.setAttribute("id", nome + "header");

   t = document.createTextNode(nome);
   janela_header.append(t);
   janela.append(janela_header);

   var janela_body = document.createElement("DIV");
   janela.append(janela_body);

   //t = document.createTextNode("Teste");
   //janela.append(t);
   //janela_body.innerHTML ='<object type="text/html" data="'+nome+'.html" ></object>';
   fetch(nome + ".html")
      .then((response) => response.text())
      .then((html) => {
         janela_body.write(html);
      })
      .catch((error) => {
         console.warn(error);
      });

   document.getElementById("right-panel").append(janela);
   dragElement(janela);
}