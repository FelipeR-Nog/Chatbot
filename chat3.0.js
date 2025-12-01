const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

console.log('Iniciando o Chatbot da Mais Vida Studio de Treinamento...');

const MENSAGENS_FILE = 'mensagens.csv';
const fileHeader = 'Data e Hora,Numero do Cliente,Mensagem\n';

if (!fs.existsSync(MENSAGENS_FILE)) {
    fs.writeFileSync(MENSAGENS_FILE, fileHeader);
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    console.log('QR Code recebido! Por favor, escaneie com seu celular:');
    qrcode.generate(qr, { small: true });
}); //qr code

client.on('authenticated', () => {
    console.log('Autenticação realizada com sucesso!');
}); //deu certo

client.on('auth_failure', msg => {
    console.error('FALHA NA AUTENTICAÇÃO:', msg);
}); //bot falhou

client.on('ready', () => {
    console.log('Aparelho conectado! O Chatbot está online e pronto para operar.');
}); //bot pronto

client.initialize();

process.on('SIGINT', async () => {
    console.log('Desligando o bot');
    await client.destroy();
    console.log('Cliente destruído. Adeus!');
    process.exit(0);
});

const delay = ms => new Promise(res => setTimeout(res, ms));

const userState = {};

async function sendMainMenu(chat, from) {
    await delay(1000);
    await chat.sendStateTyping();
    await delay(1000);
    await client.sendMessage(from, 'Bem-vindo(a) à *Mais Vida Studio de Treinamento*! 💪 Sou seu assistente virtual e estou aqui para facilitar sua rotina de treino e sanar suas duvidas. Como posso te ajudar agora? \n\n 1️⃣ - Conhecer Planos e Serviços \n\n 2️⃣ - Ver Horários e Turmas \n\n 3️⃣ - Como Pagar na Mais Vida \n\n 4️⃣ - Falar com um atendente \n\n 5️⃣ - Deixar uma mensagem \n\n 6️⃣ - Encerrar atendimento');
}


