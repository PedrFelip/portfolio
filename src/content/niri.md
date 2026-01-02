---
title: Niri um tiling baseado em scroll
description: Niri WM traz o conceito de scrollable tiling, janelas organizadas verticalmente com navegação fluida, sem perder foco e produtividade.
tldr:
  - Introduz o conceito de scrollable tiling e por que o Niri não redimensiona janelas existentes.
  - Compara a experiência com outros tilers como Hyprland, destacando foco e produtividade.
  - Resume as principais features e como configurar o compositor via arquivo .kdl.
date: '2025-11-02'
categories:
  - NiriWM
  - Linux
  - Window Managers
  - Produtividade
published: true
---

## **Introdução ao Niri Scrollable Tiling**

O **Niri** é um compositor **Wayland** que organiza janelas em um layout que estende horizontalmente para a direita infinitamente, que ao abrir uma nova janela nunca faz com que as janelas existentes sejam redimensionadas. <br />
Isso permite que navegue facilmente as colunas de janelas usando **atalhos de teclado**, rolando nas janelas abertas, mantendo o foco e a produtividade. <br />
Ele é escrito em **Rust**, o que já é um ponto de hype 😅 <br />
**Links do projeto:** <br />

- [Niri WM](https://github.com/YaLTeR/niri)
- [Documentação](https://yalter.github.io/niri/Configuration%3A-Introduction.html)
  <br />

---

## **Mas oq diferencia ele de outros tiling window managers como hyprland e i3?**

O destaque do **Niri** é o **“scrollable tiling”** <br />
Um modelo em que o layout não é limitado por uma grade fixa, mas por uma sequência rolável de colunas.
Isso muda completamente a experiência de multitarefa: você pode manter várias janelas abertas **“fora da tela”**, sem bagunçar o layout atual.

![Niri WM mostrando layout scrollable com janelas organizadas horizontalmente](/images/posts/niri/niri-hero.webp)

> Perceba que a janela do zed está do lado direito, fora da tela principal, mas ainda acessível via scroll horizontal

<br />

### **O que muda comparando com o hyprland?**

No **hyprland**, ao abrir uma nova janela, o espaço disponível é redistribuído entre todas as janelas abertas, o que pode levar a redimensionamentos indesejados e perda de foco. <br />
No **Niri**, as janelas mantêm seus tamanhos originais, e você pode rolar horizontalmente para acessar janelas adicionais, proporcionando uma experiência mais fluida e focada. <br />

![Comparação do Hyprland mostrando redimensionamento automático de janelas](/images/posts/niri/hyprland-exemplo.webp)

> No hyprland, ele redimensiona todas as janelas para caber na tela

<br />

## **Features principais do Niri**

- **Construído do zero pensado para scrollable tiling**
- **Áreas de trabalho dinâmicas**
- **Overviews de janelas abertas**
- **Grupo de Janelas em Abas**
- **Recarregamento dinâmico de configurações**
- **Gestos em touchpad e mouse**

### **Quer experimentar o scrollable tiling?**

Tem projetos de tiling que são implementadas em DEs como **gnome** e **kde**, como o **PaperWM** e o **Karousel**, respectivamente, que são ótimos projetos para quem quer experimentar o conceito sem sair do ambiente atual.
Tem o **PaperWM.spoon** para **MacOS**, que traz o conceito de scrollable tiling para o ecossistema da maçã. <br />

> Lembrando que são implementações parciais do conceito, pode não ser tão polido, mas é bom pra testar o conceito.

## **Configuração do Niri**

![Niri Overview mostrando janelas abertas e áreas de trabalho organizadas](/images/posts/niri/overview.webp)

> Um Overview tipo do gnome, que mostra as janelas abertas e organizadas, além de mostrar as áreas de trabalho (no meu caso, duas áreas de trabalho)

A configuração do **Niri** é feita através de um arquivo **.kdl (Kotlin Data Language)** que é simples e direto. <br />

A estrutura básica do arquivo de configuração inclui seções para definir **atalhos de teclado**, **comportamento de janelas** e outras preferências. <br />

```json
input { ... }
output "nome-do-monitor" { ... }
layout { ... }
spawn-at-startup "comando"
hotkey-overlay { ... }
prefer-no-csd
screenshot-path "..."
animations { ... }
window-rule { ... }
binds { ... }
```

---

## **Considerações Finais**

O **Niri** é um grande projeto promissor que traz um workflow diferente para o mundo dos tiling window managers. Venho testando ele essa semana e estou gostando bastante do conceito. <br />
Se você é entusiasta de window managers, vale a pena dar uma olhada! <br />
