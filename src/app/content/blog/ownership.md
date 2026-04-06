---
title: Ownership e Borrowing em Rust
description: Pilares do gerenciamento de memória que diferenciam Rust
date: "2026-04-02"
categories:
  - Rust
published: false
---

## Introdução

Vamos lá, pessoal. Antes de começar, quero fazer uma introdução rápida sobre o Rust.
Estou estudando a linguagem esta semana e achei interessante falar sobre ela aqui no blog. Como faz tempo que não escrevo por aqui, pensei que seria uma boa oportunidade para falar sobre algo que estou aprendendo.

### Por que eu estou estudando Rust?

Primeiro, porque é uma linguagem que está em vários projetos de meu interesse, como o Zed e o Niri. Meu editor de texto favorito, o Zed, é escrito em Rust, e o Niri, o meu Window Manager, também é escrito em Rust. Além de ser a linguagem Hype, qualquer coisa que é igual a tal ferramenta mas escrita em Rust já tem o hype da comunidade.

[Zed](https://zed.dev) <br/>
[Niri](https://github.com/niri-wm/niri)

### O que é Rust?

<div align="center">
  <img src="/images/posts/ownership/rust.svg" alt="Rust" width="512"/>
</div>