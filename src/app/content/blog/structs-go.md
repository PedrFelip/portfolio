---
title: Go Structs - Otimizando memória e performance no backend.
description: Structs em Go são fundamentais para organizar dados, otimizar memória e melhorar performance. Entenda como usá-los eficientemente.
date: "2026-04-29"
categories:
  - Go
published: true
---

Antes de falarmos sobre o tema central desse post que é sobre memória e performance, é importante entender o que são as structs em Go. Nisso falo sobre o que são, como funcionam e para que servem.

## Introdução e Sintaxe das Structs em Go

Antes de mostrar a sintaxe, é importante entender o que são as structs em Go. Structs em Go são tipos de dados compostos definidos pelo usuário que permitem agrupar campos relacionados em uma única estrutura. Elas são usadas para representar entidades com múltiplos atributos.

> Por exemplo, para representar um usuário, podemos criar uma struct `User` com campos como `Name`, `Age` e `Email`.

```go
type User struct {
    Name  string
    Age   int
    Email string
}
```

E assim, podemos usar essa struct para criar instâncias de usuários:

```go
user1 := User{Name: "Pedro", Age: 20, Email: "pedro@example.com"}

fmt.Println(user1.Name) // Output: Pedro
```

Por Padrão, as structs em Go são valores, o que significa que quando você atribui uma struct a uma nova variável ou a passa para uma função, uma cópia da struct é criada. Isso pode levar a problemas de performance e uso de memória, especialmente se a struct for grande.

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

Agora em uma função, o mesmo acontece:

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

Ok, mas e se quisermos modificar o usuário dentro da função? Para isso, precisamos usar ponteiros para structs, o que nos permite passar a referência da struct em vez de criar uma cópia.

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
> Isso é uma pratica mais idiomática em Go, pois evita a criação de cópias desnecessárias e permite modificar a struct original dentro da função.

Sobre o uso dos ponteiros, é importante lembrar que eles permitem modificar a struct original, mas também exigem cuidado para evitar problemas como Ponteiros nulos ou concorrência(assunto para outro momento). Mas para o assunto de structs, o uso de ponteiros é para modificar a struct original e evitar cópias desnecessárias.

Sobre a importação de structs, em Go não importamos structs diretamente, mas sim pacotes. Para acessar uma struct de outro pacote, ela precisa ser exportada (ou seja, começar com letra maiúscula). Caso contrário, ela só pode ser usada dentro do próprio pacote.

- `user` -> privada (ou seja, só pode ser usada dentro do pacote onde foi definida)
- `User` -> pública (ou seja, pode ser usada em outros pacotes)

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
    // Consiguimos acessar a struct User do pacote meupacote porque ela é exportada (começa com letra maiúscula)
    user := meupacote.User{Name: "Pedro", Age: 20}

    fmt.Println(user.Name) // Output: Pedro
}
```

## Modelo de Memória em Go

Agora vamos aprofundar um pouco mais na memória. 