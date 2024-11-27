<script setup>
import { cn } from '@/lib/utils';
import { useCarousel } from './useCarousel';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  class: { type: null, required: false },
});

const { carouselRef, orientation } = useCarousel();
</script>

<template>
  <div ref="carouselRef" class="tailwind.config.jsoverflow-hidden">
    <div
      :class="
        cn(
          'tailwind.config.jsflex',
          orientation === 'horizontal' ? 'tailwind.config.js-ml-4' : 'tailwind.config.js-mt-4 tailwind.config.jsflex-col',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
