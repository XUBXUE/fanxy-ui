<script lang="ts">
export default { name: "f-list" };
</script>

<template>
  <f-button @click="add">add</f-button>
  <f-button @click="random">random</f-button>
  <div ref="list" class="list">
    <div class="item" v-for="i in datalist" :key="i">{{ i }}</div>
  </div>
</template>

<script setup lang="ts">
import { onUpdated, ref } from "vue";
const datalist = ref([0, 1, 2, 3, 4]);
const list = ref<HTMLDivElement>();
const prevNodeRect = ref<Map<HTMLElement, DOMRect>>(new Map());
const currentNodeRect = ref<Map<HTMLElement, DOMRect>>(new Map());

const createChildNodeRectMap = (nodes: HTMLElement | null | undefined) => {
  if (!nodes) {
    return new Map();
  }
  const elements = Array.from(nodes.children) as HTMLElement[];
  return new Map(elements.map((item) => [item, item.getBoundingClientRect()]));
};

const add = () => {
  datalist.value.unshift(datalist.value.length);
  prevNodeRect.value = createChildNodeRectMap(list.value);
};
const random = () => {
  datalist.value.sort((a, b) => Math.random() - 0.5);
  prevNodeRect.value = createChildNodeRectMap(list.value);
};

onUpdated(() => {
  currentNodeRect.value = createChildNodeRectMap(list.value);
  prevNodeRect.value.forEach((prevRect, node) => {
    const currentRect = currentNodeRect.value.get(node);
    const invert = {
      left: prevRect.left - currentRect!.left,
      top: prevRect.top - currentRect!.top,
    };
    const keyframes = [
      {
        transform: `translate(${invert.left}px, ${invert.top}px)`,
      },
      {
        transform: `translate(0, 0)`,
      },
    ];
    node.animate(keyframes, {
      duration: 800,
      easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
    });
  });
});
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin: 100px auto;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid pink;
  background-color: #fff;
}
</style>
