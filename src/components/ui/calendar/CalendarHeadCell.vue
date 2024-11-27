<script setup>
import { cn } from '@/lib/utils';
import { CalendarHeadCell, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
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
  <CalendarHeadCell
    :class="
      cn(
        'tailwind.config.jsw-9 tailwind.config.jsrounded-md tailwind.config.jstext-[0.8rem] tailwind.config.jsfont-normal tailwind.config.jstext-muted-foreground',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
