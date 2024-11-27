<script setup>
import { cn } from '@/lib/utils';
import { MenubarRoot, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: false },
  defaultValue: { type: String, required: false },
  dir: { type: String, required: false },
  loop: { type: Boolean, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits(['update:modelValue']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <MenubarRoot
    v-bind="forwarded"
    :class="
      cn(
        'tailwind.config.jsflex tailwind.config.jsh-10 tailwind.config.jsitems-center tailwind.config.jsgap-x-1 tailwind.config.jsrounded-md tailwind.config.jsborder tailwind.config.jsbg-background tailwind.config.jsp-1',
        props.class,
      )
    "
  >
    <slot />
  </MenubarRoot>
</template>
