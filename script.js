// ============= VARIÁVEIS GLOBAIS =============
let cameraStream = null;
let isScanning = false;

// ============= FUNÇÕES DE CÂMERA E CÓDIGO DE BARRAS =============

/**
 * Inicia a câmera para leitura de código de barras
 */
async function iniciarCamera() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraStream');
    const status = document.getElementById('cameraStatus');

    modal.classList.add('show');
    status.textContent = 'Iniciando câmera...';
    status.style.color = '#666';

    try {
        // Verifica se a API está disponível
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Sua navegador não suporta acesso à câmera');
        }

        const constraints = {
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        };

        console.log('Solicitando acesso à câmera...');
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Configura o stream no elemento video
        video.srcObject = cameraStream;
        
        // Força o autoplay do vídeo
        video.onloadedmetadata = () => {
            console.log('Vídeo carregado, iniciando reprodução...');
            video.play().catch(err => {
                console.error('Erro ao fazer play:', err);
                status.textContent = 'Erro ao iniciar vídeo. Tente novamente.';
                status.style.color = '#ef4444';
            });
        };

        status.textContent = 'Câmera ativa. Posicione o código de barras na tela.';
        status.style.color = '#10b981';
        isScanning = true;

        // Aguarda um pouco para o vídeo carregar
        setTimeout(() => {
            console.log('Iniciando detecção de código de barras...');
            DetectorCodigoBarras();
        }, 500);

    } catch (err) {
        console.error('Erro ao acessar câmera:', err);
        status.textContent = 'Erro ao acessar câmera. Verifique as permissões.';
        status.style.color = '#ef4444';

        if (err.name === 'NotAllowedError') {
            status.textContent = '❌ Permissão de câmera negada. Verifique as configurações do navegador.';
        } else if (err.name === 'NotFoundError') {
            status.textContent = '❌ Nenhuma câmera encontrada neste dispositivo.';
        } else if (err.name === 'NotReadableError') {
            status.textContent = '❌ Câmera em uso por outro programa. Feche-o e tente novamente.';
        } else {
            status.textContent = `❌ ${err.message}`;
        }
    }
}

/**
 * Para a câmera e fecha o modal
 */
function fecharCamera() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraStream');

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    isScanning = false;
    video.srcObject = null;
    modal.classList.remove('show');
}

/**
 * Detecção de código de barras usando jsQR
 */
function DetectorCodigoBarras() {
    const video = document.getElementById('cameraStream');
    const canvas = document.getElementById('canvas');
    const status = document.getElementById('cameraStatus');
    
    if (!canvas || !status) {
        console.error('Canvas ou status não encontrados');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Contexto 2D não disponível');
        return;
    }

    function scan() {
        if (!isScanning) return;

        try {
            // Verifica se o vídeo tem dimensões válidas
            if (video.videoWidth <= 0 || video.videoHeight <= 0) {
                console.log('Aguardando vídeo carregar...');
                requestAnimationFrame(scan);
                return;
            }

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Desenha o vídeo no canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Obtém os dados da imagem
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Verifica se jsQR está disponível
                if (typeof jsQR === 'undefined') {
                    console.error('jsQR não está carregado');
                    status.textContent = 'Erro: biblioteca de QR code não carregou. Recarregue a página.';
                    status.style.color = '#ef4444';
                    return;
                }

                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                });

                // Se encontrar um código de barras/QR code
                if (code) {
                    const codigoLido = code.data;
                    console.log('Código QR detectado:', codigoLido);

                    // Valida se é uma chave de acesso válida
                    if (codigoLido.length === 44 && /^\d+$/.test(codigoLido)) {
                        document.getElementById('key').value = codigoLido;
                        status.textContent = '✓ Código lido com sucesso!';
                        status.style.color = '#10b981';

                        // Fecha a câmera após 1 segundo
                        setTimeout(() => {
                            fecharCamera();
                            // Executa automaticamente a decomposição
                            setTimeout(() => decompor(), 500);
                        }, 1000);

                        return;
                    } else if (/^\d+$/.test(codigoLido)) {
                        // Se encontrou números mas não é uma chave válida
                        console.log(`Código encontrado com ${codigoLido.length} dígitos`);
                        status.textContent = `Código encontrado: ${codigoLido.length} dígitos (precisa ser 44)`;
                        status.style.color = '#f59e0b';
                    }
                }
            }
        } catch (err) {
            console.error('Erro durante scan:', err);
        }

        requestAnimationFrame(scan);
    }

    console.log('Iniciando loop de scan...');
    scan();
}

// ============= FUNÇÕES DE DECOMPOSIÇÃO =============

/**
 * Remove caracteres não numéricos da chave
 */
function removeMask() {
    const key = getKey();
    const keySemMascara = key.replace(/[^\d]/g, '');
    document.getElementById("key").value = keySemMascara;
}

