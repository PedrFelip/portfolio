---
title: DIP - Dependa de abstrações
description: Entenda o Princípio da Inversão de Dependência e sua importância na arquitetura de software.
date: "2026-01-25"
categories:
  - SOLID
  - Design Patterns
published: true
---

## Introdução

O **Princípio da Inversão de Dependência (DIP)** é o D de SOLID. Ele é o primeiro post sobre SOLID que faço por aqui, e um dos princípios mais importantes de design de software. Provavelmente o mais mal compreendido.

O DIP estabelece duas regras principais:

> 1. Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
> 2. Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações

Ok, vamos detalhar isso.

## O que é uma **abstração**?

Em conceito puro, uma abstração é algo que representa outra coisa, mas de forma simplificada. Exemplo: você dirige um carro. Não precisa entender como o motor funciona, ou como o sistema de injeção eletrônica opera.

E no contexto da ciência da computação:

> Hardware -> Sistema operacional -> Runtime -> Linguagem de programação -> Framework -> Aplicação -> Regras de negócio

Outro exemplo: ORMs, abstraindo queries. E um que tá na moda agora: LLMs.

Um bom desenvolvedor faz boas abstrações.

## Módulos de **alto nível**

- Regras de negócio
- Decisões estratégicas

Aqui estamos falando do **core** da aplicação. O que ela faz, qual problema resolve. Mais pra frente vamos ver um exemplo de código com uma regra de negócio de um sistema de pagamentos.

> "Um pedido só pode ser pago uma vez" — "Um usuário não pode ter dois e-mails iguais" — "Um plano gratuito tem limites" — "Um pagamento aprovado dispara efeitos"

Repare que nada disso fala de como é implementado. Apenas a regra. Nada de banco de dados, HTTP, framework etc.

A **regra de negócio** deve ser independente de qualquer detalhe de implementação.

Como foi dito, o módulo de **alto nível** não deve depender do módulo de **baixo nível**. Mas como fazer isso na prática? Dependência não é chamada de método.

## Módulos de **baixo nível**

Se os módulos de **alto nível** representam o que a aplicação faz, os módulos de **baixo nível** são os detalhes de implementação. Ou seja, como isso é feito.

- Persistência de dados
- Comunicação externa
- Integrações
- Infraestrutura

> "Onde os dados são salvos?" — "Como se comunica com outro sistema?" — "Como autentica um usuário?" — "Como enviar um e-mail?"

Um ponto sobre módulos de **baixo nível** é que eles podem mudar com frequência. Você pode começar usando um serviço de e-mail e depois trocar por outro.

Qualquer mudança em um módulo de baixo nível não deve impactar o módulo de alto nível. Imagina uma simples mudança de serviço de e-mail quebrar toda a regra de negócio de autenticação de usuário? Seria um caos.

> Baixo nível é sobre execução, não sobre intenção

---

## Aonde a dependência deve apontar?

Agora que entendemos o que são módulos de **alto** e **baixo nível**, vamos entender como a dependência deve ser direcionada.

A dependência "natural" é do módulo de **alto nível** pro módulo de **baixo nível**. O fluxo depende de quem chama quem, e geralmente o módulo de alto nível chama o de baixo nível pra realizar uma tarefa específica.

Mas o **DIP inverte essa dependência**. Ambos os módulos devem depender de **abstrações**. Ou seja, o módulo de alto nível não conhece os detalhes do módulo de baixo nível, e vice-versa.

![Fluxo da dependencia](/images/posts/dip/dip.webp)

## Exemplo no sistema de pagamentos fictício

```ts title="payments/domain.ts"
// Abstrações (definidas pelo domínio / core)

export interface PaymentGateway {
  charge(
    amount: number,
    paymentData: unknown,
  ): Promise<
    | { success: true; provider: string; providerPaymentId: string }
    | { success: false; provider: string; reason?: string }
  >;
}

export interface PaymentRepository {
  findByOrderId(orderId: string): Promise<Payment | null>;
  save(payment: Payment): Promise<void>;
}

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}

// Tipos do domínio
export type PaymentStatus = "paid" | "failed";

export interface Payment {
  orderId: string;
  amount: number;
  provider: string;
  status: PaymentStatus;
}

export interface DomainEvent {
  type: "payment.approved" | "payment.failed";
  payload: unknown;
}
```

