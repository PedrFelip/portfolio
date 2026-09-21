---
title: Tratamento de erros em Go
description: Filosofia do Go em relação ao tratamento de erros
date: "2026-09-20"
categories:
  - Go
  - Boas Práticas
  - Error Handling
published: true
---

## Introdução

Quando dizem que Go é uma linguagem idiomática, querem dizer que ela busca ser **simples, confiável e fácil de usar**. Um código escrito em Java ou C++ dificilmente produzirá o mesmo resultado quando apenas traduzido para Go.

Para escrever um bom código em Go, é preciso entender o idioma e suas propriedades. Também é importante conhecer suas convenções de nomeação, formatação e estrutura, para manter o código legível.

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

Isso já é uma das coisas que chama a atenção: **a ausência de exceções como o mecanismo de tratamento de erros**. Enquanto em linguagens como Java e JavaScript utilizam `try-catch`, Go trata erros de forma explícita.

O Padrão do Go:

```go
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

É verboso e repetitivo. Mas vamos entender melhor por que esse padrão existe.

## O que é um erro?

Um erro é qualquer situação que **impede uma operação de terminar como esperado**, mas da qual a aplicação ainda consegue se recuperar ou informar o chamador com clareza.

Isso inclui validações, regras de negócio, falhas de rede, problemas de infraestrutura e outros cenários esperados. Em outras palavras, **falhas fazem parte do domínio da aplicação**.

Um exemplo clássico: falta de estoque. Isso não é uma exceção inesperada, é uma situação normal de negócio que deve ser tratada de forma explícita e controlada.

```go
var ErrNotFound = errors.New("usuário não encontrado")
```

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

### Erros de domínio (regras de negócio)

Representam violações das regras do sistema. **A aplicação funciona perfeitamente, mas a operação é inválida.**

Exemplos:

- Tentativa de saque em conta com saldo insuficiente.
- Cadastro com e-mail já existente no banco de dados.
- Cupom de desconto expirado.
- Pedido em um status que não permite cancelamento.
- Tentativa de acessar um recurso de outro usuário.

### Erros de infraestrutura e I/O (ambiente externo)

Falhas em componentes **fora do controle direto da sua lógica de código** (rede, disco, serviços de terceiros).

Exemplos:

- Perda temporária de conexão com o PostgreSQL.
- Timeout ao chamar uma API externa (ex: gateway de pagamento).
- Arquivo de configuração ausente ou sem permissão de leitura.
- Redis ou fila de mensagens indisponível.
- Disco cheio ao tentar salvar um arquivo.

Erros fazem parte do fluxo normal da aplicação, por isso precisam ser tratados de forma explícita.

## Retornando erros

Como você já viu no retorno com `if err != nil`, o tipo `error` é, na verdade, **uma interface**. Qualquer tipo que implemente `Error() string` pode ser usado como um `error`.

Conceitualmente, essa interface pode ser representada assim:

```go
type error interface {
  Error() string
}
```

Qualquer tipo que implemente o método `Error() string` satisfaz essa interface e pode ser usado como um `error`. Vamos criar um erro personalizado para representar a falta de estoque, um cenário comum de negócio:

```go
type OutOfStockError struct {
  ProductID string
  Available int
}

// OutOfStockError implementa a interface error
func (e *OutOfStockError) Error() string {
  return fmt.Sprintf("produto %s sem estoque suficiente (disponível: %d)", e.ProductID, e.Available)
}
```

Assim, ao retornar um `*OutOfStockError`, ele pode ser tratado como um `error` padrão, mas carrega informações adicionais sobre o que aconteceu:

```go
func (s *Service) Reserve(productID string, quantity int) error {
  available, err := s.repo.GetStock(productID)
  if err != nil {
    return fmt.Errorf("consultando estoque do produto %s: %w", productID, err)
  }

  if available < quantity {
    // aqui retornamos um erro personalizado, com contexto
    return &OutOfStockError{ProductID: productID, Available: available}
  }

  return s.repo.Decrement(productID, quantity)
}
```

E, no chamador, conseguimos verificar o tipo específico do erro para tomar decisões diferentes, como veremos mais adiante com `errors.As` e `errors.Is`:

```go
err := service.Reserve("sku-123", 5)
if err != nil {
    var outOfStock *OutOfStockError
  if errors.As(err, &outOfStock) {
    fmt.Printf("estoque insuficiente: apenas %d unidades disponíveis\n", outOfStock.Available)
    return
  }

  fmt.Println("erro inesperado:", err)
  return
}
```

## errors.New()

A forma mais simples de criar um erro é usando a função `errors.New`, do pacote padrão `errors`:

```go
import "errors"

