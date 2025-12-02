# 🤖 Chatbot WhatsApp - Mais Vida Studio

> Um assistente virtual automatizado para academias e studios de treinamento, desenvolvido em Node.js.

![Status](https://img.shields.io/badge/Status-Descontinuado-red)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Library](https://img.shields.io/badge/Lib-whatsapp--web.js-blue)

## 📋 Sobre o Projeto

Este projeto é um **Chatbot de Autoatendimento** criado para facilitar a comunicação entre o "Mais Vida Studio de Treinamento" e seus alunos. Ele utiliza a biblioteca `whatsapp-web.js` para simular um cliente WhatsApp Web, oferecendo um menu de navegação automatizado.

O bot é capaz de responder dúvidas frequentes, apresentar planos, horários e **registrar mensagens de usuários** em um arquivo local (`.csv`) para atendimento posterior.

## ✨ Funcionalidades

O bot oferece um menu interativo com as seguintes opções:

* **1️⃣ Planos e Serviços:** Apresentação detalhada de valores (Mensal, Trimestral, Anual) e serviços extras.
* **2️⃣ Horários e Turmas:** Grade de horários de funcionamento e professores responsáveis.
* **3️⃣ Formas de Pagamento:** Informações sobre PIX, cartões e dinheiro.
* **4️⃣ Localização:** Envio de endereço e link do Google Maps.
* **5️⃣ Deixar Recado (Log):** O usuário pode escrever uma mensagem que é salva automaticamente em um arquivo `mensagens.csv` (Data, Número e Mensagem).
* **6️⃣ Encerramento:** Finaliza o atendimento e reseta o estado do usuário.

---

## ⚠️ Limitações e Bugs Conhecidos (Motivo da Pausa)

Este projeto foi desenvolvido com muito carinho, **porém o desenvolvimento foi interrompido**. Abaixo estão os dois principais problemas técnicos encontrados que inviabilizaram o uso contínuo pelo cliente original:

### 1. Incompatibilidade com iPhone (iOS) 🍎
Aparentemente, a biblioteca utilizada (`whatsapp-web.js`) apresentou falha quando o número estava rodando em um **iPhone**. O cliente decidiu não prosseguir devido a essa limitação de hardware.

### 2. O Bug do "Flodando ao Reiniciar 🌊
Existe um comportamento indesejado no gerenciamento de estado/sessão:
* Se o bot for desligado e ligado novamente no mesmo dia, ele tende a **ler e processar todas as mensagens recebidas naquele dia novamente**.
* Isso causa um "flood" de respostas repetidas para os usuários, respondendo mensagens antigas como se fossem novas.

> **Nota do Desenvolvedor:** Eu não cheguei a investigar a fundo a correção desses bugs pois o projeto foi cancelado devido ao erro nº 1.

---

## 🤝 Contribuição e Soluções

**Este código é Open Source!** Sinta-se livre para usar, estudar ou modificar.

Se você é um desenvolvedor e sabe como resolver o problema de conexão com iOS ou como corrigir o loop de mensagens na inicialização, **eu adoraria saber a solução!**

Sinta-se à vontade para abrir uma *Issue* ou qualquer coisa do tipo. Eu agradeço! 🙌

