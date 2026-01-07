---
title: O que é Big-O?
description: Entenda a notação Big-O e sua importância na análise de algoritmos e estruturas de dados.
tldr:
  - Explica o que é complexidade de tempo e espaço e por que Big-O é independente de hardware.
  - Mostra as principais classes de complexidade com exemplos comentados.
  - Destaca a importância do Big-O para entrevistas e decisões de arquitetura.
date: '2025-11-22'
categories:
  - Algoritmos
  - Arquitetura de Software
  - Data Structures
published: true
---

## Introdução ao Big-O

Vamos começar com uma Introdução ao assunto pra ententer melhor o que é Big-O. Mas antes, vamos entender por que?
<br />

### O que é complexidade de algoritmos

Indo direto ao ponto, a **complexidade de um algoritmo** diz respeito a escalabilidade do algoritmo, ou seja, como esse algoritmo se comporta conforme aumentamos o tamanho da entrada de dados. <br />
Quando falamos de complexidade, estamos tentando responder:

> O quão bem (ou mal) esse algoritmo escala quando os dados crescem?

<br />

Então esquece que **não** é sobre velocidade ou tempo de execução.

<br />

é uma forma de analisar eficiência, **independente do hardware ou linguagem de programação.** Até porque faz a menor diferença um Bubble Sort e um Quick Sort quando estamos falando de 10 elementos apenas, mas quando falamos de **1 milhão de elementos**, a diferença é **gritante**.

<br />

### Por que não mede o tempo real?

Ao medir a performance de um algoritmo, tem como medir o **tempo real** e o **tempo assintótico**.

- **Tempo real**
  - Mede o tempo exato que um algoritmo para rodar de fato.
  - Medido milisegundos
  - Pode variar dependendo da CPU, cache, temperatura e outros fatores externos.

**Não é um parâmetro confiável.**

- **Tempo assintótico**
  - É a medida matemática do crescimento do número de operações
  - Focado no comportamento do algoritmo conforme o tamanho da entrada cresce
  - Ignora fatores externos como hardware e linguagem de programação

---

## Notação Big-O

Em definição é:

> A notação Big O é uma notação matemática que descreve o comportamento limitante de uma função quando o argumento tende a um valor específico ou ao infinito. Ela pertence a uma família de notações inventadas por Paul Bachmann, Edmund Landau e outros, coletivamente chamadas de notação Bachmann–Landau ou de notação assintótica

Ou como ja falamos, descreve a **complexidade**.

A notação Big-O mede duas coisas:

1. **Complexidade de Tempo:** Quantas operações o algoritmo realiza dependendo do tamanho da entrada.
2. **Complexidade de Espaço:** Quanta memória extra o algoritmo precisa para funcionar.

Não vou detalhar muito sobre **complexidade de espaço**, mas é bom saber que existe. A partir daqui vamos focar na **complexidade de tempo**. Mas como um exemplo sobre complexidade de espaço, o exemplo mais claro é copiar um array. Então se você receber um array de 10 elementos e cria uma copia dele, você está usando **O(n)** de espaço extra.
Portanto, a memória cresce proporcionalmente a n.

```ts
function copiarArray(lista: number[]) {
	const copia = [];
	for (let item of lista) {
		copia.push(item);
	}
	return copia;
}
```

**Complexidade espacial: O(n)**

Um detalhe importante que Big-O sempre leva em consideração o **pior caso**.

---

## Complexidades Mais Importantes

Agora nessa seção vamos detalhar as complexidades mais importantes e usadas em entrevistas técnicas.

### O(1) - Constante

**O(1)** significa que o número de operações necessárias para executar a tarefa não depende de n (o tamanho da entrada).

Por exemplo, uma operação constante pode ser a leitura de um valor em uma tabela hash, ou a leitura de um valor em um array.

```ts
const x = arr[10];
```

---

### O(n) — Linear

**O(n)** significa que o número de operações cresce proporcionalmente ao tamanho da entrada n. Se n dobra, o custo (assintoticamente) dobra.

**Percorrer e somar valores (array)**

```ts
function soma(arr: number[]): number {
	let total = 0;
	for (let i = 0; i < arr.length; i++) {
		total += arr[i];
	}
	return total;
}
```

> Cada elemento do array é somado uma vez, portanto, o número de operações é proporcional ao tamanho do array. Assim, a complexidade de tempo é O(n).

**Procurar um elemento (busca linear)**

```ts
function inclui(arr: number[], alvo: number) {
	for (let x of arr) {
		if (x === alvo) return true;
	}
	return false;
}
```

> No pior caso você olha todos os n elementos → **O(n)**. (Melhor caso **O(1)** se estiver no primeiro índice) mas big-o sempre leva em consideração o pior caso.

---

### O(n²) - Quadrática

"**O de n ao quadrado**" descreve o algoritmo que cujo o número de operações cresce proporcionalmente ao quadrado do tamanho da entrada.

> Quando você dobra o número de elementos, o número de operações quadruplica. Quando triplica, as operações crescem nove vezes.

Você sabe quando é **O(n²)** quando você vê dois loops aninhados.

```ts
for (let i = 0; i < n; i++) {
	for (let j = 0; j < n; j++) {
		// ...
	}
}
```

Exemplo de algoritmo **O(n²)**:

- Bubble Sort
- Selection Sort
- Insertion Sort

---

### O(log n) - Logarítmica

Essa com certeza é uma das mais importantes e usadas em entrevistas técnicas. E uma das mais legais de entender. <br />
Recomendação de livro fica para o Entendendo Algoritmos do Aditya Bhargava que tem otimos exemplos e bem ilustado.

O logaritmica cresce muito lentamente conforme n aumenta. <br />
Quando n dobra, o número de operações aumenta em uma quantidade constante.
Um exemplo clássico de algoritmo **O(log n)** é a busca binária. Se tem um array ordenado de 1.000.000 elementos, quantas interações você acha que vai precisar para encontrar um elemento?

log₂(1.000.000) ≈ 20

Só 20 passos no pior caso! <br />
Isso é absurdamente eficiente. Isso por que o Logaritmo cresce muito lentamente.

![Gráfico de complexidade de tempo comparando diferentes notações Big-O](/images/posts/big-o/time-complexity.jpg)

```ts
function buscaBinaria(arr: number[], alvo: number): number {
	let esquerda = 0;
	let direita = arr.length - 1;

	while (esquerda <= direita) {
		const meio = Math.floor((esquerda + direita) / 2);
		if (arr[meio] === alvo) {
			return meio;
		} else if (arr[meio] < alvo) {
			esquerda = meio + 1;
		} else {
			direita = meio - 1;
		}
	}
	return null;
}
```

> A cada iteração, o algoritmo reduz pela metade o número de elementos restantes a serem verificados. Portanto, o número de operações necessárias é proporcional ao logaritmo do tamanho do array.

---

## Conclusão

Notação Big-O cai muito em entrevistas técnicas, mas é um conceito fundamental para **qualquer desenvolvedor** que queira entender algoritmos e estruturas de dados.
Ficou simples o post por conta do assunto ser complexo, mas espero que tenha ajudado a clarear um pouco esse tema!
