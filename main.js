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