<script setup lang="ts">
import { DataSet, Timeline } from 'vis-timeline/standalone'
import { onMounted, ref, watch } from 'vue'
import pullRequestsData from '../data/ilyaliao-vueuse-pull-requests.json'

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const items = new DataSet(
    pullRequestsData.map((pr, index) => ({
      id: index,
      type: 'box',
      className: 'px2 rounded-lg! bg-blue:20! text-blue! border-blue:50! border-dashed!',
      title: pr.message,
      content: `#${pr.number}`,
      start: new Date(pr.date),
    })),
  )

  const timeline = new Timeline(el.value, null, {
    stack: true,
    height: 350,
    width: '100%',
    horizontalScroll: false,
    verticalScroll: false,
    zoomable: false,
    moveable: false,
    margin: {
      item: {
        horizontal: 0,
      },
    },
    tooltip: {
      followMouse: true,
      overflowMethod: 'cap',
      delay: 0,
    },
  })
  timeline.setItems(items)

  timeline.redraw()
  // @ts-expect-error missing type
  watch([$clicks, $page], () => {
    timeline.redraw()
  })
})
</script>

<template>
  <div v-click mb-3 flex="~ col">
    <div scale-50 origin-left-top relative mb--42>
      <div ref="el" absolute h-350px w-1800px />
    </div>
  </div>
</template>

<style>
.vis-timeline {
  border: 0 !important;
}

.vis-labelset .vis-label,
.vis-time-axis .vis-text {
  color: inherit;
  opacity: 0.8;
}

.vis-grid,
.vis-label,
.vis-group,
.vis-panel {
  border-color: #333 !important;
}

.vis-tooltip {
  --at-apply: 'bg-black! text-blue! rounded! border! border-gray:20! shadow-2xl! px-3! py-2!';
}
</style>
