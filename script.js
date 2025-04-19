function validaKey(){
    const key = getKey();
    if(key.length === 44){
        return true;
    }else{
        return false;
    }
}

function getKey() {
    const key = document.getElementById("key").value;
    return key;
}

function teste(){
    alert(getKey().length);
}

function decompor(){

    if(!validaKey()){
        alert("A chave deve ter 44 caracteres!");
        return;
    }
    else{
        const key = getKey();

        const cUF = key.substring(0, 2);
        const AAMM = key.substring(2, 6);
        const CNPJ = key.substring(6, 20);
        const modelo = key.substring(20, 22);
        const serie = key.substring(22, 25);
        const numero = key.substring(25, 34);
        const tpEmis = key.substring(34, 35);
        const cNF = key.substring(35, 43);
        const DV = key.substring(43, 44);
        

        console.log("cUF: " + cUF);
        console.log("AAMM: " + AAMM);
        console.log("CNPJ: " + CNPJ);
        console.log("Modelo: " + modelo);
        console.log("Série: " + serie);
        console.log("Número: " + numero);
        console.log("tpEmis: " + tpEmis);
        console.log("cNF: " + cNF);
        console.log("DV: " + DV);

        document.getElementById("cUF").innerHTML = cUF;
        document.getElementById("AAMM").innerHTML = AAMM;
        document.getElementById("CNPJ").innerHTML = CNPJ;
        document.getElementById("mod").innerHTML = modelo;
        document.getElementById("serie").innerHTML = serie;
        document.getElementById("nNF").innerHTML = numero;
        document.getElementById("tpEmis").innerHTML = tpEmis;
        document.getElementById("cNF").innerHTML = cNF;
        document.getElementById("cDV").innerHTML = DV;

    }
}