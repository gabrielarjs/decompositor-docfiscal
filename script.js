function removeMask() {
    const key = getKey();
    const keySemMascara = key.replace(/[^\d]/g, '');
    document.getElementById("key").value = keySemMascara;
}

function validaKey(){
    const key = getKey();
    if(key.length === 44){

        let arrayChave = new Array;

        for(let i = 0; i < 43; i++){
            const a = key.substring(i, i+1);
            arrayChave.push(a);
        }

        let multiplicadores = new Array(43).fill(0);

        let j = 2;

        for(let i = 42; i >= 0; i--){
            multiplicadores[i] = j;
            j++;
            if(j>9){
                j=2;
            }
        }

        let resultados = new Array;

        for(let i = 0; i < 43; i++){
            resultados[i] = arrayChave[i] * multiplicadores[i];
        }

        let soma = 0;

        for(let i = 0; i < 43; i++){
            soma = soma + resultados[i];
        }

        const dvEsperado = 11 - (soma % 11)

        const dvReal =  key.substring(43, 44);

        if(dvReal == dvEsperado){
            return 'OK';
        }else{
            return 'Digito verificador inválido'
        }

        
    }else{
        return 'A chave deve conter 44 dígitos';
    }
}

function getKey() {
     return document.getElementById("key").value;
}


function decompor(){

    removeMask();

    msgValidacao = validaKey();

    if(msgValidacao != 'OK' ){
        alert(msgValidacao);
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

        document.getElementById("cUF").innerHTML = convertUF(cUF);
        document.getElementById("AAMM").innerHTML = convertData(AAMM) ;
        document.getElementById("CNPJ").innerHTML = formataCNPJ(CNPJ);
        document.getElementById("mod").innerHTML = convertMod(modelo);
        document.getElementById("serie").innerHTML = serie;
        document.getElementById("nNF").innerHTML = numero;
        document.getElementById("tpEmis").innerHTML = convertTpEmis(tpEmis);
        document.getElementById("cNF").innerHTML = cNF;
        document.getElementById("cDV").innerHTML = DV;

        document.getElementById("resultados").style.display = "table";

    }
}

function convertData(AAMM) {
    let mensagem = "";
    const ano = AAMM.substring(0, 2);

    const mes = AAMM.substring(2, 4);

    if(mes == '01'){
        mensagem += "Janeiro";
    }
    else if(mes == '02'){
        mensagem += "Fevereiro";
    }
    else if(mes == '03'){
        mensagem += "Março";
    }
    else if(mes == '04'){
        mensagem += "Abril";
    }
    else if(mes == '05'){
        mensagem += "Maio";
    }
    else if(mes == '06'){
        mensagem += "Junho";
    }
    else if(mes == '07'){
        mensagem += "Julho";
    }
    else if(mes == '08'){
        mensagem += "Agosto";
    }
    else if(mes == '09'){
        mensagem += "Setembro";
    }
    else if(mes == '10'){
        mensagem += "Outubro";
    }
    else if(mes == '11'){
        mensagem += "Novembro";
    }
    else if(mes == '12'){
        mensagem += "Dezembro";
    }
    else{
        mensagem += "Data inválida";
    }

    mensagem += " de 20" + ano;

    return mensagem;
}

function convertUF(cUF){
    switch (cUF) {
        case '12':
            return '12 - Acre';
        case '27':
            return '27 - Alagoas';
        case '16':
            return '16 - Amapá';
        case '13':
            return '13 - Amazonas';
        case '29':
            return '29 - Bahia';
        case '23':
            return '23 - Ceará';
        case '53':
            return '53 - Distrito Federal';
        case '32':
            return '32 - Espírito Santo';
        case '52':
            return '52 - Goiás';
        case '21':
            return '21 - Maranhão';
        case '51':
            return '51 - Mato Grosso';
        case '50':
            return '50 - Mato Grosso do Sul';
        case '31':
            return '31 - Minas Gerais';
        case '15':
            return '15 - Pará';
        case '25':
            return '25 - Paraíba';
        case '41':
            return '41 - Paraná';
        case '26':
            return '26 - Pernambuco';
        case '22':
            return '22 - Piauí';
        case '24':
            return '24 - Rio Grande do Norte';
        case '43':
            return '43 - Rio Grande do Sul';
        case '33':
            return '33 - Rio de Janeiro';
        case '11':
            return '11 - Rondônia';
        case '14':
            return '14 - Roraima';
        case '42':
            return '42 - Santa Catarina';
        case '35':
            return '35 - São Paulo';
        case '28':
            return '28 - Sergipe';
        case '17':
            return '17 - Tocantins';
    }
}

