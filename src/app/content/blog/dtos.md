---
title: O que são DTOs (Data Transfer Objects)?
description: Entenda o papel dos DTOs na arquitetura de software e como eles ajudam a melhorar a comunicação entre diferentes camadas e sistemas.
date: '2025-11-05'
categories:
  - DTOs
  - Boas Práticas
  - Arquitetura de Software
published: true
---

## Introdução aos DTOs

**Data Transfer Objects (DTOs)** — traduzidos como **Objetos de Transferência de Dados** — são estruturas simples usadas pra transportar dados entre partes diferentes de um sistema.

Aparecem com frequência entre camadas de aplicação ou entre sistemas.

O principal objetivo dos DTOs é **encapsular os dados** de forma que possam ser facilmente transferidos, **sem expor a lógica de negócio** ou detalhes internos da aplicação.

Eles aparecem com frequência em arquiteturas como **MVC (Model-View-Controller)** ou em **serviços web**, garantindo que só os dados necessários sejam compartilhados.

Sem DTOs, você pode acabar passando objetos complexos (por exemplo, entidades do banco de dados) direto pro cliente.

### Exemplo: Expondo dados sensíveis

Considere uma entidade de usuário no banco de dados com **informações sensíveis**:

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

Quando a API responde pro cliente, você não quer expor **senha** ou outras informações internas. É aí que o DTO resolve o problema:

```ts
interface UserDTO {
	id: string;
	name: string;
	email: string;
}
```

Agora sua API usa o **UserDTO** pra transferir dados, garantindo segurança e eficiência.

## Por que usar DTOs?

Eles evitam o **acoplamento direto entre a lógica de negócio e os dados externos**.

### Características dos DTOs

- **Simples** — contêm apenas os dados necessários, sem lógica de negócio
- **Imutáveis** — uma vez criados, são usados só pra transferência
- **Específicos** — projetados pra casos de uso específicos, facilitando manutenção
- **Desacoplados** — separados de entidades de banco e lógica de negócio

### Benefícios dos DTOs

- **Clareza** — facilita o entendimento dos dados transferidos
- **Manutenção** — alterações centralizadas em um único lugar
- **Validação** — permite validar os dados antes do processamento

---

## Tipos de DTOs

Os DTOs são classificados em diferentes tipos. Os principais são:

- **Request DTO** — representa os dados recebidos de uma requisição (geralmente HTTP). Define quais dados são esperados do cliente, funcionando como camada de validação.
- **Response DTO** — define o formato enviado de volta pro cliente, garantindo que só os dados necessários sejam expostos.

Em projetos maiores, também encontramos:

- **Update DTOs** — pra atualizar apenas alguns campos de um recurso
- **Domain DTOs** — representam dados específicos de um domínio ou contexto
- **Pagination DTOs** — estruturam informações de paginação (página, total, itens por página)

### Exemplo de DTOs

```ts
interface CreateUserRequestDTO {
	name: string;
	email: string;
	password: string;
}

interface UserResponseDTO {
	id: string;
	name: string;
	email: string;
}

interface DeleteUserResponseDTO {
	message: string;
	success: boolean;
}
```

## Fluxo: Controller → Service → Repository

Um fluxo comum em aplicações com arquitetura **MVC** é:

1. **Controller** recebe a requisição HTTP e extrai os dados
2. **Controller** cria um Request DTO com os dados extraídos
3. **Controller** passa o Request DTO pro Service/camada de negócio
4. **Service** processa os dados e interage com o Repository pra persistência
5. **Service** cria um Response DTO com os dados processados
6. **Controller** envia o Response DTO como resposta HTTP

### Implementação do Fluxo

Começamos com a entidade do usuário:

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

DTOs:

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

Repository — responsável pela persistência:

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

Service — contém a lógica de negócio:

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

Controller — orquestra a requisição:

```ts
import { UserService } from '../services/user.service';
import { CreateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
	constructor(private userService: UserService) {}

	async createUser(
		request: FastifyRequest<{ Body: CreateUserDTO }>,
		reply: FastifyReply
	) {
		const userData: CreateUserDTO = request.body;
		const userResponse: UserResponseDTO = this.userService.createUser(userData);
		return reply.code(201).send(userResponse);
	}
}
```

### Fluxo Explicado

- **Controller** recebe a requisição HTTP, interpreta os dados e transforma em Request DTO. Esse DTO define **exatamente o formato e os campos aceitos**, garantindo consistência e validação.
- **Service** recebe o Request DTO, processa conforme a lógica de negócio e interage com o Repository, que cria o usuário e retorna a entidade completa.
- **Service** transforma a entidade em Response DTO, definindo **quais dados serão expostos pro cliente**.
- **Controller** envia o Response DTO como resposta HTTP, garantindo que só os dados necessários sejam compartilhados.

## Conclusão

DTOs trazem **clareza** à forma como os dados trafegam dentro da aplicação e **reduzem o acoplamento** entre lógica de negócio e mundo externo (APIs, front-end, bancos).

Use-os como padrão nas suas arquiteturas pra ter mais manutenção e segurança.
