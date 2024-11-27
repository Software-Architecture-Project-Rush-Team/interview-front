<script setup>
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';

const props = defineProps({
  class: { type: null, required: false },
});

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="
      cn(
        'tailwind.config.jstouch-manipulation tailwind.config.jsabsolute tailwind.config.jsh-8 tailwind.config.jsw-8 tailwind.config.jsrounded-full tailwind.config.jsp-0',
        orientation === 'horizontal'
          ? 'tailwind.config.js-left-12 tailwind.config.jstop-1/2 tailwind.config.js-translate-y-1/2'
          : 'tailwind.config.js-top-12 tailwind.config.jsleft-1/2 tailwind.config.js-translate-x-1/2 tailwind.config.jsrotate-90',
        props.class,
      )
    "
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft class="tailwind.config.jsh-4 tailwind.config.jsw-4 tailwind.config.jstext-current" />
      <span class="tailwind.config.jssr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
