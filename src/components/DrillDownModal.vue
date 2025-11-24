<template>
  <div class="drill-down-overlay" @click="close">
    <div class="drill-down-content" @click.stop>
      <div class="drill-down-header">
        <h2>{{ capitalize(type) }}</h2>
        <button class="close-btn" @click="close">×</button>
      </div>

      <div v-if="loading" class="loading">Loading {{ type }}...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="drill-down-body">
        <div v-if="items.length === 0" class="empty">
          No {{ type }} available
        </div>
        <div v-else class="items-grid">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="item-card"
          >
            <h3>{{ getItemName(item) }}</h3>
            <div class="item-details">
              <div
                v-for="(value, key) in getItemDetails(item)"
                :key="key"
                class="detail-row"
              >
                <span class="detail-label">{{ formatLabel(key) }}:</span>
                <span class="detail-value">{{ formatValue(value) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getCharacter,
  getStarship,
  getVehicle,
  getSpecies,
  fetchMultipleResources
} from '../services/swapi'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['characters', 'starships', 'vehicles', 'species'].includes(value)
  },
  urls: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])

const items = ref([])
const loading = ref(true)
const error = ref(null)

const detailFields = {
  characters: ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year'],
  starships: ['name', 'model', 'manufacturer', 'length', 'crew', 'passengers', 'starship_class'],
  vehicles: ['name', 'model', 'manufacturer', 'length', 'crew', 'passengers', 'vehicle_class'],
  species: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'language', 'homeworld']
}

onMounted(async () => {
  await loadItems()
})

async function loadItems() {
  if (!props.urls || props.urls.length === 0) {
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    const data = await fetchMultipleResources(props.urls)
    items.value = data.filter(item => item !== null)
  } catch (err) {
    error.value = `Failed to load ${props.type}. Please try again.`
    console.error(err)
  } finally {
    loading.value = false
  }
}

function getItemName(item) {
  return item.name || 'Unknown'
}

function getItemDetails(item) {
  const fields = detailFields[props.type] || []
  const details = {}
  
  fields.forEach(field => {
    if (item[field] !== undefined && item[field] !== null && item[field] !== '') {
      details[field] = item[field]
    }
  })

  return details
}

function formatLabel(key) {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatValue(value) {
  if (value === 'n/a' || value === 'unknown' || value === 'none') {
    return 'N/A'
  }
  return value
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function close() {
  emit('close')
}
</script>

<style scoped>
.drill-down-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
  overflow-y: auto;
}

.drill-down-content {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border: 2px solid #ffd700;
  border-radius: 12px;
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.drill-down-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #444;
}

.drill-down-header h2 {
  color: #ffd700;
  font-size: 2rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 2rem;
  color: #fff;
}

.error {
  color: #ff6b6b;
}

.drill-down-body {
  margin-top: 1rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item-card {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.item-card:hover {
  border-color: #ffd700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}

.item-card h3 {
  color: #ffd700;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.detail-label {
  color: #aaa;
  font-weight: 500;
}

.detail-value {
  color: #fff;
  text-align: right;
  flex: 1;
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
  }

  .drill-down-header h2 {
    font-size: 1.5rem;
  }
}
</style>

