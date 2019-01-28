function consultar() {
   var campos = document.getElementsByClassName("field");
   //console.log(campos);

   carrega_dados();
}

function carrega_dados() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         var json = JSON.parse(this.responseText);
         console.log(json.Cliente);
      }
   };
   xhttp.open("GET", "data.json", true);
   xhttp.send();
}

document.getElementById("link-pedido").click();
document.getElementById("toggle-panel").click();
