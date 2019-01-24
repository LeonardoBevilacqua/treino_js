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