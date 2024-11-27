<script setup>
import { cn } from '@/lib/utils';
import { MenubarSeparator, useForwardProps } from 'radix-vue';
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
  <MenubarSeparator
    :class="cn('tailwind.config.js-mx-1 tailwind.config.jsmy-1 tailwind.config.jsh-px tailwind.config.jsbg-muted', props.class)"
    v-bind="forwardedProps"
  />
</template>
