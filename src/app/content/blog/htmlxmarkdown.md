---
title: HTML vs Markdown para agentes de IA
description: Markdown resolve a maioria das coisas com agentes de IA, mas às vezes pedir HTML muda o jogo.
date: '2026-06-14'
categories:
  - AI
published: true
---

## Forma de interação com agentes

Cada vez mais usamos IA no trabalho por meio de ferramentas como Opencode, Claude Code e Codex. Sempre interagindo com elas por meio do Markdown.

E sim, o Markdown é uma ótima forma de interação, mas ele tem suas limitações.

Markdown é forte porque é estruturado e hierárquico (como JSON e HTML) e, o mais importante, é fácil de ler e escrever para humanos. Estruturas como listas, tabelas, links e formatação de texto são facilmente representadas em Markdown, que permite diferentes níveis de hierarquia e organização (como `#` ou `*`).

O mais importante: consome menos tokens do que o HTML, o que é uma vantagem significativa quando se trata de interagir com modelos de linguagem, onde a economia de tokens pode ser crucial para obter respostas mais longas e detalhadas.

É o padrão hoje do mercado.

### Mas que história é essa de HTML?

Há algum tempo, li um artigo que falava sobre o uso eficaz do HTML ([Using Claude Code: The Unreasonable Effectiveness of HTML](https://x.com/trq212/status/2052809885763747935?s=20)) e por que não testar?

E não é muito difícil de testar. Nesse mundo das LLMs, basta colocar no prompt algo como "faça um arquivo HTML" ou "crie um artefato HTML" e o modelo vai entender que deve gerar um código HTML como resposta.

## Por que usar HTML?

HTML consegue ser muito rico em informação comparado ao Markdown. Quando se trata de um simples parágrafo, o Markdown é suficiente. Mas quando falamos de algo mais complexo, como uma tabela, um gráfico ou um layout específico, o HTML pode ser muito mais eficaz.

- Dados tabulares usando tabelas `<table>`
- Dados de design com CSS
- Ilustrações com SVG
- Trechos de código funcionais com tags `<script>`
- Interações usando elementos HTML com JavaScript + CSS
- Fluxos de trabalho usando SVG e HTML
- Dados espaciais usando posições absolutas e canvases
- Imagens usando tags `<img>`

Isso o torna uma maneira altamente eficaz para o modelo comunicar informações detalhadas para você, e para você revisá-las.

### Clareza visual e facilidade de leitura

Eu pessoalmente acho que o HTML é mais fácil de ler do que o Markdown, ainda mais quando o Markdown fica grande. O HTML pode ser estruturado de forma a ser mais legível, usando links, abas, ilustrações, etc. Isso pode ser pedido ao modelo para ser feito de forma a facilitar a leitura e compreensão.

### Interatividade

Nesse último mês, uma das coisas mais legais que eu tô fazendo é pedir para o modelo criar interações por meio de HTML. Um bom exemplo é a skill do Matt Pocock `/teach`, que a principal forma do agente pra ensinar é por meio de HTML — o modelo pode criar quizzes, flashcards e citações pra melhorar a experiência de aprendizado.

[/teach](https://www.aihero.dev/learn-anything-with-my-teach-skill)

## Casos de uso

Muito provavelmente, o caso de uso que eu mais tenho gostado é pra planejamento e exploração na codebase. Seja uma auditoria de código ou um planejamento de arquitetura, o HTML tem sido muito útil para criar diagramas, fluxogramas e tabelas que ajudam a visualizar a estrutura do código e as relações entre os componentes.

### Exemplo de prompt

> Crie um plano de implementação detalhado em um arquivo HTML. Certifique-se de incluir alguns mockups, mostrar o fluxo de dados e adicionar trechos de código importantes que eu talvez queira revisar. Torne-o fácil de ler e assimilar.

> Quero prototipar um novo botão de checkout. Quando clicado, ele deve reproduzir uma animação e depois mudar para a cor roxa rapidamente. Crie um arquivo HTML com vários controles deslizantes (sliders) e opções para eu experimentar diferentes parâmetros nessa animação. Adicione um botão para copiar os parâmetros que funcionaram bem.

> Ajude-me a revisar este PR criando um artefato HTML que o descreva. Não estou muito familiarizado com a lógica de streaming/backpressure, então foque nisso. Renderize o diff real com anotações nas margens, use cores para sinalizar as descobertas por gravidade e o que mais for necessário para transmitir bem o conceito.

Detalhe que esses prompts são tirados do artigo do Thariq.

Em resumo, o HTML pode ser usado pra:

- Explorar outras formas de implementar algo no código.
- Explorar múltiplos designs visuais.
- Criar a documentação de um PR.
- Revisar um PR.
- Compreender um tópico complexo no código.
- Criar artefatos de sistemas de design (design systems).
- Ajustar componentes específicos.
- Visualizar bibliotecas de componentes.
- Prototipar animações dinâmicas e fluidas.

## Quando usar cada um?

Na prática, eu sigo uma regra bem simples: se é pra ler, Markdown; se é pra ver, HTML.

Pra coisas do dia a dia — revisar um diff, pedir uma explicação rápida, documentar algo — o Markdown resolve e gasta menos tokens. Agora, quando eu preciso entender visualmente alguma coisa, tipo a arquitetura de um sistema, comparar designs ou prototipar uma interação, mando logo um "cria isso em HTML" no prompt. Dá muito menos trabalho do que tentar desenhar mentalmente um diagrama a partir de texto.

## Conclusão

O Markdown não vai desaparecer, Ele continua sendo o formato ideal para a maioria das interações com agentes de IA, especialmente pela economia de tokens e simplicidade. Mas quando você precisa de algo visual, interativo ou complexo, pedir HTML ao agente abre um leque de possibilidades que o Markdown simplesmente não consegue oferecer.

A melhor abordagem é usar ambos estrategicamente: Markdown para o dia a dia e HTML para momentos em que você precisa de clareza visual, prototipação ou exploração de ideias. A próxima vez que estiver preso em um problema complexo com um agente de IA, tente pedir um artefato HTML, você pode se surpreender com o resultado.
