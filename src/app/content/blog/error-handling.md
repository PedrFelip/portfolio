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

Como você já viu o clássico retorno do tipo `error` com o `if err != nil`, o tipo `error` é, na verdade, um tipo de interface. Uma variável `error` representa qualquer valor que consegue descrever a si mesmo como uma string.

```go
type error interface {
    Error() string
}
```

Isso significa que qualquer tipo que implemente o método `Error() string` satisfaz essa interface e pode ser usado como um `error`. Vamos criar um erro personalizado para representar a falta de estoque, um cenário de negócio comum:Pfs218181

```go
type ErrOutOfStock struct {
    ProductID string
    Available int
}

// ErrOutOfStock implementa a interface error
func (e *ErrOutOfStock) Error() string {
    return fmt.Sprintf("produto %s sem estoque suficiente (disponível: %d)", e.ProductID, e.Available)
}
```

Assim, ao retornar um `*ErrOutOfStock`, ele pode ser tratado como um `error` padrão, mas carrega informações adicionais sobre o que aconteceu:

```go
func (s *Service) Reserve(productID string, quantity int) error {
    available, err := s.repo.GetStock(productID)
    if err != nil {
        return fmt.Errorf("consultando estoque do produto %s: %w", productID, err)
    }

    if available < quantity {
        // aqui retornamos um erro personalizado, com contexto
        return &ErrOutOfStock{ProductID: productID, Available: available}
    }

    return s.repo.Decrement(productID, quantity)
}
```

E, no chamador, conseguimos verificar o tipo específico do erro para tomar decisões diferentes, como veremos mais adiante com `errors.As` e `errors.Is`:

```go
err := service.Reserve("sku-123", 5)
if err != nil {
    var outOfStock *ErrOutOfStock
    if errors.As(err, &outOfStock) {
        fmt.Printf("estoque insuficiente: apenas %d unidades disponíveis\n", outOfStock.Available)
        return
    }

    fmt.Println("erro inesperado:", err)
    return
}
```

## Error.New()

A forma mais simples de criar um erro é usando a função `errors.New` do pacote `errors` padrão:

```go
import "errors"

func SomeFunction() error {
    return errors.New("algum erro")
}
```

Ele basicamente cria um valor que implementa a interface `Error()`, recebe uma string e retorna um tipo `error`. Pode ser usado de maneira simples retornando o valor diretamente mas tambem é comum declarar um erro a nivel de pacote nos erros sentinela.

> Use `errors.New` quando a mensagem do erro é fixa e você não precisa incorporar dados naquele momento.

```go
var ErrNotFound = errors.New("não encontrado")
// ou
var (
	ErrNotFound = errors.New("não encontrado")
	ErrNoRows = errors.New("nenhuma linha encontrada")
	ErrInvalidInput = errors.New("entrada inválida")
)

func validateAge(age int) error {
	if age < 18 {
		return errors.New("idade mínima é 18 anos")
	}

	return nil
}
```

## fmt.errorf

Aqui falando a definição do o que o `fmt.Errorf` faz e como usá-lo. Você pode até pensar que ele é o oposto do `errors.New`, por que diferente do `errors.New`, o `fmt.Errorf` permite formatar a mensagem do erro com valores de variáveis. dando contexto ao erro.

> Use `fmt.Errorf` quando a mensagem do erro é dinâmica e você precisa incorporar dados na mensagem.

```go
func validateAge(age int) error {
	if age < 18 {
		return fmt.Errorf("idade %d é menor que a idade mínima", age)
	}

	return nil
}
```

Até agora de fato o oposto do `errors.New`.

## Error Wrapping

Até agora usamos fmt.Errorf apenas para criar mensagens de erro dinâmicas. Porém, um dos usos mais importantes do fmt.Errorf é adicionar contexto a um erro existente sem perder o erro original. Esse mecanismo é chamado de error wrapping.

![Error Wrapping](/images/posts/error-handling/error-wrapping.png)

O problema é que, conforme o erro sobe pelas camadas da aplicação, fica difícil descobrir em qual operação ele aconteceu. A parte importante aqui é o %w.

```go
fmt.Errorf("buscando usuário %s: %w", id, err)
```

> Imagine que tem uma função `FindByID`

```go
var ErrUserNotFound = errors.New("user not found")

func (r *Repository) FindByID(id string) (*User, error) {
	user, err := r.db.FindUser(id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, fmt.Errorf("buscando usuário %s: %w", id, ErrUserNotFound)
		}
		return nil, fmt.Errorf("", id, err)
	}
	return user, nil
}
```

> a camada de cima pode simplesmente retornar o erro, sem contexto nenhum

```go
func (s *Service) UpdateUser(id string, name string) error {
	user, err := s.repo.FindByID(id)
	if err != nil {
		return err
	}
	user.Name = name
	return s.repo.Update(user)
}
```

O problema dessa abordagem é que, se essa função for chamada em vários lugares do sistema, você não tem como saber, só olhando o erro, qual `id` estava sendo buscado quando a falha ocorreu. Em vez de simplesmente repassar o erro, a camada de cima pode agregar contexto útil, como o `id` que estava sendo processado:

```go
func (s *Service) UpdateUser(id string, name string) error {
	user, err := s.repo.FindByID(id)
	if err != nil {
		return fmt.Errorf("updating user %s: %w", id, err)
	}
	user.Name = name
	return s.repo.Update(user)
}
```

