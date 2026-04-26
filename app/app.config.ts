export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue' as string,
    },
    button: {
      slots: {
        base: ['disabled:cursor-not-allowed disabled:opacity-60', 'transition-colors duration-200'],
      },
      variants: {
        size: {
          lg: {
            base: 'px-3 py-1.5 tracking-wide text-[15.5px] gap-2',
          },
        },
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'lg',
      },
    },
  },
})
