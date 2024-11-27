<script setup>
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarCellTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  day: { type: null, required: true },
  month: { type: null, required: true },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarCellTrigger
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),
        'tailwind.config.jsh-9 tailwind.config.jsw-9 tailwind.config.jsp-0 tailwind.config.jsfont-normal',
        '[&[data-today]:not([data-selected])]:tailwind.config.jsbg-accent [&[data-today]:not([data-selected])]:tailwind.config.jstext-accent-foreground',
        // Selected
        'data-[selected]:tailwind.config.jsbg-primary data-[selected]:tailwind.config.jstext-primary-foreground data-[selected]:tailwind.config.jsopacity-100 data-[selected]:hover:tailwind.config.jsbg-primary data-[selected]:hover:tailwind.config.jstext-primary-foreground data-[selected]:focus:tailwind.config.jsbg-primary data-[selected]:focus:tailwind.config.jstext-primary-foreground',
        // Disabled
        'data-[disabled]:tailwind.config.jstext-muted-foreground data-[disabled]:tailwind.config.jsopacity-50',
        // Unavailable
        'data-[unavailable]:tailwind.config.jstext-destructive-foreground data-[unavailable]:tailwind.config.jsline-through',
        // Outside months
        'data-[outside-view]:tailwind.config.jstext-muted-foreground data-[outside-view]:tailwind.config.jsopacity-50 [&[data-outside-view][data-selected]]:tailwind.config.jsbg-accent/50 [&[data-outside-view][data-selected]]:tailwind.config.jstext-muted-foreground [&[data-outside-view][data-selected]]:tailwind.config.jsopacity-30',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
