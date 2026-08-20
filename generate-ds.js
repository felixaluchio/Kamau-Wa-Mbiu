import fs from 'fs';
import path from 'path';

const indexCssPath = path.join(process.cwd(), 'src', 'index.css');

const cssContent = `
@import "tailwindcss";

@theme {
  /* COLORS */
  /* Primary: Royal Blue #1148B8 */
  --color-primary-50: #eff4ff;
  --color-primary-100: #dbe6fe;
  --color-primary-200: #bfd3fe;
  --color-primary-300: #93bbfd;
  --color-primary-400: #609afa;
  --color-primary-500: #3b76f6;
  --color-primary-600: #2559eb;
  --color-primary-700: #1d48d0;
  --color-primary-800: #1148b8; /* Base */
  --color-primary-900: #1e3a8a;
  --color-brand-primary: var(--color-primary-800);

  /* Secondary: Cyan #0EA5D8 */
  --color-secondary-50: #ecfeff;
  --color-secondary-100: #cffafe;
  --color-secondary-200: #a5f3fc;
  --color-secondary-300: #67e8f9;
  --color-secondary-400: #22d3ee;
  --color-secondary-500: #06b6d4;
  --color-secondary-600: #0ea5d8; /* Base */
  --color-secondary-700: #0e7490;
  --color-secondary-800: #155e75;
  --color-secondary-900: #164e63;
  --color-brand-secondary: var(--color-secondary-600);

  /* Accent: Soft Blue #4F8DD9 */
  --color-accent-50: #f0f6ff;
  --color-accent-100: #e0edff;
  --color-accent-200: #c0dbff;
  --color-accent-300: #9bc2ff;
  --color-accent-400: #74a1fa;
  --color-accent-500: #4f8dd9; /* Base */
  --color-accent-600: #3a70c4;
  --color-accent-700: #2f59a3;
  --color-accent-800: #294a85;
  --color-accent-900: #25406d;
  --color-brand-accent: var(--color-accent-500);

  /* Neutrals: Deep Navy #14213D context */
  --color-neutral-50: #f8fbff; /* Background */
  --color-neutral-100: #f0f4fa;
  --color-neutral-200: #e1e9f4;
  --color-neutral-300: #cad6e8;
  --color-neutral-400: #aebfd6;
  --color-neutral-500: #8ea3c0;
  --color-neutral-600: #7185a5;
  --color-neutral-700: #5c6c8a;
  --color-neutral-800: #4a5670;
  --color-neutral-900: #14213d; /* Text */
  
  --color-brand-neutral-warm: var(--color-neutral-50);
  --color-brand-neutral-white: #ffffff;
  --color-brand-neutral-beige: var(--color-neutral-100);
  --color-brand-neutral-grey: var(--color-neutral-200);
  --color-brand-neutral-charcoal: var(--color-neutral-900);
  --color-brand-card: var(--color-brand-neutral-white);

  /* Semantic */
  --color-success-50: #f0fdf4;
  --color-success-500: #16a34a; /* Base */
  --color-success-900: #14532d;
  
  --color-warning-50: #fffbeb;
  --color-warning-500: #f59e0b; /* Base */
  --color-warning-900: #78350f;
  
  --color-error-50: #fef2f2;
  --color-error-500: #dc2626; /* Base */
  --color-error-900: #7f1d1d;

  /* TYPOGRAPHY */
  --font-heading: 'Georgia', 'Playfair Display', serif;
  --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  
  /* SPACING - 8pt grid */
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-14: 3.5rem; /* 56px */
  --spacing-16: 4rem; /* 64px */
  --spacing-20: 5rem; /* 80px */
  --spacing-24: 6rem; /* 96px */
  --spacing-32: 8rem; /* 128px */
  --spacing-40: 10rem; /* 160px */

  /* Legacy aliases for existing components */
  --spacing-xs: var(--spacing-4);
  --spacing-sm: var(--spacing-6);
  --spacing-md: var(--spacing-8);
  --spacing-lg: var(--spacing-12);
  
  /* BORDER RADIUS */
  --radius-sm: 0.25rem; /* 4px */
  --radius-md: 0.5rem; /* 8px */
  --radius-lg: 0.75rem; /* 12px */
  --radius-xl: 1rem; /* 16px */
  --radius-2xl: 1.5rem; /* 24px */
  --radius-full: 9999px;

  /* SHADOWS / ELEVATION */
  --shadow-level-1: 0 1px 2px 0 rgb(20 33 61 / 0.05);
  --shadow-level-2: 0 4px 6px -1px rgb(20 33 61 / 0.05), 0 2px 4px -2px rgb(20 33 61 / 0.05);
  --shadow-level-3: 0 10px 15px -3px rgb(20 33 61 / 0.08), 0 4px 6px -4px rgb(20 33 61 / 0.05);
  --shadow-level-4: 0 20px 25px -5px rgb(20 33 61 / 0.1), 0 8px 10px -6px rgb(20 33 61 / 0.05);
  --shadow-floating: 0 25px 50px -12px rgb(20 33 61 / 0.25);
  --shadow-modal: 0 35px 60px -15px rgb(20 33 61 / 0.3);
}

@layer base {
  body {
    font-family: var(--font-body);
    background-color: var(--color-brand-neutral-warm);
    color: var(--color-brand-neutral-charcoal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 500;
  }
  
  /* Typography Scale Classes */
  .text-display-xl { @apply text-6xl sm:text-7xl lg:text-[80px] leading-[1.1] font-heading tracking-tight; }
  .text-display-lg { @apply text-5xl sm:text-6xl leading-[1.1] font-heading tracking-tight; }
  .text-display-md { @apply text-4xl sm:text-5xl leading-[1.15] font-heading; }
  .text-h1 { @apply text-4xl leading-[1.2] font-heading; }
  .text-h2 { @apply text-3xl leading-[1.25] font-heading; }
  .text-h3 { @apply text-2xl leading-[1.3] font-heading; }
  .text-h4 { @apply text-xl leading-[1.4] font-heading; }
  .text-h5 { @apply text-lg leading-[1.4] font-heading; }
  .text-h6 { @apply text-base leading-[1.5] font-heading font-bold; }
  
  .text-subtitle { @apply text-xl leading-relaxed font-body text-neutral-600; }
  .text-body-lg { @apply text-lg leading-relaxed font-body; }
  .text-body { @apply text-base leading-relaxed font-body; }
  .text-body-sm { @apply text-sm leading-relaxed font-body; }
  .text-caption { @apply text-xs leading-normal font-body text-neutral-500; }
  .text-label { @apply text-[10px] font-bold uppercase tracking-widest font-body; }
}

/* Scrollbar Hide */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;

fs.writeFileSync(indexCssPath, cssContent);
console.log('index.css updated with full design tokens!');
