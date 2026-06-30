---
title: Go Structs - Otimizando memória e performance no backend.
description: Structs em Go são fundamentais para organizar dados, otimizar memória e melhorar performance. Entenda como usá-los eficientemente.
date: "2026-05-07"
categories:
  - Go
published: true
---

Antes de falarmos sobre o tema central desse post — **memória** e **performance** — é importante entender o que são as **structs** em **Go**. Nisso, falo sobre o que são, como funcionam e pra que servem.

## Introdução e Sintaxe das Structs em Go

Antes da sintaxe, é importante entender o que são as **structs** em **Go**. **Structs** são **tipos de dados compostos** definidos pelo usuário, que permitem agrupar campos relacionados em uma única estrutura.

Elas são usadas pra representar entidades com múltiplos atributos.

> Por exemplo: pra representar um usuário, podemos criar uma **struct** `User` com campos como `Name`, `Age` e `Email`.

```go title="user.go"
type User struct {
  Name  string
  Age   int
  Email string
}
```

E assim, podemos usar essa **struct** pra criar instâncias de usuários:

```go
user1 := User{Name: "Pedro", Age: 20, Email: "pedro@example.com"}

fmt.Println(user1.Name) // Output: Pedro
```

Por padrão, as **structs** em **Go** são **valores**. Isso significa que, quando você atribui uma **struct** a uma nova variável ou a passa pra uma função, uma **cópia** da **struct** é criada.

Isso pode levar a problemas de **performance** e **uso de memória**, especialmente se a **struct** for grande.

```go
func main() {
  user1 := User{Name: "Pedro", Age: 20, Email: "pedro@example.com"}
  user2 := user1 // Cria uma cópia de user1
  user2.Name = "João" // Modifica o nome em user2

  fmt.Println(user1.Name) // Output: Pedro
  fmt.Println(user2.Name) // Output: João
  // user1 permanece inalterado, pois user2 é uma cópia
}
```

Agora, em uma função, o mesmo acontece:

```go
func updateUser(user User) {
  user.Name = "João" // Modifica o nome
}

func main() {
  user1 := User{Name: "Pedro", Age: 20, Email: "pedro@example.com"}
  updateUser(user1)

  fmt.Println(user1.Name) // Output: Pedro
}
```

Ok, mas e se quisermos modificar o usuário dentro da função? Pra isso, precisamos usar **ponteiros pra structs**, o que nos permite passar a **referência** da **struct** em vez de criar uma **cópia**.

```go
func updateUser(user *User) {
  user.Name = "João" // Modifica o nome
}

func main() {
  user1 := User{Name: "Pedro", Age: 20, Email: "pedro@example.com"}
  updateUser(&user1) // Passa a referência de user1

  fmt.Println(user1.Name) // Output: João
}
```

> Isso é uma prática mais idiomática em **Go**, pois evita a criação de **cópias desnecessárias** e permite modificar a **struct** original dentro da função.

Sobre o uso dos **ponteiros**, é importante lembrar que eles permitem modificar a **struct** original. Mas também exigem cuidado pra evitar problemas como **ponteiros nulos** ou **concorrência** (assunto pra outro momento).

Pra o assunto de **structs**, o uso de **ponteiros** serve pra modificar a **struct** original e evitar **cópias desnecessárias**.

Sobre a importação de **structs**, em **Go** não importamos **structs** diretamente — importamos pacotes. Pra acessar uma **struct** de outro pacote, ela precisa ser **exportada** (ou seja, começar com letra maiúscula).

Caso contrário, ela só pode ser usada dentro do próprio pacote.

- `user` -> **privada** (só pode ser usada dentro do pacote onde foi definida)
- `User` -> **pública** (pode ser usada em outros pacotes)

```go
package main

import (
  "fmt"
  "github.com/pedrfelip/meupacote" // Supondo que meupacote tenha uma struct exportada chamada User
)

// Exemplo de struct não exportada (privada ao pacote)
type config struct {
  Port int
}

func main() {
  // Conseguimos acessar a struct User do pacote meupacote porque ela é exportada (começa com letra maiúscula)
  user := meupacote.User{Name: "Pedro", Age: 20}

  fmt.Println(user.Name) // Output: Pedro
}
```

## Modelo de Memória em Go

Agora vamos aprofundar um pouco mais na **memória**. Como **Go** gerencia a **memória** e como as **structs** se encaixam nesse modelo?

A **gestão de memória** em **Go** não é manual como em linguagens como **C** ou **C++** (`malloc`/`free`). Ele usa um algoritmo que analisa estaticamente o fluxo de como vai ser alocado na **memória**.

Isso ocorre em tempo de compilação: o compilador decide se a variável é mantida em **Stack** ou se "escapa" pra **Heap**.

