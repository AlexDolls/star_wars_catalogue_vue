<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="close">×</button>
      
      <div class="modal-header">
        <h2>{{ movie.title }}</h2>
        <span class="episode-badge">Episode {{ movie.episode_id }}</span>
      </div>

      <div class="modal-body">
        <div class="info-section">
          <div class="info-item">
            <span class="info-label">Release Date:</span>
            <span class="info-value">{{ formatDate(movie.release_date) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Director:</span>
            <span class="info-value">{{ movie.director }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Producer:</span>
            <span class="info-value">{{ movie.producer }}</span>
          </div>
        </div>

        <div class="opening-crawl-section">
          <h3>Opening Crawl</h3>
          <p>{{ movie.opening_crawl }}</p>
        </div>

        <div class="drill-downs">
          <DrillDownButton
            title="Characters"
            :count="movie.characters?.length || 0"
            @click="openDrillDown('characters', movie.characters)"
          />
          <DrillDownButton
            title="Starships"
            :count="movie.starships?.length || 0"
            @click="openDrillDown('starships', movie.starships)"
          />
          <DrillDownButton
            title="Vehicles"
            :count="movie.vehicles?.length || 0"
            @click="openDrillDown('vehicles', movie.vehicles)"
          />
          <DrillDownButton
            title="Species"
            :count="movie.species?.length || 0"
            @click="openDrillDown('species', movie.species)"
          />
        </div>
      </div>
    </div>

    <DrillDownModal
      v-if="drillDownType"
      :type="drillDownType"
      :urls="drillDownUrls"
      @close="closeDrillDown"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DrillDownButton from './DrillDownButton.vue'
import DrillDownModal from './DrillDownModal.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const drillDownType = ref(null)
const drillDownUrls = ref([])

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function openDrillDown(type, urls) {
  drillDownType.value = type
  drillDownUrls.value = urls || []
}

function closeDrillDown() {
  drillDownType.value = null
  drillDownUrls.value = []
}

function close() {
  emit('close')
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    close()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border: 2px solid #ffd700;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.modal-header h2 {
  color: #ffd700;
  font-size: 2rem;
  margin: 0;
  flex: 1;
}

.episode-badge {
  background-color: #ffd700;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #444;
}

.info-label {
  color: #aaa;
  font-weight: 500;
}

.info-value {
  color: #fff;
  text-align: right;
}

.opening-crawl-section {
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border-left: 4px solid #ffd700;
}

.opening-crawl-section h3 {
  color: #ffd700;
  margin-top: 0;
  margin-bottom: 1rem;
}

.opening-crawl-section p {
  color: #ccc;
  line-height: 1.8;
  font-style: italic;
  margin: 0;
  white-space: pre-line;
}

.drill-downs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
  }

  .drill-downs {
    grid-template-columns: 1fr;
  }
}
</style>

