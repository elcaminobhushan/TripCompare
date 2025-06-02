export const theme = {
  // Colors
  colors: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#0369A1',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
      950: '#172554',
    },
    secondary: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
      950: '#042F2E',
    },
    accent: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
      950: '#431407',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing
  spacing: {
    container: {
      padding: '1rem',
      maxWidth: '80rem',
    },
    section: {
      padding: '4rem',
    },
  },

  // Border Radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },

  // Transitions
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },

  // Z-index
  zIndex: {
    header: 50,
    modal: 100,
    tooltip: 150,
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Component-specific styles
export const components = {
  button: {
    variants: {
      primary: `
        bg-primary-600 
        hover:bg-primary-700 
        text-white 
        font-medium 
        rounded-lg 
        transition-colors
      `,
      secondary: `
        bg-secondary-600 
        hover:bg-secondary-700 
        text-white 
        font-medium 
        rounded-lg 
        transition-colors
      `,
      outline: `
        border 
        border-gray-300 
        hover:bg-gray-50 
        text-gray-700 
        font-medium 
        rounded-lg 
        transition-colors
      `,
    },
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    },
  },
  card: {
    base: `
      bg-white 
      rounded-xl 
      shadow-md 
      overflow-hidden 
      transition-all 
      duration-300 
      hover:shadow-lg
    `,
  },
  input: {
    base: `
      w-full
      px-3 
      py-2 
      border 
      border-gray-300 
      rounded-lg 
      text-sm 
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary-500 
      focus:border-transparent
    `,
  },
} as const;

// Export both theme and components
export default {
  theme,
  components,
};