<template>
  <button class="drill-down-btn" @click="$emit('click')">
    <span class="btn-title">{{ title }}</span>
    <span class="btn-count">{{ count }}</span>
  </button>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

defineEmits(['click'])
</script>

<style scoped>
.drill-down-btn {
  padding: 1rem;
  background: linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%);
  border: 2px solid #444;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.drill-down-btn:hover {
  border-color: #ffd700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.btn-title {
  font-weight: bold;
  font-size: 1rem;
}

.btn-count {
  font-size: 0.85rem;
  color: #ffd700;
}
</style>

