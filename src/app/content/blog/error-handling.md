---
title: Error Handling em Go
description: Filosofia do Go em relação ao tratamento de erros
date: "2026-08-12"
categories:
  - Go
  - Boas Práticas
  - Error Handling
published: true
---

## Introdução

Quando dizem que Go é uma linguagem de programação idiomática, querem dizer que a linguagem é focada em ser simples, confiável e fácil de usar. A própria linguagem afirma que um código escrito em Java ou C++ dificilmente produzirá um resultado satisfatório. Em outras palavras, para escrever um código bom em Go, tem que entender o idioma e suas propriedades. É importante entender suas convenções, como nomeação, formatação, estruturas de programas para que o código seja legível pra qualquer programador.

Alguns dos principais projetos que servem como referência:

- [Estrutura de Projetos Go](https://github.com/golang-standards/project-layout)
- [Go by Example](https://gobyexample.com/)
- [Uber Go Guide](https://github.com/uber-go/guide)

Documentação que eu citei anteriormente: [Código Efetivo em Go](https://go.dev/doc/effective_go)

> "A straightforward translation of a C++ or Java program into Go is unlikely to produce a satisfactory result—Java programs are written in Java, not Go."

Mas grande parte dessa fama vem do famoso e temido:

```go
if err != nil {
  return err
}
```

Isso já é uma das coisas que chama a atenção: a ausência de exceções como o mecanismo de tratamento de erros. Enquanto em linguagens como Java e JavaScript utilizam `try-catch`, Go trata erros de forma explícita.

O Padrão do Go:

```go title="math.go"
func Divide(a, b float64) (float64, error) {
  if b == 0 {
    return 0, errors.New("division by zero")
  }

  return a / b, nil
}
```

Uso:

```go
result, err := Divide(20, 0)

if err != nil {
  fmt.Println(err)
  return
}

fmt.Println(result)
```

Bem verboso e repetitivo. Mas vamos tentar entender melhor isso.

## O que é um erro?

Um erro é qualquer situação que impede uma operação de ser concluída como esperado, mas na qual a aplicação ainda consegue se recuperar ou informar o chamador com clareza sobre o que aconteceu. Isso inclui erros de validação, erros de negócio, falhas de rede, problemas de infraestrutura e outros cenários esperados. Em outras palavras: falhas fazem parte do domínio da aplicação.

Um exemplo clássico: falta de estoque. Isso não é uma exceção inesperada, é uma situação normal de negócio que deve ser tratada de forma explícita e controlada.

```go
func GetUser(id string) (*User, error) {
    user, err := db.Find(id)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, ErrNotFound   // ← erro de negócio, deve ser tratado
        }
        return nil, fmt.Errorf("buscando usuário %s: %w", id, err) // ← erro de infraestrutura, também deve ser tratado
    }
    return user, nil
}
```

### Erros de Domínio (Regra de Negócio)

Representam violações das regras do sistema. A aplicação funciona perfeitamente, mas a operação é inválida.

Exemplos:

- Tentativa de saque em conta com saldo insuficiente.
- Cadastro com e-mail já existente no banco de dados.
- Cupom de desconto expirado.
- Pedido em um status que não permite cancelamento
- Tentativa de acessar um recurso de outro usuário

### Erros de Infraestrutura e I/O (Ambiente Externo)

Falhas em componentes fora do controle direto da sua lógica de código (rede, disco, serviços de terceiros).

Exemplos:

- Perda temporária de conexão com o PostgreSQL.
- Timeout ao chamar uma API externa (ex: Gateway de Pagamento).
- Arquivo de configuração ausente ou sem permissão de leitura.
- Redis ou fila de mensagens indisponível
- Disco cheio ao tentar salvar um arquivo

Erros fazem parte do fluxo normal da aplicação.

## Retornando Erros

Como você já viu o classico retorno do tipo `error` com o `if err != nil`, O tipo `error` é um tipo de interface. Uma variável `error` representa qualquer valor que consegue descrever a si mesmo como uma string.

```go
type error interface {
    Error() string
}
```