O `%w` faz o wrapping do erro. Em vez de simplesmente transformar o erro original em parte de uma string (o que aconteceria se usássemos `%v` ou `%s`), o novo erro mantém uma referência ao erro anterior, formando uma cadeia.

Podemos imaginar essa cadeia da seguinte forma:

```
"updating user 42: user not found"
							↓ (wraps)
ErrUserNotFound
```

Ao imprimir o erro:

```go
fmt.Println(err)
```

teríamos a mensagem completa, com o contexto adicionado por cada camada:

> updating user 42: user not found

Mas o mais importante não é a mensagem. O ErrNotFound continua existindo dentro da cadeia de erros.

## Error.Is

Já apareceu aqui nos exemplos algumas vezes, o `error.Is` que permite verificar se um erro corresponde a outro, mesmo que esteja dentro de uma cadeia de erros (error wrapping).

```go
func Is(err, target error) bool
```

recebe dois argumentos:

- `err`: o erro a ser verificado.
- `target`: o erro alvo a ser comparado.
  Retorna true caso encontre uma correspondência; caso contrário, retorna false.

Para o exemplo podemos voltar ao exemplo anterior, so que finalmente na ultima camada, o Handler que precisa receber o erro e precisa decidir qual resposta enviar ao cliente.

```go
func (h *Handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	name := r.FormValue("name")

	err := h.service.UpdateUser(id, name)

	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			http.Error(
				w,
				"user not found",
				http.StatusNotFound,
			)
			return
		}
	}

	w.WriteHeader(http.StatusNoContent)
}
```

O errors.Is percorre a cadeia de erros até encontrar o erro procurado. Outro detalhe que o .Is não compara as mensagens de erro

```go
err1 := errors.New("user not found")
err2 := errors.New("user not found")

fmt.Println(errors.Is(err1, err2))
// false
```

## Error.As

Enquanto o `errors.Is` verifica se um erro corresponde a um valor específico dentro da cadeia, o `errors.As` serve para verificar se algum erro na cadeia corresponde a um determinado _tipo_, permitindo extrair esse erro para uma variável e acessar seus campos e métodos específicos.

```go
func As(err error, target any) bool
```

recebe dois argumentos:

- `err`: o erro a ser verificado.
- `target`: um ponteiro para uma variável do tipo de erro que você espera encontrar.
  Retorna `true` caso encontre uma correspondência na cadeia e, nesse caso, atribui o erro encontrado à variável apontada por `target`. Caso contrário, retorna `false`.

Voltando ao exemplo do `ErrOutOfStock` que vimos anteriormente, ele carrega informações adicionais (`ProductID` e `Available`) que não fazem parte de um simples `errors.New`. Para acessar esses campos, precisamos usar `errors.As`:

```go
type ErrOutOfStock struct {
    ProductID string
    Available int
}

func (e *ErrOutOfStock) Error() string {
    return fmt.Sprintf("produto %s sem estoque suficiente (disponível: %d)", e.ProductID, e.Available)
}
```

No chamador, declaramos uma variável do tipo do erro que queremos identificar (nesse caso, um ponteiro para `ErrOutOfStock`) e passamos o endereço dela para o `errors.As`:

```go
err := service.Reserve("sku-123", 5)
if err != nil {
    var outOfStock *ErrOutOfStock

    if errors.As(err, &outOfStock) {
        // aqui já temos acesso aos campos específicos do erro
        fmt.Printf("estoque insuficiente: apenas %d unidades disponíveis\n", outOfStock.Available)
        return
    }

    fmt.Println("erro inesperado:", err)
    return
}
```

Assim como o `errors.Is`, o `errors.As` também percorre toda a cadeia de erros criada pelo wrapping com `%w`, até encontrar um erro cujo tipo seja compatível com o `target`. Isso significa que, mesmo que o `ErrOutOfStock` tenha sido envolvido por vários `fmt.Errorf` ao longo das camadas da aplicação, ainda é possível recuperá-lo com `errors.As`.

## Boas Práticas

- Para erros armazenados em variáveis globais, Use prefixo `Err` ou `err` (ex: `errOutOfStock`)
- Para erros personalizados, Use o sufix `Error` (ex: `ErrorReserve`)
- Lide com os Erros Apenas uma Vez

## Conclusão

Tratar erros em Go não é apenas uma questão de sintaxe, mas de filosofia. Diferente de linguagens que escondem falhas atrás de exceções, Go força o desenvolvedor a encarar os erros como parte natural do fluxo da aplicação, tornando explícito o que pode dar errado e como isso deve ser tratado.

Ao longo deste post, vimos que:

- Erros podem (e devem) ser classificados entre erros de domínio e erros de infraestrutura, cada um exigindo uma abordagem diferente.
- `errors.New` e `fmt.Errorf` são ferramentas simples, mas poderosas, para criar e contextualizar erros.
- O _error wrapping_ com `%w` permite construir uma cadeia de erros que preserva o contexto sem perder a causa raiz.
- `errors.Is` e `errors.As` são as ferramentas certas para inspecionar essa cadeia, seja para comparar valores sentinela ou para extrair tipos específicos de erro.
- Boas práticas de nomenclatura e responsabilidade ajudam a manter o tratamento de erros consistente e previsível em toda a base de código.

No fim das contas, o famoso `if err != nil` não é um obstáculo, é um convite para você lidar com as falhas de forma consciente, no momento certo, com o contexto certo. Dominar esse padrão é um dos passos mais importantes para escrever um código Go verdadeiramente idiomático.
