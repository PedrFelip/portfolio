import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

let highlighterPromise = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vesper'],
      langs: ['javascript', 'typescript', 'python', 'go', 'bash', 'json']
    }).then(async (highlighter) => {
      await highlighter.loadLanguage('javascript', 'typescript', 'python', 'go', 'bash', 'json');
      await highlighter.loadTheme('vesper');
      return highlighter;
    });
  }
  return highlighterPromise;
}

const mdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter();
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'vesper' }));
      return `{@html \`${html}\` }`;
    }
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    adapter: adapter({
      runtime: 'nodejs22.x'
    })
  }
};

export default config;
