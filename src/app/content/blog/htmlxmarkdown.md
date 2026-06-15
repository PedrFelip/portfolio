---
title: HTML vs Markdown para agentes de IA
description: Markdown resolve a maioria das coisas com agentes de IA, mas às vezes pedir HTML muda o jogo.
date: '2026-06-14'
categories:
  - AI
published: true
---

## Forma de interação com agentes

Cada vez mais a gente usa IA no trabalho com ferramentas como Opencode, Claude Code e Codex. E quase sempre, a interação acontece por meio de **Markdown**.

E sim, o Markdown é uma ótima forma de interação. Mas tem suas **limitações**.

Ele é forte porque é estruturado e hierárquico (como JSON e HTML). O mais importante: é fácil de ler e escrever pra humanos.

Listas, tabelas, links, formatação de texto, tudo isso é facilmente representado em Markdown, com diferentes níveis de hierarquia usando `#` ou `*`.

Outra coisa: **consome menos tokens** que o HTML. E com LLMs, economizar tokens pode ser crucial pra conseguir respostas mais longas e detalhadas.

É o padrão hoje do mercado.

### Mas que história é essa de HTML?

Há um tempo, li um artigo sobre o uso eficaz do HTML ([Using Claude Code: The Unreasonable Effectiveness of HTML](https://x.com/trq212/status/2052809885763747935?s=20)) e pensei: por que não testar?

E não é difícil. Basta colocar no prompt algo como "faça um arquivo HTML" ou "crie um artefato HTML" que o modelo entende: deve **gerar HTML como resposta**.

## Por que usar HTML?

HTML é **muito mais rico em informação** que o Markdown. Pra um parágrafo simples, Markdown resolve.

Mas pra algo complexo como uma tabela, um gráfico ou um layout. O HTML é **bem mais eficaz**.

- Dados tabulares usando tabelas `<table>`
- Dados de design com CSS
- Ilustrações com SVG
- Trechos de código funcionais com tags `<script>`
- Interações usando elementos HTML com JavaScript + CSS
- Fluxos de trabalho usando SVG e HTML
- Dados espaciais usando posições absolutas e canvases
- Imagens usando tags `<img>`

Isso faz do HTML uma maneira muito eficaz do modelo te comunicar informações detalhadas — e de você revisá-las.

### Clareza visual e facilidade de leitura

Eu, particularmente, acho o HTML mais fácil de ler que o Markdown. Ainda mais quando o Markdown fica grande.

Dá pra estruturar o HTML de um jeito bem mais legível: com links, abas, ilustrações. É só pedir pro modelo fazer assim pra facilitar a leitura.

### Interatividade

Esse último mês, uma das coisas mais legais que tô fazendo é pedir pro modelo criar **interações em HTML**.

Um bom exemplo é a skill `/teach` do Matt Pocock. A principal forma do agente ensinar é por HTML: quizzes, flashcards, citações — tudo pra melhorar a experiência.

[/teach](https://www.aihero.dev/learn-anything-with-my-teach-skill)

## Casos de uso

O caso de uso que mais tenho gostado é **planejamento e exploração de codebase**.

Seja auditoria de código ou arquitetura, o HTML tem sido útil pra criar diagramas, fluxogramas e tabelas. Ajuda muito a **visualizar a estrutura do código** e as relações entre componentes.

### Exemplo de prompt

> Crie um plano de implementação detalhado em um arquivo HTML. Certifique-se de incluir alguns mockups, mostrar o fluxo de dados e adicionar trechos de código importantes que eu talvez queira revisar. Torne-o fácil de ler e assimilar.

> Quero prototipar um novo botão de checkout. Quando clicado, ele deve reproduzir uma animação e depois mudar para a cor roxa rapidamente. Crie um arquivo HTML com vários controles deslizantes (sliders) e opções para eu experimentar diferentes parâmetros nessa animação. Adicione um botão para copiar os parâmetros que funcionaram bem.

> Ajude-me a revisar este PR criando um artefato HTML que o descreva. Não estou muito familiarizado com a lógica de streaming/backpressure, então foque nisso. Renderize o diff real com anotações nas margens, use cores para sinalizar as descobertas por gravidade e o que mais for necessário para transmitir bem o conceito.

Detalhe: esses prompts são do artigo do Thariq.

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

Na prática, eu sigo uma regra bem simples: **se é pra ler, Markdown; se é pra ver, HTML**.

Pra coisas do dia a dia — revisar um diff, pedir uma explicação rápida, documentar algo — o Markdown resolve e gasta menos tokens.

Mas quando preciso entender algo visualmente — arquitetura de um sistema, comparar designs, prototipar uma interação — mando logo um "cria isso em HTML" no prompt.

Dá muito menos trabalho do que tentar desenhar mentalmente um diagrama a partir de texto.

## Conclusão

O Markdown não vai sumir. Continua sendo o **formato ideal** pra maioria das interações com agentes de IA, principalmente pela economia de tokens e simplicidade.

Mas quando você precisa de algo visual, interativo ou complexo, pedir HTML abre um leque de possibilidades que o Markdown não oferece.

A melhor abordagem é **usar ambos de forma estratégica**: Markdown no dia a dia, HTML pra clareza visual e exploração de ideias.

Da próxima vez que estiver preso num problema complexo com um agente de IA, **tente pedir um artefato HTML**. Você pode se surpreender com o resultado.
