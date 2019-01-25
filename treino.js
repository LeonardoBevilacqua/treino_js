var obj_cliente = [
    {
        codigo: 1,
        denominacao: "teste",
        saldo: 100.00
    },
    {
        codigo: 2,
        denominacao: "teste 2",
        saldo: 200.00
    }
];

var obj_item = [
    {
        codigo: 1,
        denominacao: "teste item",
        quantidade_estoque: 5,
        preco: 2.5
    },
    {
        codigo: 2,
        denominacao: "teste",
        quantidade_estoque: 5,
        preco: 1.5
    }
];

var obj_pedido = [
    {
        codigo: 1,
        cod_cliente: 1,
        cod_item: 1,
        quantidade_comprada: 1,
        data: "20/01/2019"
    },
    {
        codigo: 2,
        cod_cliente: 2,
        cod_item: 2,
        quantidade_comprada: 1,
        data: "21/01/2019"
    }
];

var m_consulta_ativa = false;
var clientes = [];
var pos = 0;

function carrega_dados(carrega_cliente) {
    var f_cod_cliente = document.getElementById("cod_cliente");
    var f_den_cliente = document.getElementById("den_cliente");
    var f_saldo = document.getElementById("saldo");
    var t_pedidos = document.getElementById("pedidos");

    var cliente = [];

    if (carrega_cliente) {
        if (f_cod_cliente.value !== "") {
            clientes = obj_cliente.filter(x => x.codigo === parseInt(f_cod_cliente.value));
        } else {
            clientes = obj_cliente;
        }
    }

    cliente = clientes[pos];
    if (!cliente) {
        popup("Alerta", "Codigo invalido!");
        document.getElementById("confirmar").className = "hidden";
        document.getElementById("consultar").className = "";
        document.getElementById("anterior").className = "";
        document.getElementById("seguinte").className = "";
        document.getElementById("cod_cliente").disabled = true;
        return;
    }

    f_cod_cliente.value = cliente.codigo;
    f_den_cliente.value = cliente.denominacao;
    f_saldo.value = cliente.saldo;

    var cliente_pedidos = obj_pedido.filter(x => x.cod_cliente === cliente.codigo);
    document.getElementById("pedidos").innerHTML = "";

    for (let i = 0; i < cliente_pedidos.length; i++) {
        var linha = t_pedidos.insertRow(0);

        var codigo = linha.insertCell(0);
        var cod_item = linha.insertCell(1);
        var descricao = linha.insertCell(2);
        var quantidade = linha.insertCell(3);
        var data = linha.insertCell(4);

        codigo.innerHTML = cliente_pedidos[i].codigo;
        cod_item.innerHTML = cliente_pedidos[i].cod_item;
        descricao.innerHTML = obj_item.filter(x => x.codigo === cliente_pedidos[i].cod_item)[0].denominacao
        quantidade.innerHTML = cliente_pedidos[i].quantidade_comprada;
        data.innerHTML = cliente_pedidos[i].data;


        document.getElementById("confirmar").className = "hidden";
        document.getElementById("consultar").className = "";
        document.getElementById("anterior").className = "";
        document.getElementById("seguinte").className = "";
        document.getElementById("cod_cliente").disabled = true;
        m_consulta_ativa = true;
    }

}

function consultar() {
    document.getElementById("form").reset();
    document.getElementById("confirmar").className = "";
    document.getElementById("consultar").className = "hidden";
    document.getElementById("anterior").className = "hidden";
    document.getElementById("seguinte").className = "hidden";
    document.getElementById("cod_cliente").disabled = false;
    document.getElementById("pedidos").innerHTML = "";
    m_consulta_ativa = false;
    pos = 0;
}

function paginar(funcao) {
    if (!m_consulta_ativa) {
        popup("Alerta", "realize a consulta primeiro!");
        return;
    }

    switch (funcao) {
        case "anterior":
            if (pos > 0) {
                pos--;
            } else {
                popup("Alerta", "Sem dados nessa direção");
                return;
            }
            break;
        case "seguinte":
            if (pos < clientes.length - 1) {
                pos++;
            } else {
                popup("Alerta", "Sem dados nessa direção");
                return;
            }
        default:
            break;
    }
    carrega_dados(false);
}


function popup(title, body) {
    document.getElementById("popup").className = "popup-background";
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-body").innerText = body;
}

window.addEventListener('load', function () {
    document.getElementById("consultar").addEventListener("click", consultar);
    document.getElementById("anterior").addEventListener("click", paginar.bind(null, "anterior"));
    document.getElementById("seguinte").addEventListener("click", paginar.bind(null, "seguinte"));
    document.getElementById("confirmar").addEventListener("click", carrega_dados.bind(null, true));
    document.getElementById("ok").addEventListener("click", function () {
        document.getElementById("popup").className = "popup-background hidden";
        document.getElementById("popup-title").innerText = "";
        document.getElementById("popup-body").innerText = "";
    });
});
