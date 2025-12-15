---
title: O que são DTOs (Data Transfer Objects)?
description: Entenda o papel dos DTOs na arquitetura de software e como eles ajudam a melhorar a comunicação entre diferentes camadas e sistemas.
tldr:
  - Explica por que DTOs existem e como evitam expor entidades e lógica de negócio.
  - Mostra exemplos práticos de Request/Response DTO e fluxo Controller → Service → Repository.
  - Resume melhores práticas para deixar dados mais seguros e manutenção mais simples.
date: '2025-11-05'
categories:
  - DTOs
  - Boas Práticas
  - Arquitetura de Software
published: true
---

## **Introdução aos DTOs**

Os **Data Transfer Objects (DTOs)**, traduzidos como **Objetos de Transferência de Dados**, são estruturas simples usadas para transportar dados entre diferentes partes de um sistema, especialmente entre camadas de aplicação ou entre sistemas. <br />
<br />

O **principal objetivo** dos **DTOs** é **encapsular os dados** de forma que possam ser facilmente transferidos, **sem expor a lógica de negócios** ou detalhes internos da aplicação.
Eles são frequentemente usados em arquiteturas de software como **MVC (Model-View-Controller)** ou em **serviços web** para garantir que apenas os dados necessários sejam compartilhados. <br />
Sem um **DTOs**, você pode acabar passando objetos **complexos** (por exemplo, entidades do banco de dados) direto para o cliente. <br /> <br />

**Exemplo:** <br />
Onde você tem uma **entidade de usuário** no banco de dados que contém **informações sensíveis como senha, data de criação**, etc. <br />

```ts
export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
```

Mas aí quando a API responde ao cliente, você não quer expor a **senha** ou outras informações internas, certo? <br />

É aí que entra o **DTO** para resolver esse problema. Você cria um **UserDTO** que contém apenas os campos que você quer expor para o cliente.

```ts
interface UserDTO {
	id: string;
	name: string;
	email: string;
}
```

Agora sua API, sempre que receber ou enviar dados de usuário, vai usar o **UserDTO**. Isso garante que apenas os dados necessários sejam transferidos, melhorando a **segurança** e a **eficiência** da comunicação.
<br />

## **Por que usar DTOs?**

Eles evitam o **acoplamento direto entre a lógica de negócios e os dados externos**.
<br />

### **Características dos DTOs**

- **Simples**: Contêm apenas os dados necessários, sem lógica de negócios.
- **Imutáveis (idealmente)**: Uma vez criados e usados apenas para transferência de dados.
- **Específicos**: Sendo projetados para casos de uso específicos, facilitando a manutenção.
- **Desacoplados de Entidades de banco de dados**: Separando a estrutura de dados da lógica de negócios.
  <br />

### **Benefícios dos DTOs**

- **Clareza**: Facilita o entendimento dos dados que estão sendo transferidos.
- **Facilidade de manutenção**: Qualquer alteração pode ser feita em um único lugar.
- **Validação**: Permite validar os dados antes de serem processados.

---

## **Tipos de DTOs**

Os Objetos **DTOs** são classificados em diferentes tipos, mas como principais vamos destacar dois:

- **Request DTO**: Representa os dados recebidos de uma requisição (geralmente HTTP), onde você define quais dados são esperados do cliente, servindo como uma camada de validação.
- **Response DTO**: Define o formato que será enviado de volta ao cliente, garantindo que apenas os dados necessários sejam expostos.

<br />

Em projetos maiores, é comum encontrar outros tipos de DTOs, cada um com um propósito específico, como:

- **Update DTOs**: Utilizados para atualizar apenas determinados campos de um recurso.
- **Domain DTOs**: Representam dados específicos de um domínio ou contexto da aplicação.
- **Pagination DTOs**: Estruturam informações de paginação, como número da página, total de itens e itens por página (metadados de paginação).

### **Exemplo Prático de DTOs de Request e Response**

```ts
interface CreateUserRequestDTO {
	name: string;
	email: string;
	password: string;
}
```

```ts
interface GetUserRequestDTO {
	id: string;
}
```

```ts
interface UserResponseDTO {
	id: string;
	name: string;
	email: string;
}
```

```ts
interface DeleteUserResponseDTO {
	message: string;
	success: boolean;
}
```

<br />

## **Controller ao Repository**

Um fluxo que é comum em aplicaçoes com Arquitetura model-view-controller (MVC) é o seguinte:

1. O **Controller** recebe uma requisição HTTP e extrai os dados do corpo da requisição.
2. O **Controller** cria um **Request DTO** com os dados extraídos.
3. O **Controller** passa o **Request DTO** para o serviço ou camada de negócio.
4. O serviço processa os dados e interage com o **Repository** para persistir ou recuperar dados do banco de dados.
5. O serviço recebe os dados do **Repository** e cria um **Response DTO** com os dados que serão enviados de volta ao cliente.
6. O **Controller** envia o **Response DTO** como resposta HTTP.

### **Exemplo de Fluxo com DTOs**

vamos começar com a entidade do usuário:

```ts
export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
```

Agora, vamos definir os DTOs:

```ts
// dtos/user.dto.ts
export interface CreateUserDTO {
	name: string;
	email: string;
	password: string;
}

export interface UserResponseDTO {
	id: string;
	name: string;
	email: string;
}
```

Com isso vamos ter o Repository:

```ts
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/user.dto';
import { UUID } from 'crypto';

export class UserRepository {
	private users: User[] = [];

	create(userData: CreateUserDTO): User {
		const newUser: User = {
			id: UUID.v4(),
			...userData,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		this.users.push(newUser);
		return newUser;
	}
}
```

E o Service:

```ts
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export class UserService {
	constructor(private userRepository: UserRepository) {}

	createUser(userData: CreateUserDTO): UserResponseDTO {
		const user: User = this.userRepository.create(userData);

		const userResponse: UserResponseDTO = {
			id: user.id,
			name: user.name,
			email: user.email
		};

		return userResponse;
	}
}
```

E finalmente o Controller:

```ts
import { UserService } from '../services/user.service';
import { CreateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
	constructor(private userService: UserService) {}

	async createUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) {
		const userData: CreateUserDTO = request.body;

		const userResponse: UserResponseDTO = this.userService.createUser(userData);

		return reply.code(201).send(userResponse);
	}
}
```

<br />

O **Controller** é responsável por **receber a requisição HTTP**, interpretar os dados enviados e transformá-los em um **Request DTO**.
Esse DTO define **exatamente o formato e os campos que a API aceita**, garantindo consistência e validação na entrada. <br />
O **Service** que lida com a lógica de negócios, recebe o **Request DTO**, processa os dados conforme necessário e interage com o **Repository** que depois de criar o usuário, retorna a entidade completa. <br />
O **Service** então cria um **Response DTO** a partir da entidade retornada pelo **Repository**. <br />
Esse **Response DTO** define **quais dados serão expostos ao cliente**. Finalmente, o **Controller** envia o **Response DTO** como resposta HTTP para o cliente, garantindo que apenas os dados necessários sejam compartilhados. <br />

## **Conclusão**

- DTOs trazem clareza à forma como os dados trafegam dentro da aplicação
- Reduzem o acoplamento entre a lógica de negócio e o mundo externo (APIs, front-end, bancos)