function convertMod(modelo){
    switch (modelo) {
        case '24':
            return '24 - Autorização de Carregamento e Transporte';
        case '14':
            return '14 - Bilhete de Passagem Aquaviário';
        case '15':
            return '15 - Bilhete de Passagem e Nota de Bagagem';
        case '2E':
            return '2E - Bilhete de Passagem emitido por ECF';
        case '16':
            return '16 - Bilhete de Passagem Ferroviário';
        case '13':
            return '13 - Bilhete de Passagem Rodoviário';
        case '30':
            return '30 - Bilhete/Recibo do Passageiro';
        case '10':
            return '10 - Conhecimento Aéreo';
        case '09':
            return '09 - Conhecimento de Transporte Aquaviário de Cargas';
        case '8B':
            return '8B - Conhecimento de Transporte de Cargas Avulso';
        case '57':
            return '57 - Conhecimento de Transporte Eletrônico - CT-e';
        case '11':
            return '11 - Conhecimento de Transporte Ferroviário de Cargas';
        case '26':
            return '26 - Conhecimento de Transporte Multimodal de Cargas';
        case '08':
            return '08 - Conhecimento de Transporte Rodoviário de Cargas';
        case '59':
            return '59 - Cupom Fiscal Eletrônico - CF-e';
        case '60':
            return '60 - Cupom Fiscal Eletrônico CF-e-ECF';
        case '2D':
            return '2D - Cupom Fiscal emitido por ECF';
        case '17':
            return '17 - Despacho de Transporte';
        case '23':
            return '23 - GNRE';
        case '25':
            return '25 - Manifesto de Carga';
        case '01':
            return '01 - Nota Fiscal';
        case '1B':
            return '1B - Nota Fiscal Avulsa';
        case '04':
            return '04 - Nota Fiscal de Produtor';
        case '21':
            return '21 - Nota Fiscal de Serviço de Comunicação';
        case '22':
            return '22 - Nota Fiscal de Serviço de Telecomunicação';
        case '07':
            return '07 - Nota Fiscal de Serviço de Transporte';
        case '27':
            return '27 - Nota Fiscal de Transporte Ferroviário de Cargas';
        case '02':
            return '02 - Nota Fiscal de Venda a Consumidor';
        case '55':
            return '55 - Nota Fiscal Eletrônica';
        case '65':
            return '65 - Nota Fiscal Eletrônica ao Consumidor Final - NFC-e';
        case '06':
            return '06 - Nota Fiscal/Conta de Energia Elétrica';
        case '28':
            return '28 - Nota Fiscal/Conta de Fornecimento de Gás Canalizado';
        case '29':
            return '29 - Nota Fiscal/Conta de Fornecimento de água Canalizada';
        case '20':
            return '20 - Ordem de Coleta de Cargas';
        case '18':
            return '18 - Resumo de Movimento Diário';
        case '58':
            return '58 - Manifesto Eletrônico de Documentos Fiscais - MDF-e';
        default:
            return `${modelo}(Modelo desconhecido)`;
    }
}

function convertTpEmis(tpEmis){

    switch (tpEmis) {
        case '1':
            return '1 - Emissão normal';
        case '2':
            return '2 - Contingência FS-IA';
        case '3':
            return '3 - Contingência SCAN';
        case '4':
            return '4 - Contingência DPEC';
        case '5':
            return '5 - Contingência FS-DA';
        case '6':
            return '6 - Contingência SVC-AN';
        case '7':
            return '7 - Contingência SVC-RS';
        default:
            return `${tpEmis}(Tipo de Emissão desconhecido)`;
    }

}

function formataCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
}


