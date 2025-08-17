<template>
  <div mt-4 bg="emerald/5" p4 pb3 text-blue rounded class="tip-box" flex="~ inline col gap3">
    <div text-blue flex items-center gap-1 op80>
      <div i-carbon-information />
      <div leading-1>
        資訊
      </div>
    </div>
    <slot />
  </div>
</template>

<style>
.tip-box {
  --prism-background: transparent;
}
.tip-box > p {
  margin: 0 !important;
}
</style>
