# Portfolio Template

Inspired from [Magic UI](https://magicui.design) Portfolio Template & [Dillion Verma](https://github.com/dillionverma)
Build with Svelte, [shadcn-svelte](https://www.shadcn-svelte.com) and [Svelte-Animations](https://animation-svelte.vercel.app)

## Features

---

- Setup only takes a few minutes by editing the [single config file](https://github.com/SikandarJODD/portfolio-template/blob/main/src/lib/data/resume.ts)
- Built using SvelteKit, Typescript, Shadcn/UI, TailwindCSS, Svelte - Motion, Svelte Animations
- Responsive for different devices
- Optimized for Svelte and Vercel

## Getting Started

---

1. Clone the repository

```bash
git clone https://github.com/SikandarJODD/portfolio-template
```

2. Move into the project directory

```bash
cd portfolio-template
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open the [Config File](https://github.com/SikandarJODD/portfolio-template/blob/main/src/lib/data/resume.ts) and make changes

## Animation Troubleshooting

---

If animations are not working as expected, please refer to the [Animation Troubleshooting Guide](./ANIMATION_TROUBLESHOOTING.md).

### Quick Diagnostics

- Visit `/animation-test` route in your browser to run comprehensive diagnostics
- Check browser console for debug messages
- Ensure your browser supports modern animation features

### Common Issues

- **View Transitions API**: Requires Chrome 111+, Edge 111+, or Safari 18+
- **Reduced Motion**: Check your OS accessibility settings
- **Dependencies**: Verify `svelte-motion@^0.12.2` is installed

For detailed troubleshooting steps, see [ANIMATION_TROUBLESHOOTING.md](./ANIMATION_TROUBLESHOOTING.md)
