<script setup>
import { cn } from '@/lib/utils';
import { MenubarItem, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  inset: { type: Boolean, required: false },
});

const emits = defineEmits(['select']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <MenubarItem
    v-bind="forwarded"
    :class="
      cn(
        'tailwind.config.jsrelative tailwind.config.jsflex tailwind.config.jscursor-default tailwind.config.jsselect-none tailwind.config.jsitems-center tailwind.config.jsrounded-sm tailwind.config.jspx-2 tailwind.config.jspy-1.5 tailwind.config.jstext-sm tailwind.config.jsoutline-none focus:tailwind.config.jsbg-accent focus:tailwind.config.jstext-accent-foreground data-[disabled]:tailwind.config.jspointer-events-none data-[disabled]:tailwind.config.jsopacity-50',
        inset && 'tailwind.config.jspl-8',
        props.class,
      )
    "
  >
    <slot />
  </MenubarItem>
</template>
