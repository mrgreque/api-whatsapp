# API WhatsApp TSP

> API para consumo de rotinas diversas para envio de mensagens (alertas) ou validação de números WhatsApp

| Método | Rota | Sub-Rota | Funcionalidade |
| ------ | ------ | ------- | -------|
| _GET_ | status  | | Retorna o status da conexão e o QR Code (caso necessário) |
| _POST_ | send  | message | Envia uma mensagem única ao contato informado |
| _POST_ | process | messages | Envia mensagens em massa e retorna se a mesma foi enviada |
| _POST_ | check | numbers | Valida se os números informados são WhatsApp válidos |