### Mas como assim "escapa"?

O **Escape Analysis** é uma fase do compilador que determina se uma variável pode ser mantida na **Stack** ou se ela deve "escapar" pra **Heap**.

Refere-se a uma variável que foge do escopo da função onde foi criada. Vamos ao exemplo:

```go
package main

import "fmt"

func main() {
  x := 10
  y := square(&x)
  fmt.Println(*y)
}

func square(x *int) *int {
  z := (*x) * (*x)
  return &z
}
```

> Nesse exemplo, a variável `z` é criada dentro da função `square`, mas como estamos retornando um **ponteiro** pra `z`, ela "escapa" pra **Heap**. O compilador reconhece isso e aloca `z` na **Heap** em vez da **Stack**.

Vamos ver pelo compilador com o mesmo exemplo via a flag `-gcflags="-m"`:

```bash
❯ go build -gcflags "-m" main.go
# command-line-arguments
./main.go:11:6: can inline square
./main.go:7:13: inlining call to square
./main.go:8:13: inlining call to fmt.Println
./main.go:8:13: ... argument does not escape
./main.go:8:14: *y escapes to heap
./main.go:11:13: x does not escape
./main.go:12:2: moved to heap: z
```

Pra isso ficar ainda melhor, vamos ver como o pacote interno [`cmd/compile/internal/escape`](https://github.com/golang/go/tree/master/src/cmd/compile/internal/escape) funciona por baixo dos panos.

### Como o compilador constrói o grafo de escape

O **Escape Analysis** constrói um **grafo direcionado ponderado**: cada nó é uma variável (chamado de `location`), cada aresta é uma atribuição, e o peso diz quantas desreferências líquidas existem nesse fluxo.

```go
type location struct {
  n         ir.Node  // represented variable or expression, if any
  curfn     *ir.Func // enclosing function
  edges     []edge   // incoming edges
  loopDepth int      // loopDepth at declaration

  // derefs and walkgen are used during walkOne to track the
  // minimal dereferences from the walk root.
  derefs  int // >= -1
}
```

#### Os pesos (`derefs`)

Cada aresta tem um peso chamado `derefs`, que representa o número de desreferências menos endereçamentos:

```go
p = &q    // derefs = -1  (endereçamento)
p = q     // derefs =  0  (atribuição direta)
p = *q    // derefs =  1  (uma desreferência)
p = **q   // derefs =  2  (duas desreferências)
```

O mínimo é -1, porque `&x` não é endereçável, então `&&x` não existe em **Go**.

### Como evitar o escape pra Heap

**Value Semantics**: quando retornamos um valor, ele é copiado pra **stack frame** da função chamadora.

- **Foge pra Heap**: `func New() *User` (o objeto precisa sobreviver à função).
- **Fica na Stack**: `func New() User` (o objeto é copiado).

> Essa é a maneira mais simples de evitar o escape. Vou deixar só essa aqui, mas tem outras formas de evitar. O importante é entender o conceito. Pode ser conteúdo pra outro post, até porque o foco aqui é sobre **structs**.

## Memória Física

Beleza, o **Escape Analysis** decidiu que uma variável deve ser alocada na **Heap**. Mas, até aí, o compilador só deixou a "tag" — é aí que entra o **runtime**.

O **Go** não usa um sistema de gerenciamento de memória tradicional como o `malloc` do **C**. Em vez disso, ele implementa um alocador baseado em **TCMalloc** (**Thread-Caching Malloc**).

> O **TCMalloc** é um alocador de memória desenvolvido pelo **Google**, projetado pra alta concorrência. Ele funciona criando pequenos caches locais pra cada thread (no **Go**, pra cada processador lógico **P**). Isso permite que a maioria das alocações ocorra sem a necessidade de travas (**locks**), eliminando o gargalo que surge quando múltiplas partes de um programa tentam pedir memória ao mesmo tempo.

![O TCMalloc](/images/posts/structs/tcmalloc_internals.png)

### 1. mcache: O Cache Local

Cada processador lógico possui um `mcache`. Quando uma **struct** escapa pra **Heap**, o **Go** tenta alocar aqui.

- Isso gera um custo de **trava zero**: como o cache é exclusivo daquele processador, não há concorrência com outras threads. É tão rápido quanto alocar na **Stack**.

### 2. mspan e as Size Classes

O **Go** gerencia a memória da **Heap** em unidades chamadas **páginas** (geralmente de 8KB). O `mspan` é uma estrutura de dados que gerencia uma ou mais dessas páginas consecutivas.

O papel do `mspan` é segmentar essas páginas de 8KB em pequenos "slots" de tamanho fixo. Quando você aloca uma **struct**, ela é injetada em um desses slots.

Pra que isso seja eficiente, o **Go** utiliza as **Size Classes**:

- O **runtime** possui 67 classes de tamanho pré-definidas.
- Cada `mspan` é dedicado a apenas uma dessas classes. Ou seja: um **span** de "Classe 3" só conterá objetos de 32 bytes.
- Isso evita a **fragmentação externa** (buracos de tamanhos variados na memória), pois todos os slots em um **span** são idênticos.

#### O Problema da Fragmentação Interna

Aqui é onde o design da sua **struct** começa a cobrar o preço. O **Go** sempre aloca na "caixa" que melhor cabe o dado, arredondando pra cima.

Se sua **struct** não preenche o slot completamente, o espaço restante é desperdiçado.

Ou seja: se você tem uma **struct** de 24 bytes, ela será alocada em um slot de 32 bytes (**Classe 3**), e os 8 bytes restantes serão desperdiçados. Isso é conhecido como **fragmentação interna**.

Agora a pergunta de um milhão de dólares: o que define se minha **struct** terá 16 ou 17 bytes?

## Memory Alignment e Padding

Você deve estar pensando: "Se eu tenho um `int8` (1 byte) e um `int64` (8 bytes), minha **struct** tem 9 bytes, certo?".

Errado. Na verdade, a **struct** terá 16 bytes.

Isso acontece porque a **CPU** não lê a memória byte a byte. Ela lê em blocos chamados **words** (geralmente de 8 bytes).

Pra que a leitura seja eficiente, o compilador do **Go** alinha os dados em endereços de memória que sejam múltiplos do seu próprio tamanho.

Se um dado não "encaixa" perfeitamente na fronteira da **word**, o **Go** insere bytes vazios: o **padding**.

1. badStruct

```go title="main.go"
type badStruct struct {
  a bool  // 1 byte
  // [Padding] 7 bytes para alinhar o próximo campo de 8 bytes
  b int64 // 8 bytes
  c bool  // 1 byte
  // [Padding] 7 bytes para que a struct total seja múltipla de 8
}
// Total: 24 bytes
```

2. goodStruct

```go
type goodStruct struct {
  b int64 // 8 bytes
  a bool  // 1 byte
  c bool  // 1 byte
  // [Padding] 6 bytes no final
}
// Total: 16 bytes
```

O **Go** fornece o pacote `unsafe` pra você medir exatamente o tamanho das suas estruturas no terminal.

```go
package main

import (
  "fmt"
  "unsafe"
)

type badStruct struct {
  a bool // 1 byte
  // [Padding] 7 bytes pra alinhar o próximo campo de 8 bytes
  b int64 // 8 bytes
  c bool  // 1 byte
  // [Padding] 7 bytes pra que a struct total seja múltipla de 8
}

// Total: 24 bytes

type goodStruct struct {
  b int64 // 8 bytes
  a bool  // 1 byte
  c bool  // 1 byte
  // [Padding] 6 bytes no final
}

// Total: 16 bytes

func main() {
  fmt.Printf("Bad: %d bytes\n", unsafe.Sizeof(badStruct{}))
  fmt.Printf("Good: %d bytes\n", unsafe.Sizeof(goodStruct{}))
}
```

```bash
❯ go run main.go
Bad: 24 bytes
Good: 16 bytes
```

## Conclusão e Boas Práticas

Entender como as **structs** funcionam por baixo dos panos é bem legal e pode te ajudar a escrever código mais eficiente.

#### Legibilidade vs. Performance: O Equilíbrio

A regra de ouro de organizar campos do maior pro menor é poderosa, mas não deve ser uma lei absoluta.

- Se a **legibilidade** do código for prejudicada, pode ser melhor sacrificar um pouco de eficiência. Por exemplo: se você tem campos que são logicamente relacionados, pode ser mais claro agrupá-los juntos, mesmo que isso introduza algum **padding**.
- Foque em otimizar **structs** que serão instanciadas milhões de vezes ou que residem em caches críticos de memória.

> "**Premature optimization is the root of all evil**." - Donald Knuth.

#### Ferramentas pra Análise de Memória

Você não precisa calcular bytes manualmente. O ecossistema **Go** possui ferramentas que fazem isso por você:

- **fieldalignment**: esta ferramenta (parte do pacote `golang.org/x/tools`) analisa seu código e sugere a ordem exata dos campos pra reduzir o **padding**.
- **Linters**: muitos linters de **CI/CD** (como o `golangci-lint`) já possuem regras pra detectar **structs** ineficientes.

Tentei introduzir alguns assuntos de memória e até do **scheduler** do **Go**, mas o foco aqui era sobre as **structs**. Então deixei só o essencial pra entender como a memória funciona por baixo dos panos.

Se quiser, posso fazer um post só sobre o **scheduler** e o **runtime** do **Go** — tem muita coisa interessante lá.
