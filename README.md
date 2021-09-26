# JustChatter
![IMG](https://i.imgur.com/frfpfko.jpg)
### Sobre:
#### Descrição:
*Web chat desenvolvido em typescript utilizando react com backend em python e banco de dados mongodb.*
#### Imagens:
[Imagens do Projeto](https://imgur.com/a/ykUcJ8s)

#### Utilizado no projeto:
- Typescript
- React
- Bootstrap
- Python
- Flask
- JWT (Autenticação de Rotas / Sessão)
- Socket.io
- MondoDB

#### Observações:
*O mongodb foi utilizado apenas pela facilidade de um cluster gratuito, para a utilização fora do ambiênte de desenvolvimento recomenda-se o uso de um banco de dados relacional.*


### Intalação:
- **Front-end**:
  - *Faça download dos arquivos.*
  - *Faça o download e instalação do [node](https://nodejs.org/en/).*
  - *Abra a pasta **front**.*
  - *Digite `npm i yarn -g` no cmd.*
  - *Digite `yarn`no cmd para fazer download das dependências.*
  - *Por fim, para executar digite `yarn start` no cmd.*
- **Back-end**:
  - *Faça download dos arquivos.*
  - *Faça download do [python](https://www.python.org/downloads/)*
  - *Execute o arquivo `install.cmd` para fazer download das dependências*
  - *Agora é só excutar o arquivo `start.cmd` para iniciar*

### Rotas da API:
| URL | Método | Descrição |
| --- | --- | --- |
| http://localhost:8080/api/v1/justchatter/auth/login | POST | Realizar login |
| http://localhost:8080/api/v1/justchatter/auth/register | POST | Realizar Registro |
| http://localhost:8080/api/v1/justchatter/chat/rooms | GET | Receber a lista de salas de bate-papo |
| http://localhost:8080/api/v1/justchatter/chat/room/:ID | GET | Receber informações de uma sala especifíca |
