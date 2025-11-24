<template>
  <div class="loading-spinner">
    <div class="stars-container">
      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
      <div class="star star-4"></div>
    </div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  min-height: 200px;
}

.stars-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: pulseStar 1.2s ease-in-out infinite;
  transform-origin: center;
}

.star::before,
.star::after {
  content: '';
  position: absolute;
  background: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

.star::before {
  width: 100%;
  height: 3px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-radius: 2px;
}

.star::after {
  width: 3px;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  border-radius: 2px;
}

.star-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 0s;
}

.star-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation-delay: 0.3s;
}

.star-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 0.6s;
}

.star-4 {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation-delay: 0.9s;
}

.loading-message {
  margin-top: 1.5rem;
  color: #ffd700;
  font-size: 1.1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulseStar {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.7) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) rotate(90deg);
  }
}

.star::before,
.star::after {
  transition: box-shadow 0.3s ease;
}

.star:nth-child(1)::before,
.star:nth-child(1)::after {
  animation: glowPulse 1.2s ease-in-out infinite 0s;
}

.star:nth-child(2)::before,
.star:nth-child(2)::after {
  animation: glowPulse 1.2s ease-in-out infinite 0.3s;
}

.star:nth-child(3)::before,
.star:nth-child(3)::after {
  animation: glowPulse 1.2s ease-in-out infinite 0.6s;
}

.star:nth-child(4)::before,
.star:nth-child(4)::after {
  animation: glowPulse 1.2s ease-in-out infinite 0.9s;
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.6);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}
</style>

