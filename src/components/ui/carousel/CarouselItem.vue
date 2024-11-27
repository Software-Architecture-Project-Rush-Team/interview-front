<script setup>
import { cn } from '@/lib/utils';
import { useCarousel } from './useCarousel';

const props = defineProps({
  class: { type: null, required: false },
});

const { orientation } = useCarousel();
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="
      cn(
        'tailwind.config.jsmin-w-0 tailwind.config.jsshrink-0 tailwind.config.jsgrow-0 tailwind.config.jsbasis-full',
        orientation === 'horizontal' ? 'tailwind.config.jspl-4' : 'tailwind.config.jspt-4',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
