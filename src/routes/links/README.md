# Página de Links

Uma página estilo "link in bio" para centralizar todos os seus links importantes em um só lugar.

## 📍 Acesso

A página está disponível em: `/link`

## ✨ Características

- 🎨 **Design consistente** - Usa os mesmos componentes UI do resto do portfolio
- ✨ **Animações suaves** - Efeitos BlurFade para uma experiência agradável
- 📱 **Responsivo** - Funciona perfeitamente em todos os dispositivos
- 🎯 **Fácil de customizar** - Configuração centralizada em um arquivo
- 🌈 **Efeitos hover** - Cada link tem sua própria cor ao passar o mouse

## 🛠️ Como Customizar

### Editando Links

Abra o arquivo `/src/lib/data/links.ts` e edite o array `socialLinks`:

```typescript
{
  title: 'Nome do Link',
  description: 'Descrição do link',
  url: 'https://seu-link.com',
  icon: IconComponent, // Ícone do lucide-svelte
  color: 'hover:bg-[#cor] hover:text-white', // Cor do hover
  enabled: true // true para mostrar, false para ocultar
}
```

### Adicionando Novos Links

1. Importe o ícone desejado do `lucide-svelte` no topo do arquivo `links.ts`
2. Adicione um novo objeto no array `socialLinks`
3. Configure as propriedades conforme necessário

Exemplo:

```typescript
import { Youtube } from 'lucide-svelte';

// No array socialLinks:
{
  title: 'YouTube',
  description: 'Assista meus vídeos',
  url: 'https://youtube.com/@seu-canal',
  icon: Youtube,
  color: 'hover:bg-[#FF0000] hover:text-white',
  enabled: true
}
```

### Desabilitando Links

Para esconder um link temporariamente sem deletá-lo, mude `enabled` para `false`:

```typescript
{
  title: 'Twitter / X',
  description: 'Acompanhe minhas atualizações',
  url: 'https://x.com/pedrofelipeek',
  icon: Twitter,
  color: 'hover:bg-[#1DA1F2] hover:text-white',
  enabled: false // ← Link não será exibido
}
```

## 🎨 Customizando Cores

As cores do hover usam o sistema de cores do Tailwind CSS. Você pode usar:

- Cores hexadecimais: `hover:bg-[#FF0000]`
- Cores do Tailwind: `hover:bg-blue-500`
- Cores do tema: `hover:bg-primary`

## 📦 Ícones Disponíveis

Os ícones vêm do [Lucide Icons](https://lucide.dev/icons/). Alguns populares:

- `Github`
- `Linkedin`
- `Twitter`
- `Mail`
- `Globe`
- `Youtube`
- `Instagram`
- `Facebook`
- `FileText` (para blog/artigos)
- `Briefcase` (para portfolio/trabalho)

## 🔧 Estrutura de Arquivos

```
src/
├── routes/
│   └── link/
│       ├── +page.svelte      # Página principal
│       └── README.md          # Esta documentação
└── lib/
    └── data/
        └── links.ts           # Configuração dos links
```

## 💡 Dicas

1. **Ordem dos Links**: Os links aparecem na ordem em que estão no array
2. **Links Internos**: Você pode adicionar links para outras páginas do site (ex: `/blog`)
3. **Animações**: Ajuste `BLUR_FADE_DELAY` em `+page.svelte` para controlar a velocidade das animações
4. **Avatar**: O avatar e informações vêm automaticamente do arquivo `resume.ts`

## 🚀 Exemplos de Uso

### Link para WhatsApp
```typescript
{
  title: 'WhatsApp',
  description: 'Envie uma mensagem',
  url: 'https://wa.me/5561999999999',
  icon: MessageCircle,
  color: 'hover:bg-[#25D366] hover:text-white',
  enabled: true
}
```

### Link para Portfolio
```typescript
{
  title: 'Portfólio Completo',
  description: 'Veja todos os meus projetos',
  url: '/',
  icon: Briefcase,
  color: 'hover:bg-primary hover:text-primary-foreground',
  enabled: true
}
```

### Link para Calendly/Agendamento
```typescript
{
  title: 'Agendar Reunião',
  description: 'Marque um horário comigo',
  url: 'https://calendly.com/seu-usuario',
  icon: Calendar,
  color: 'hover:bg-[#006BFF] hover:text-white',
  enabled: true
}
```

## 🔗 Adicionando ao Navbar

Se você quiser adicionar a página de links ao navbar, edite o arquivo `/src/lib/data/resume.ts`:

```typescript
import { Link } from 'lucide-svelte'; // Adicione esta importação

// No objeto DATA, encontre a propriedade navbar:
navbar: [
  { href: '/', icon: HomeIcon, label: 'Home' },
  { href: '/blog', icon: NotebookIcon, label: 'Blog' },
  { href: '/#projects', icon: CodeIcon, label: 'Projects' },
  { href: '/link', icon: Link, label: 'Links' } // ← Adicione esta linha
]
```

Depois, adicione a tradução no arquivo de i18n:

**`/src/lib/i18n/translations.ts`** (ou arquivo similar):
```typescript
navbar: {
  home: 'Home',
  blog: 'Blog',
  projects: 'Projects',
  links: 'Links' // ← Adicione para inglês
}

// E para português:
navbar: {
  home: 'Início',
  blog: 'Blog',
  projects: 'Projetos',
  links: 'Links' // ← Adicione para português
}
```

## 📝 Notas

- Todos os links externos abrem em uma nova aba automaticamente
- O atributo `rel="noopener noreferrer"` é adicionado para segurança
- A página usa o mesmo layout e tema do resto do site
- As meta tags são configuradas automaticamente para SEO
- A página é totalmente independente e funciona sem precisar estar no navbar