/**
 * Valida a chave de acesso
 */
function validaKey(){
    const key = getKey();
    if(key.length === 44){

        const arrayChave = key.split('').map(Number);
        const multiplicadores = [];

        let j = 2;
        for(let i = 42; i >= 0; i--){
            multiplicadores[i] = j;
            j++;
            if(j>9){
                j=2;
            }
        }

        let soma = 0;
        for(let i = 0; i < 43; i++){
            soma = soma + arrayChave[i] * multiplicadores[i];
        }

        const dvEsperado = 11 - (soma % 11);
        const dvReal =  parseInt(key.substring(43, 44));

        if(dvReal == dvEsperado){
            return 'OK';
        }else{
            return 'Dígito verificador inválido'
        }
        
    }else{
        return 'A chave deve conter 44 dígitos';
    }
}

/**
 * Obtém a chave do input
 */
function getKey() {
     return document.getElementById("key").value.trim();
}


function decompor(){

    removeMask();

    const msgValidacao = validaKey();

    if(msgValidacao != 'OK' ){
        mostrarErro(msgValidacao);
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
        

        document.getElementById("cUF").textContent = convertUF(cUF);
        document.getElementById("AAMM").textContent = convertData(AAMM);
        document.getElementById("CNPJ").textContent = formataCNPJ(CNPJ);
        document.getElementById("mod").textContent = convertMod(modelo);
        document.getElementById("serie").textContent = serie;
        document.getElementById("nNF").textContent = numero;
        document.getElementById("tpEmis").textContent = convertTpEmis(tpEmis);
        document.getElementById("cNF").textContent = cNF;
        document.getElementById("cDV").textContent = DV;

        document.getElementById("resultados").classList.add('show');
        document.getElementById("resultActions").classList.add('show');

        setTimeout(() => {
            document.getElementById("resultados").scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

/**
 * Mostra mensagem de erro
 */
function mostrarErro(mensagem) {
    alert('❌ ' + mensagem);
}

function convertData(AAMM) {
    const meses = {
        '01': 'Janeiro',
        '02': 'Fevereiro',
        '03': 'Março',
        '04': 'Abril',
        '05': 'Maio',
        '06': 'Junho',
        '07': 'Julho',
        '08': 'Agosto',
        '09': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro'
    };

    const ano = AAMM.substring(0, 2);
    const mes = AAMM.substring(2, 4);

    const nomeMes = meses[mes] || 'Data inválida';
    return `${nomeMes} de 20${ano}`;
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
            return `${modelo} - Modelo desconhecido`;
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
            return `${tpEmis} - Tipo de emissão desconhecido`;
    }
}

function formataCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function copiarResultado(){
    const tabela = document.getElementById("resultTable");
    const texto = Array.from(tabela.rows)
        .map(row => {
            const cells = row.cells;
            const label = cells[0].textContent.replace(/^\s+|\s+$/g, '').split('\n')[0];
            const valor = cells[1].textContent;
            return `${label}: ${valor}`;
        })
        .join('\n');

    navigator.clipboard.writeText(texto)
        .then(() => {
            const btn = document.getElementById('btnCopiar');
            const textoOriginal = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            btn.style.backgroundColor = '#10b981';

            setTimeout(() => {
                btn.innerHTML = textoOriginal;
                btn.style.backgroundColor = '';
            }, 2000);
        })
        .catch(err => console.error('Erro ao copiar:', err));
}

function novaRejta() {
    document.getElementById('key').value = '';
    document.getElementById('resultados').classList.remove('show');
    document.getElementById('resultActions').classList.remove('show');
    document.getElementById('key').focus();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============= EVENT LISTENERS =============

document.addEventListener("DOMContentLoaded", () => {
    const btnDecompor = document.getElementById("btnDecompor");
    const btnCamera = document.getElementById("btnCamera");
    const btnCopiar = document.getElementById("btnCopiar");
    const btnNova = document.getElementById("btnNova");
    const cameraModal = document.getElementById('cameraModal');
    const btnClosCamera = document.getElementById('btnClosCamera');
    const closeBtn = document.querySelector('.close');
    const keyInput = document.getElementById('key');

    if(btnDecompor) btnDecompor.addEventListener("click", decompor);
    if(btnCamera) btnCamera.addEventListener("click", iniciarCamera);
    if(btnCopiar) btnCopiar.addEventListener("click", copiarResultado);
    if(btnNova) btnNova.addEventListener("click", novaRejta);
    if(btnClosCamera) btnClosCamera.addEventListener("click", fecharCamera);
    if(closeBtn) closeBtn.addEventListener("click", fecharCamera);
    
    if(cameraModal) {
        cameraModal.addEventListener('click', (e) => {
            if (e.target === cameraModal) fecharCamera();
        });
    }

    if(keyInput) {
        keyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') decompor();
        });
    }

    if(keyInput) keyInput.focus();
});