client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) {
        return;
    }

    const chat = await msg.getChat();
    const userId = msg.from;
    const messageBody = msg.body.trim();

    const currentState = userState[userId] || 0;

    if (messageBody === '0' && currentState === 2) {
        userState[userId] = 0;
    }
    
    if (userState[userId] === 0 || currentState === 0) {
        await sendMainMenu(chat, userId);
        userState[userId] = 1; 
        return;
    }

    if (currentState === 1) {
        switch (messageBody) {
            case '1':
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, ''); 
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, 'Investir em você é a melhor decisão! Na *Mais Vida Studio de Treinamento*, seu plano é mais que um acesso, é um passaporte para sua melhor versão. Veja como podemos te ajudar a chegar lá: \n\n⭐ *NOSSOS PLANOS FIDELIDADE* ⭐ \n_Ideal para quem busca resultados consistentes com o máximo de economia._ \n\n *Plano Anual:* Apenas R$ 75,00 por mês (Contrato de 12 meses) \n *Plano Semestral:* Apenas R$ 80,00 por mês (Contrato de 6 meses) \n *Plano Trimestral:* Apenas R$ 85,00 por mês (Contrato de 3 meses)\n\n\n💪 *PLANOs BÁSICOS (Sem Fidelidade)* 💪 \n_Treine no seu ritmo, mês a mês, sem amarras._ \n\n *Plano Mensal Individual:* R$ 90,00 por mês \n *Pacote Casal ou Família:* Desconto especial! Apenas R$ 85,00 por pessoa. _(Válido para planos mensais)_ \n *Funcional:* R$ 150 por mês');
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, '💼 *SERVIÇOS INDIVIDUAIS* 💼 \n_Para visitas esporádicas ou para turbinar seus resultados._ \n\n *Diária:* R$ 15,00 \n *Semana:* R$ 30,00 \n *Circuito Intervalado Funcinal:* R$ 90,00 por mês \n *Consulta com Nutricionista:* R$ 170,00 \n *Divulgação na TV Interna:* R$ 50,00 \n\n\n📄 *AVALIAÇÕES:* 📄 \n\n *Avaliação Antropométrica:* R$ 50,00 \n *Avaliação Clínica:* R$ 50,00 \n *Testes Físicos:* R$ 50,00 \n\n\nPara voltar ao menu, digite *"0"*.');
                userState[userId] = 2;
                break;
            
            case '2':
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, 'Aqui você fica por dentro de tudo que rola na *Mais Vida Studio de treinamento!* 🗓️.\n\n ⏰ *NOSSO HORÁRIO DE FUNCIONAMENTO:* \n\n*Segunda à Sexta:* 05:00 à 10:00 e 15:00 à 21:00 \n*Sábado:* 06:00 à 10:00 \n\n_Fechado aos domingos_');
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, '💪 *GRADE DE TURMAS DA SEMANA:* \n_Nossas turmas são pura energia! Confira os horários e Personais:_\n\n🌤️ *Manhã:* \n 05:00 às 06:00 (Vini)\n 06:00 às 07:00 (Vini) \n 07:00 às 08:00 (Diego) \n 08:00 às 09:00 (Diego) \n 09:00 às 10:00 (Diego) \n\n☀️ *Tarde:* \n 15:00 às 16:00 (Vini) \n 16:00 às 17:00 (Vini) \n 17:00 às 18:00 (Diego) \n\n🌙 *Noite:* \n 18:00 às 19:00 (Diego) \n 19:00 às 20:00 (dudu) \n 20:00 às 21:00 (dudu) \n\n🌅 *Sábado:* \n 06:00 às 10:00 (Vini)\n\n\nPara voltar ao menu, digite *"0"*.');
                userState[userId] = 2;
                break;

            case '3':
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, 'Para sua comodidade, aceitamos diversas formas de pagamento na recepção da academia. Você pode escolher a que preferir:\n\n 💵 *Dinheiro* \n\n 💳 *Cartão de Débito ou crédito* (Com juros) \n\n 💳 *Recorrente* \n _(Cobrança automática mensal sem comprometer o limite do seu cartão)._ \n\n 📱 *PIX:* _20294919000142_ \n\n\n_Caso haja qualquer dúvida sobre as formas de pagamentos ou quiser fazer a adesão de algum plano, é só falar com nossa equipe na recepção da academia_ \n\n\nPara voltar ao menu, digite *"0"*.');
                userState[userId] = 2;
                break;

            case '4':
                await delay(1000);
                await chat.sendStateTyping();
                await delay(1000);
                await client.sendMessage(userId, 'Entendido! Para garantir um atendimento completo e personalizado, nossa equipe está disponível para conversar com você presencialmente em nossa recepção.\n\nAdoraríamos te receber para um café e tirar todas as suas dúvidas! ☕ \n\n*Horários de Atendimento na Recepção:* \n\n *Segunda a Sexta:* 05:00 às 10:00 e 15:00 às 21:00 \n *Sábados:* 06:00 às 10:00 \n\n*Nosso Endereço:* 📍 \nTravessa Joaquin Saraiva, N°84, José Simões, Limoeiro do Norte - CE, 62930-000 \n\n🗺️ *Ver no mapa:* \nhttps://maps.app.goo.gl/tvMW5g3xXCYGRT9p9 \n\n\nPara voltar ao menu, digite *"0"*.');
                userState[userId] = 2;
                break;
            
            case '5':
                await client.sendMessage(userId, 'Certo. Por favor, digite sua dúvida ou mensagem completa abaixo. Nossa equipe irá ler e responder assim que possível.');
                userState[userId] = 3; 
                break;

            case '6':
                await client.sendMessage(userId, 'ATENDIMENTO ENCERRADO ❌.\n\n A Mais Vida Studio de Treinamento agradece o seu contato! Se precisar de algo mais, é só mandar uma nova mensagem. 💪');
                userState[userId] = 0;
                break;
            
            default:
                await client.sendMessage(userId, 'Opção inválida. Por favor, digite um dos números do menu para continuar.');
                await sendMainMenu(chat, userId);
                break;
        }
    } 

    //  salvar mensagem 
    else if (currentState === 3) {
        
        const timestamp = new Date().toLocaleString('pt-BR');
        const clientNumber = userId.split('@')[0];
        const clientMessage = msg.body.trim();
        const csvLine = `"${timestamp}","${clientNumber}","${clientMessage.replace(/"/g, '""')}"\n`;

        fs.appendFileSync(MENSAGENS_FILE, csvLine);

        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(userId, 'Sua mensagem foi registrada com sucesso! ✅\n\nUm de nossos atendentes responderá por aqui o mais breve possível.\n\nEnquanto isso, o que mais posso fazer por você?');
        
        await sendMainMenu(chat, userId);
        userState[userId] = 1;
    }
    else if (currentState === 2 && messageBody !== '0') {
        await client.sendMessage(userId, "Comando inválido. Por favor, digite '0' para retornar ao menu principal.");
    }
});