func SomeFunction() error {
  return errors.New("algum erro")
}
```

Ela cria um valor que implementa a interface `error`, recebe uma string e retorna um erro. Pode ser usada diretamente, mas também é comum declarar erros sentinela no nível do pacote.

> **Use `errors.New` quando a mensagem do erro é fixa e você não precisa incorporar dados naquele momento.**

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

## fmt.Errorf

O `fmt.Errorf` permite formatar a mensagem do erro com valores de variáveis. Por isso, pode ser usado quando a mensagem precisa trazer contexto dinâmico.

> **Use `fmt.Errorf` quando a mensagem do erro é dinâmica e você precisa incorporar dados na mensagem.**

```go
func validateAge(age int) error {
  if age < 18 {
    return fmt.Errorf("idade %d é menor que a idade mínima", age)
  }

  return nil
}
```

Até aqui, ele parece o oposto do `errors.New`.

## Error wrapping

Até agora usamos `fmt.Errorf` apenas para criar mensagens dinâmicas. Porém, um dos usos mais importantes é **adicionar contexto a um erro existente sem perder o erro original**. Esse mecanismo é chamado de error wrapping.

![Error Wrapping](/images/posts/error-handling/error-wrapping.webp)

Conforme o erro sobe pelas camadas da aplicação, fica difícil descobrir em qual operação ele aconteceu. A parte importante aqui é o `%w`.

```go
fmt.Errorf("buscando usuário %s: %w", id, err)
```

> Imagine que existe uma função `FindByID`.

```go
var ErrUserNotFound = errors.New("user not found")

func (r *Repository) FindByID(id string) (*User, error) {
  user, err := r.db.FindUser(id)
  if err != nil {
    if errors.Is(err, sql.ErrNoRows) {
      return nil, fmt.Errorf("buscando usuário %s: %w", id, ErrUserNotFound)
    }
    return nil, fmt.Errorf("buscando usuário %s: %w", id, err)
  }
  return user, nil
}
```

> A camada de cima pode simplesmente retornar o erro, sem contexto nenhum.

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

Se essa função for chamada em vários lugares, não dá para saber, apenas olhando o erro, qual `id` estava sendo buscado. Em vez de repassá-lo, a camada de cima pode adicionar contexto útil:

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

O `%w` faz o wrapping do erro. Diferente de `%v` ou `%s`, **ele mantém uma referência ao erro original e forma uma cadeia**.

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

Mas o mais importante não é a mensagem. **O `ErrUserNotFound` continua existindo dentro da cadeia de erros.**

## errors.Is

O `errors.Is` permite verificar **se um erro corresponde a outro**, mesmo quando está dentro de uma cadeia criada por error wrapping.

```go
func Is(err, target error) bool
```

Ele recebe dois argumentos:

- `err`: o erro a ser verificado.
- `target`: o erro alvo a ser comparado.

Retorna `true` caso encontre uma correspondência; caso contrário, retorna `false`.

Voltando ao exemplo anterior, chegamos à última camada: o handler, que recebe o erro e decide qual resposta enviar ao cliente.

```go
func (h *Handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
  id := r.URL.Query().Get("id")
  name := r.FormValue("name")

  err := h.service.UpdateUser(id, name)

  if err != nil {
    if errors.Is(err, ErrUserNotFound) {
      http.Error(w, "user not found", http.StatusNotFound)
      return
    }

    http.Error(w, "internal server error", http.StatusInternalServerError)
    return
  }

  w.WriteHeader(http.StatusNoContent)
}
```

O `errors.Is` percorre a cadeia até encontrar o erro procurado. Outro detalhe é que **ele não compara mensagens de erro**:

```go
err1 := errors.New("user not found")
err2 := errors.New("user not found")