Essas interfaces não existem porque Stripe, PayPal ou banco de dados existem. Elas existem porque o **domínio** precisa dessas capacidades.

```ts
/// Caso de uso (módulo de alto nível)
// Depende apenas de abstrações

export class PaymentUseCase {
  constructor(
    private readonly payments: PaymentRepository,
    private readonly gateway: PaymentGateway,
    private readonly events: EventPublisher,
  ) {}

  async pay(orderId: string, amount: number, paymentData: unknown) {
    const existingPayment = await this.payments.findByOrderId(orderId);

    if (existingPayment?.status === "paid") {
      throw new Error("Pedido já foi pago");
    }

    const result = await this.gateway.charge(amount, paymentData);

    const payment: Payment = {
      orderId,
      amount,
      provider: result.provider,
      status: result.success ? "paid" : "failed",
    };

    await this.payments.save(payment);

    if (result.success) {
      await this.events.publish({
        type: "payment.approved",
        payload: { orderId, amount },
      });
    }

    return result;
  }
}
```

E aqui está o verdadeiro **DIP**, sem nenhuma importação de Stripe, PayPal ou banco de dados no core. Apenas **regras e decisões de negócio**.

```ts
// Implementação de baixo nível (detalhe)

export class StripeGateway implements PaymentGateway {
  async charge(amount: number, paymentData: unknown) {
    // chamada real para API da Stripe
    return {
      success: true,
      provider: "stripe",
      providerPaymentId: "ch_123",
    };
  }
}

export class PaypalGateway implements PaymentGateway {
  async charge(amount: number, paymentData: unknown) {
    return {
      success: true,
      provider: "paypal",
      providerPaymentId: "pp_456",
    };
  }
}
```

```ts
// Repositório em memória (baixo nível)
export class InMemoryPaymentRepository implements PaymentRepository {
  private payments = new Map<string, Payment>();

  async findByOrderId(orderId: string): Promise<Payment | null> {
    return this.payments.get(orderId) ?? null;
  }

  async save(payment: Payment): Promise<void> {
    this.payments.set(payment.orderId, payment);
  }
}
```

```ts
// Publisher simples (baixo nível)
export class ConsoleEventPublisher implements EventPublisher {
  async publish(event: DomainEvent): Promise<void> {
    console.log("Evento publicado:", event);
  }
}
```

```ts
// trocando gateways sem mudar o core
const repo = new InMemoryPaymentRepository();
const publisher = new ConsoleEventPublisher();

// Usando Stripe
const stripe = new StripeGateway();
const useCaseStripe = new PaymentUseCase(repo, stripe, publisher);
await useCaseStripe.pay("order-1", 100, { card: "4242" });

// Usando PayPal (mesmo core, só troca o gateway)
const paypal = new PaypalGateway();
const useCasePaypal = new PaymentUseCase(repo, paypal, publisher);
await useCasePaypal.pay("order-2", 250, { account: "user@paypal" });
```

Nesse exemplo, o **core da aplicação** (`PaymentUseCase`) depende apenas de **abstrações** (`PaymentGateway`, `PaymentRepository`, `EventPublisher`).

As **implementações concretas** (`StripeGateway`, `PaypalGateway`, `InMemoryPaymentRepository`, `ConsoleEventPublisher`) são detalhes que podem ser trocados sem afetar a lógica de negócio.

## Benefícios do DIP

- **Flexibilidade**: módulos de baixo nível podem ser alterados ou substituídos sem impactar o de alto nível.
- **Testabilidade**: facilita a criação de mocks e stubs pra testes unitários.
- **Manutenção**: reduz o acoplamento entre módulos, facilitando a manutenção e evolução do sistema.
- **Clareza**: deixa claro quais são as responsabilidades de cada módulo e como eles interagem por meio de abstrações.

## Conclusão

**Módulos de alto nível** carregam as regras de negócio e as decisões que definem o sistema.

**Módulos de baixo nível** lidam com detalhes que mudam com o tempo: infraestrutura, frameworks, integrações e ferramentas.

O **DIP** existe pra garantir que essas mudanças não contaminem o core da aplicação.
