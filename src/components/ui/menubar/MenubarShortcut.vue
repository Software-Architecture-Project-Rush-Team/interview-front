<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <span
    :class="
      cn('tailwind.config.jsml-auto tailwind.config.jstext-xs tailwind.config.jstracking-widest tailwind.config.jstext-muted-foreground', props.class)
    "
  >
    <slot />
  </span>
</template>
