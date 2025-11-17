import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Detecta se o usuário prefere animações reduzidas
function getPrefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Função para ler o valor armazenado no localStorage
function getStoredForceAnimations(): boolean {
	if (!browser) return true; // Sempre forçar animações por padrão
	const stored = localStorage.getItem('forceAnimations');
	// Se não houver valor armazenado, retorna true (forçar animações)
	return stored === null ? true : stored === 'true';
}

// Cria um store customizado para controlar se animações devem ser forçadas
// Por padrão, sempre retorna true para manter animações sempre ativas
function createForceAnimationsStore() {
	const storedValue = getStoredForceAnimations();

	// Default to stored value, ou true se não houver valor armazenado
	const { subscribe, set, update } = writable<boolean>(storedValue);

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const newValue = !current;
				if (browser) {
					localStorage.setItem('forceAnimations', String(newValue));
				}
				return newValue;
			});
		},
		enable: () => {
			set(true);
			if (browser) {
				localStorage.setItem('forceAnimations', 'true');
			}
		},
		disable: () => {
			set(false);
			if (browser) {
				localStorage.setItem('forceAnimations', 'false');
			}
		},
		reset: () => {
			set(true);
			if (browser) {
				localStorage.removeItem('forceAnimations');
			}
		}
	};
}

// Store para controlar se as animações devem ser forçadas
export const forceAnimations = createForceAnimationsStore();
export const prefersReducedMotion = writable(browser ? getPrefersReducedMotion() : false);

// Listen for changes to prefers-reduced-motion
if (browser) {
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	mediaQuery.addEventListener('change', (e) => {
		prefersReducedMotion.set(e.matches);
	});
}
