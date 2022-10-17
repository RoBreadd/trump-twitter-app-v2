<script>
export default {
  props: ["active"],
};
</script>

<template>
  <svg
    @click="$emit(`onClick`)"
    class="mx-[5px]"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
  >
    <circle
      class="transition-colors fill-transparent hover:fill-[#474747]"
      :class="active ? `fill-white hover:fill-white` : ``"
      cx="12.5"
      cy="12.5"
      r="11.5"
      stroke="white"
      stroke-width="2"
      fill="none"
    ></circle>
  </svg>
</template>
