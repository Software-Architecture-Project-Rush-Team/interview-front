<script setup>
import { cn } from '@/lib/utils';
import { MenubarLabel } from 'radix-vue';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  inset: { type: Boolean, required: false },
});
</script>

<template>
  <MenubarLabel
    :class="
      cn('tailwind.config.jspx-2 tailwind.config.jspy-1.5 tailwind.config.jstext-sm tailwind.config.jsfont-semibold', inset && 'tailwind.config.jspl-8', props.class)
    "
  >
    <slot />
  </MenubarLabel>
</template>
