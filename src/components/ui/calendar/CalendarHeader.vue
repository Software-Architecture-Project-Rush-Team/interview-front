<script setup>
import { cn } from '@/lib/utils';
import { CalendarHeader, useForwardProps } from 'radix-vue';
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
  <CalendarHeader
    :class="
      cn('tailwind.config.jsrelative tailwind.config.jsflex tailwind.config.jsw-full tailwind.config.jsitems-center tailwind.config.jsjustify-between tailwind.config.jspt-1', props.class)
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>
