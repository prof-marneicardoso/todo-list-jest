# Testes no Back-End Node.js com Jest

### Objetivos da Aula:

1. Entender o que são testes automatizados e por que são importantes.

2. Aprender a configurar Jest para projetos Node.js.

3. Escrever testes unitários e de integração usando Jest.

4. Praticar escrevendo e executando testes com exemplos práticos.

## Parte 1: Conceitos Fundamentais

### O que são testes e por que são importantes??

Testes automatizados são scripts que verificam automaticamente se o código funciona como esperado. Eles ajudam a garantir a qualidade do software e reduzem a chance de introduzir erros ao adicionar novas funcionalidades.

**Analogia**: Imagine um chefe de cozinha que prova cada prato antes de servi-lo. Os testes são como esse processo de verificação para garantir que o produto final está conforme o esperado.

### Tipos de testes:

1. **Testes Unitários**: Verificam uma parte específica e isolada do código (funções ou métodos).

2. **Testes de Integração**: Testam como diferentes partes do sistema funcionam juntas.

3. **Testes End-to-End (E2E)**: Simulam o comportamento do usuário final, testando todo o sistema.

### Ferramentas principais para Node.js

- **Jest**: Biblioteca poderosa para testes unitários e de integração.

- **Supertest**: Para testar endpoints de APIs REST.

## Parte 2: Configurando Jest em um Projeto Node.js

### Passo 1: Inicializar o projeto

Abra o **cmd**, crie uma nova pasta para o projeto e entre na pasta:

```
mkdir todo-list
cd todo-list
```

Ainda no **cmd**, abra o projeto no Visual Studio Code

```
code .
```

Feche o **cmd** e abra o terminal do **vscode**, com Ctrl + J

Crie o arquivo **package.json** na raíz do projeto:

```
npm init -y
```

### Passo 2: Instalar Jest e Supertest

```
npm install --save-dev jest supertest
```

- **Jest**: Framework de testes em JavaScript.

- **Supertest**: Biblioteca que facilita o teste de APIs HTTP.

### Passo 3: Configurar o Jest

Crie um arquivo **jest.config.js** com o seguinte conteúdo:

```js
export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js']
};
```

## Parte 3: Escrevendo o Código da API

Vamos criar uma API simples de tarefas.

### Estrutura de pastas:

```
src/
  app.js
    
  controllers/
    taskController.js
    
  models/
    taskModel.js

test/
  app.test.js
  taskModel.test.js
```

### taskModel.js

```js
let tasks = [
  {
    id: 1,
    title: 'Buy groceries'
  }
];

const getTasks = () => tasks;

const createTask = (title) => {
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  return newTask;
};

export default { getTasks, createTask };
```

### taskController.js

```js
import taskModel from '../models/taskModel.js';

const getAllTasks = (request, response) => {
  const tasks = taskModel.getTasks();
  response.status(200).json(tasks);
};

const createTask = (request, response) => {
  const { title } = request.body;
  if (!title) return response.status(400).json({ message: 'Title is required' });

  const task = taskModel.createTask(title);
  response.status(201).json(task);
};

export default { getAllTasks, createTask };
```

### app.js

```js
import express from 'express';
import taskController from './controllers/taskController.js';

const app = express();
app.use(express.json());

app.get('/tasks', taskController.getAllTasks);
app.post('/tasks', taskController.createTask);

export default app;
```

## Parte 4: Escrevendo os Testes

### taskModel.test.js

```js
import taskModel from '../src/models/taskModel.js';

describe('Task Model', () => {
  test('getTasks deve retornar todas as tasks', () => {
    const tasks = taskModel.getTasks();
    expect(tasks).toEqual([{ id: 1, title: 'Buy groceries' }]);
  });

  test('createTask deve adicionar uma nova task', () => {
    const newTask = taskModel.createTask('Learn Node.js');
    expect(newTask).toEqual({ id: 2, title: 'Learn Node.js' });
    expect(taskModel.getTasks()).toHaveLength(2);
  });
});
```

### app.test.js

```js
import request from 'supertest';
import app from '../src/app.js';

describe('Task API', () => {
  test('GET /tasks deve retornar todas as tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Buy groceries' }]);
  });

  test('POST /tasks deve criar uma nova task', async () => {
    const response = await request(app)
        .post('/tasks')
        .send({ title: 'Learn testing' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, title: 'Learn testing' });
  });

  test('POST /tasks deve retornar 400 se não for informado title', async () => {
    const response = await request(app).post('/tasks').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Title is required' });
  });
});
```

## Parte 5: Adicione o "type module" e o Express

No arquivo **package.json** adicione a linha:

```json
"type": "module",
```

No terminal, adicione o Express:

```
npm i express
```

No arquivo **package.json**, adicione o script de teste:

```json
"scripts": {
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
}
```

O arquivo **package.json** deve ficar assim:

```json
{
  "name": "todo-list",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
      "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
      "jest": "^29.7.0",
      "supertest": "^7.0.0"
  },
  "dependencies": {
      "express": "^4.21.2"
  }
}
```

## Parte 6: Executando os Testes

Para executar os testes, basta rodar o comando:

```
npm test
```

Se tudo estiver correto, você verá uma saída semelhante a:

```
PASS  test/app.test.js
PASS  test/taskModel.test.js

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.648 s
Ran all test suites.
```

## Exercícios

### Exercício 1:

Adicione um método deleteTask ao taskModel.js que remova uma tarefa pelo ID. Crie um endpoint correspondente no taskController.js e escreva um teste para garantir que a remoção está funcionando corretamente.

### Exercício 2:

Adicione validação ao método createTask para evitar a criação de tarefas duplicadas (mesmo título). Escreva um teste que valide essa funcionalidade.

### Exercício 3:

Escreva um teste que verifique o comportamento do sistema quando a lista de tarefas está vazia.
