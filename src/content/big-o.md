---
title: O que é Big-O?
description: Entenda a notação Big-O e sua importância na análise de algoritmos e estruturas de dados.
date: '2025-11-17'
categories:
  - Algoritmos
  - Arquitetura de Software
  - Data Structures
published: false
---

## **Introdução ao Big-O**

Vamos começar com uma Introdução ao assunto pra ententer melhor o que é Big-O. Mas antes, vamos entender por que?
<br />

### O que é complexidade de algoritmos

Indo direto ao ponto, a **complexidade de um algoritmo** diz respeito a escalabilidade do algoritmo, ou sejam, como esse algoritmo se comporta conforme aumentamos o tamanho da entrada de dados. <br />
Quando falamos de complexidade, estamos tentando responder:

> O quão bem (ou mal) esse algoritmo escala quando os dados crescem?

<br />

Então esquece que **não** é sobre velocidade ou tempo de excução.

<br />

é uma forma de analisar eficiência, **independente do hardware ou linguagem de programação.** Até porque faz a menor difenrença um buble sort e um quick sort quando estamos falando de 10 elementos apenas, mas quando falamos de **1 milhão de elementos**, a diferença é **gritante**.

<br />
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

## **Notação Big-O**

Em definição é:

> A notação Big O é uma notação matemática que descreve o comportamento limitante de uma função quando o argumento tende a um valor específico ou ao infinito. Ela pertence a uma família de notações inventadas por Paul Bachmann, Edmund Landau e outros, coletivamente chamadas de notação Bachmann–Landau ou de notação assintótica

<br />

Ou como ja falamos, descreve a **complexidade**.

<br />

A notação Big-O mede duas coisas:

1. **Complexidade de Tempo:** Quantas operações o algoritmo realiza dependendo do tamanho da entrada.
2. **Complexidade de Espaço:** Quanta memória extra o algoritmo precisa para funcionar.

Não vou detalhar muito sobre complexidade de espaço, mas é bom saber que existe. a partir daqui vamos focar na complexidade de tempo. mas como um exemplo sobre complexidade de espaço, o exemplo mais claro é copiar um array. Então se você receber um array de 10 elementos e cria uma copia dele, você está usando O(n) de espaço extra.
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

---
