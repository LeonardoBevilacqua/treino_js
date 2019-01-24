/* ========================= Lista ========================= */
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
   coll[i].addEventListener("click", function () {      
      this.classList.toggle("active");

      var content = this.nextElementSibling;
      var icon    = this.firstChild;
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
      document.getElementById("left-panel").style.width = null;
      document.getElementById("left-panel").style.marginLeft = null;      

      document.getElementById("left-panel").classList.toggle("col-3");
      document.getElementById("left-panel").classList.toggle("col-s-5");
   } else {
      document.getElementById("left-panel").classList.toggle("col-3");
      document.getElementById("left-panel").classList.toggle("col-s-5");

      document.getElementById("left-panel").style.width = "0";
      document.getElementById("left-panel").style.marginLeft = "-25%";      

   }
}

/* ========================= arrastar janelas ========================= */
//dragElement(document.getElementById("mydiv"));

for (let i = 0; i < document.getElementsByClassName("janela").length; i++) {
   const element = document.getElementsByClassName("janela")[i];
   console.log(element);
   dragElement(element);
   
}

function dragElement(element) {
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   if (document.getElementById(element.id + "header")) {
      document.getElementById(element.id + "header").onmousedown = dragMouseDown;
   }   
   
   function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
   
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;

      document.onmousemove = elementDrag;
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
      document.onmouseup = null;
      document.onmousemove = null;
   }

}