fmt.Println(errors.Is(err1, err2))
// false
```

## errors.As

Enquanto o `errors.Is` verifica um valor específico, **o `errors.As` procura um tipo na cadeia**. Assim, ele permite extrair o erro e acessar seus campos e métodos.

```go
func As(err error, target any) bool
```

Ele recebe dois argumentos:

- `err`: o erro a ser verificado.
- `target`: um ponteiro para uma variável do tipo de erro que você espera encontrar.

Retorna `true` caso encontre uma correspondência na cadeia. Nesse caso, atribui o erro encontrado à variável apontada por `target`; caso contrário, retorna `false`.

O `OutOfStockError` carrega informações adicionais (`ProductID` e `Available`) que não existem em um erro simples criado com `errors.New`. Para acessar esses campos, usamos `errors.As`:

```go
type OutOfStockError struct {
  ProductID string
  Available int
}

func (e *OutOfStockError) Error() string {
  return fmt.Sprintf("produto %s sem estoque suficiente (disponível: %d)", e.ProductID, e.Available)
}
```

No chamador, declaramos uma variável do tipo do erro que queremos identificar (nesse caso, um ponteiro para `OutOfStockError`) e passamos o endereço dela para o `errors.As`:

```go
err := service.Reserve("sku-123", 5)
if err != nil {
  var outOfStock *OutOfStockError

  if errors.As(err, &outOfStock) {
    // aqui já temos acesso aos campos específicos do erro
    fmt.Printf("estoque insuficiente: apenas %d unidades disponíveis\n", outOfStock.Available)
    return
  }

  fmt.Println("erro inesperado:", err)
  return
}
```

Assim como o `errors.Is`, o `errors.As` percorre a cadeia criada pelo `%w` até encontrar um tipo compatível com o `target`. Mesmo envolvido por várias camadas, **o `OutOfStockError` continua recuperável**:

```go
func (s *Service) ReserveWithContext(productID string, quantity int) error {
  err := s.Reserve(productID, quantity)
  if err != nil {
    return fmt.Errorf("reservando produto %s: %w", productID, err)
  }

  return nil
}

err := service.ReserveWithContext("sku-123", 5)
if err != nil {
  var outOfStock *OutOfStockError
  if errors.As(err, &outOfStock) {
    fmt.Printf("estoque insuficiente: apenas %d unidades disponíveis\n", outOfStock.Available)
  }
}
```

## E quanto ao panic e recover?

Embora Go não utilize exceções como mecanismo convencional de tratamento de erros, a linguagem possui panic e recover.

O panic interrompe o fluxo normal de execução da goroutine, enquanto o recover permite recuperar o controle em determinadas condições.

Entretanto, **esses mecanismos não substituem o uso de error**. Em Go, falhas esperadas devem ser tratadas explicitamente, enquanto panic é geralmente reservado para situações excepcionais.

> O funcionamento de panic, recover e defer merece uma discussão própria e será abordado em outro artigo.

## Boas práticas

- Para erros armazenados em variáveis globais, use o prefixo `Err` (ex.: `ErrNotFound`).
- Para tipos de erro personalizados, use o sufixo `Error` (ex.: `OutOfStockError`).
- **Lide com cada erro apenas uma vez.**

## Conclusão

Tratar erros em Go não é apenas uma questão de sintaxe, mas de **filosofia**. Diferente de linguagens que escondem falhas atrás de exceções, Go força o desenvolvedor a encarar os erros como parte natural do fluxo.

Isso torna explícito o que pode dar errado e como cada situação deve ser tratada.

Ao longo deste post, vimos que:

- Erros podem ser classificados entre **erros de domínio** e **erros de infraestrutura**, cada um exigindo uma abordagem diferente.
- `errors.New` e `fmt.Errorf` são ferramentas simples, mas poderosas, para criar e contextualizar erros.
- O _error wrapping_ com `%w` permite construir uma cadeia de erros que preserva o contexto sem perder a causa raiz.
- `errors.Is` e `errors.As` são as ferramentas certas para inspecionar essa cadeia, seja para comparar valores sentinela ou para extrair tipos específicos de erro.
- Boas práticas de nomenclatura e responsabilidade ajudam a manter o tratamento de erros consistente e previsível em toda a base de código.

No fim das contas, o famoso `if err != nil` não é um obstáculo, **é um convite para você lidar com as falhas de forma consciente**, no momento certo, com o contexto certo. Dominar esse padrão é um dos passos mais importantes para escrever um código Go verdadeiramente idiomático.
