## Super Cursos - Plataforma de Gerenciamento de Cursos Online

**Super Cursos** é uma plataforma completa para gerenciar cursos online, conectando professores, administradores em um ambiente intuitivo e eficiente.

**Problema que Resolve:**

A plataforma Super Cursos visa solucionar os desafios de criar, gerenciar e promover cursos online, simplificando o processo para professores e instituições, e tornando a experiência de aprendizado mais engajadora para os alunos. 

**Tecnologias Utilizadas:**

* **Backend:** Node.js, Express.js, TypeScript, PostgreSQL
* **Frontend:** React.js, Next
* **Banco de Dados:** PostgreSQL
* **Gerenciamento de Containers:** Docker
* **Testes:** mocharc

**Como Executar:**

1. **Clonar o Repositório:**
```bash
git clone git@github.com:SENAI-SD/node-senior-01720-2024-057.737.076-67.git
```
2. **Criar as Imagens e Executar os Containers :**
```bash
cd node-senior-01720-2024-057.737.076-67
docker-compose up --build
```
3. **Acessar a Aplicação:**
Abra seu navegador e acesse `http://localhost` para visualizar a plataforma Super Cursos.

Para logar como admin
```
{
    "email": "admin@supercourses.com",
    "password": "8191279"
}
```
Para logar como writer
```
{
    "email": "writer@supercourses.com",
    "password": "8191279"
}
```

**Melhorias Futuras:**

* Implementar um sistema de pagamentos integrado para cursos pagos.
* Adicionar um sistema de gamificação para motivar alunos.
* Criar um sistema de análise de dados para monitorar o desempenho dos cursos.
* Integrar a plataforma com outras ferramentas de ensino, como plataformas de videoconferência.

**Contribuições:**

Contribuições para o desenvolvimento da plataforma Super Cursos são bem-vindas! Para colaborar, siga os seguintes passos:

1. Faça um fork do repositório.
2. Crie um novo branch para suas mudanças.
3. Faça suas alterações e commit.
4. Envie um pull request para o branch principal do repositório.

**Licença:**

A plataforma Super Cursos está licenciada sob a licença MIT.

