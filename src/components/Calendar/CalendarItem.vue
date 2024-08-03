<script setup>
defineProps({
  iteration: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <li>{{ iteration }}</li>
</template>

<style lang="scss" scoped>
li:not(.blank) {
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px 15px;
  color: wheat;
}
</style>