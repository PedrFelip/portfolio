---
title: O que é Big-O?
description: Entenda notação Big-O e sua importância na análise de algoritmos e estruturas de dados.
date: '2025-11-22'
categories:
  - Algoritmos
  - Arquitetura de Software
  - Data Structures
published: true
---

## Introdução ao Big-O

**Complexidade de um algoritmo** diz respeito à escalabilidade — como o algoritmo se comporta conforme aumentamos o tamanho dos dados.

Quando falamos de complexidade, respondemos: **o quão bem (ou mal) esse algoritmo escala quando os dados crescem?**

> **Não é sobre velocidade ou tempo de execução** — é uma forma de analisar eficiência **independente de hardware ou linguagem**. A diferença entre Bubble Sort e Quick Sort é irrelevante com 10 elementos, mas **gritante com 1 milhão**.

### Por que não medir tempo real?

Existem dois tipos de medida: **tempo real** e **tempo assintótico**.

**Tempo real:**
- Mede o tempo exato de execução em milissegundos
- Varia conforme CPU, cache, temperatura e fatores externos
- **Não é confiável**

**Tempo assintótico:**
- Medida matemática do crescimento de operações
- Focado no comportamento conforme a entrada cresce
- Ignora fatores externos (hardware, linguagem)
- **É a métrica que importa**

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

> Lembre: Big-O sempre considera o **pior caso**.

## Principais Complexidades

Detalhando as complexidades mais importantes e cobradas em entrevistas técnicas.

### O(1) - Constante

**O(1)** significa operações que **não dependem** do tamanho de entrada `n`. Exemplos: leitura em hash table, acesso a array por índice.

```ts
const x = arr[10];
```

### O(n) - Linear

**O(n)** significa operações que crescem **proporcionalmente** ao tamanho `n`. Se `n` dobra, o custo dobra.

**Somar valores do array:**

```ts
function soma(arr: number[]): number {
	let total = 0;
	for (let i = 0; i < arr.length; i++) {
		total += arr[i];
	}
	return total;
}
```

> Cada elemento é visitado uma vez → O(n)

**Busca linear:**

```ts
function inclui(arr: number[], alvo: number) {
	for (let x of arr) {
		if (x === alvo) return true;
	}
	return false;
}
```

> Pior caso: percorre todos os `n` elementos → **O(n)**

### O(n²) - Quadrática

**O(n²)** descreve operações que crescem **ao quadrado**. Se `n` dobra, as operações quadruplicam. Típico de **loops aninhados**:

```ts
for (let i = 0; i < n; i++) {
	for (let j = 0; j < n; j++) {
		// ...
	}
}
```

**Exemplos:** Bubble Sort, Selection Sort, Insertion Sort.

### O(log n) - Logarítmica

**O(log n)** cresce **muito lentamente** conforme `n` aumenta. Exemplo clássico: a **busca binária** em um array de 1.000.000 de elementos precisa de apenas **~20 passos**!

```
log₂(1.000.000) ≈ 20
```

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

> A cada iteração, reduz pela metade os elementos restantes → operações ∝ log(n)

![Gráfico de complexidade de tempo comparando diferentes notações Big-O](/images/posts/big-o/time-complexity.jpg)

## Conclusão

Big-O é conceito **fundamental** pra qualquer dev que queira entender algoritmos, estruturas de dados e tomar decisões arquiteturais com consciência.

Cai o tempo todo em entrevistas técnicas e é essencial pra escrever código que escala bem de verdade.
