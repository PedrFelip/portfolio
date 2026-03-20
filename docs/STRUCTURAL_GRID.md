# Structural Grid Design - Nova Página `/new`

## 🎯 O que foi implementado

Criamos uma nova página de demonstração em `/[lang]/new` implementando o **Structural Grid Design System** (também conhecido como Exposed Grid ou Rail Layout) - o padrão moderno usado por Linear, Vercel, Resend e Planetscale.

## 📁 Arquivos criados

### 1. CSS Foundation (`src/app/globals.css`)
```css
/* Vertical rail lines */
.page-rails { ... }

/* Content bounded to rails */
.rail-bounded { ... }

/* Section dividers */
.section-divider { ... }

/* Dot pattern background */
.dot-pattern { ... }

/* Custom scrollbar */
::-webkit-scrollbar { ... }
```

### 2. Blueprint Components (`src/app/components/blueprint/`)

- **RailLayout.tsx** - Container principal com linhas verticais
- **SectionDivider.tsx** - Divisores horizontais entre seções
- **DotPattern.tsx** - Padrão de pontos para fundos
- **CornerBracket.tsx** - Marcadores L nos cantos (estilo blueprint)
- **index.ts** - Barrel export

### 3. Nova Página (`src/app/[lang]/new/page.tsx`)

Demonstração completa com 3 seções:

**Hero Section:**
- Badge de status com animação
- Headline dupla com hierarquia tipográfica
- CTAs primário e secundário
- Tech stack em estilo código
- Linhas guias tracejadas (visíveis em telas grandes)

**Features Grid:**
- Layout responsivo (1 col → 2 cols → 3 cols)
- Bordas tracejadas internas seguindo lógica responsiva
- Hover states em todas as células
- Dot pattern no background
- Ícones com estados de hover
- 6 capabilities cards

**CTA Section:**
- Layout centralizado
- Dois botões com estilos contrastantes
- Espaçamento generoso

## 🎨 Design Principles Aplicados

### 1. Visible Structure
- Rails verticais como elementos decorativos de primeira classe
- Conteúdo vive dentro da grid, não flutuando sobre ela

### 2. Border Strategy
- **Solid** para elementos externos (rails, section dividers)
- **Dashed** para divisões internas (grid cells)

### 3. Visual Rhythm
- Alternância entre backgrounds default e dot-pattern
- Espaçamento consistente no grid 4px

### 4. Typography Hierarchy
- Headlines: 600 weight, tracking tight (-0.02em)
- Labels: uppercase, tracking-wide
- Body: text-muted-foreground

### 5. Animation & Interaction
- Timing: 150ms cubic-bezier(0.25, 1, 0.5, 1)
- Hover: bg-white/[0.02] em todas as células
- Status badge com pulse animation

### 6. Color Usage
- Monochrome com accent mínimo
- Cor apenas para status, ação e código
- Borders em 8-10% opacity

## 🚀 Como usar

### Acessar a página

```bash
bun dev
# Acesse: http://localhost:3000/en/new ou /pt/new
```

### Usar componentes blueprint

```tsx
import { RailLayout, SectionDivider, DotPattern, CornerBrackets } from '@/components/blueprint';

export default function MyPage() {
  return (
    <RailLayout>
      <section>Hero content</section>
      <SectionDivider />
      <section className="relative">
        <DotPattern />
        <div className="relative">Content</div>
      </section>
    </RailLayout>
  );
}
```

### Grid com bordas responsivas

```tsx
<div className="rail-bounded border-t border-border">
  <div className="grid sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, i) => (
      <div
        key={item.id}
        className={`group px-6 py-8 transition-colors hover:bg-white/[0.02]
          ${i % 3 !== 0 ? 'lg:border-l lg:border-dashed lg:border-border' : ''}
          ${i % 2 !== 0 ? 'sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border' : ''}
          ${i >= 3 ? 'lg:border-t lg:border-dashed lg:border-border' : ''}
          ${i >= 2 ? 'sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border' : ''}
          ${i >= 1 ? 'max-sm:border-t max-sm:border-dashed max-sm:border-border' : ''}
        `}
      >
        {/* conteúdo */}
      </div>
    ))}
  </div>
</div>
```

## 📐 Lógica de Bordas Responsivas

Para grid 3-column (1 col mobile → 2 cols tablet → 3 cols desktop):

**border-l (esquerda):**
- Aplicada a células que NÃO são a primeira na linha daquele breakpoint
- `lg:border-l` = células 2 e 3 no desktop
- `sm:max-lg:border-l` = célula 2 no tablet
- Nenhuma no mobile (todas são primeira linha)

**border-t (topo):**
- Aplicada a células que NÃO estão na primeira linha daquele breakpoint
- `lg:border-t` = células 4, 5, 6 no desktop (linha 2)
- `sm:max-lg:border-t` = células 3, 4, 5, 6 no tablet (linhas 2 e 3)
- `max-sm:border-t` = células 2, 3, 4, 5, 6 no mobile (linhas 2+)

## ⚠️ Regras Importantes

### 1. overflow-x: clip (não hidden!)
```css
.page-rails {
  overflow-x: clip; /* ✅ Correto - preserva position:sticky */
  /* overflow-x: hidden; ❌ Quebra sticky positioning */
}
```

### 2. Rail width adjustment
Para alterar a largura máxima do conteúdo, mude `36rem`:
```css
--rail-offset: max(1rem, calc(50% - 36rem)); 
/* 32rem = max-w-5xl (1024px) */
/* 36rem = max-w-6xl (1152px) ← atual */
/* 40rem = max-w-7xl (1280px) */
```

### 3. Scroll com sticky navbar
Já configurado em `globals.css`:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* Altura do navbar */
}
```

### 4. Hover em todas as células
```tsx
className="group transition-colors hover:bg-white/[0.02]"
```

### 5. Tracking consistente
Sempre `tracking-wide` em labels, nunca misturar com `tracking-widest` ou `tracking-wider`.

## 🎯 Próximos passos

Para refatorar a página principal (`/[lang]/page.tsx`):

1. Aplicar `RailLayout` wrapper
2. Converter `FeaturedProjectsSection` para grid com bordas tracejadas
3. Adicionar `DotPattern` alternado nas seções
4. Refatorar `Hero` com guide lines tracejadas
5. Adicionar `CornerBrackets` nos cards de projetos
6. Substituir `Section` component por layouts grid-aware

## 📚 Referências

- **Structural Grid Skill**: `/Structural Grid Design System` (no prompt)
- **AGENTS.md**: Design principles e guidelines
- **Frontend Design Skill**: `.opencode/skills/frontend-design/SKILL.md`

## 🔍 Debugging

### Verificar rails visíveis
Adicione background temporário para visualizar:
```css
.page-rails::before,
.page-rails::after {
  background: red; /* Debug: rails devem aparecer */
}
```

### Verificar rail-offset
```js
console.log(getComputedStyle(document.querySelector('.page-rails')).getPropertyValue('--rail-offset'));
```

---

**Status**: ✅ Implementação completa e funcional  
**Próximo**: Refatorar página home com mesmo padrão
