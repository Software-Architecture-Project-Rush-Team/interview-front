<script setup>
import { cn } from '@/lib/utils';
import { CalendarCell, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  date: { type: null, required: true },
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
  <CalendarCell
    :class="
      cn(
        'tailwind.config.jsrelative tailwind.config.jsh-9 tailwind.config.jsw-9 tailwind.config.jsp-0 tailwind.config.jstext-center tailwind.config.jstext-sm focus-within:tailwind.config.jsrelative focus-within:tailwind.config.jsz-20 [&:has([data-selected])]:tailwind.config.jsrounded-md [&:has([data-selected])]:tailwind.config.jsbg-accent [&:has([data-selected][data-outside-view])]:tailwind.config.jsbg-accent/50',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
