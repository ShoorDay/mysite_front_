<template>
  <div class="loading-items">
    <div class="loading-item loading-item1"></div>
    <div class="loading-item loading-item2"></div>
    <div class="loading-item loading-item3"></div>
    <div class="loading-item loading-item4"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingIcon"
};
</script>

<style lang="stylus">
.loading-items {
  width: 30px;
  height: 30px;
  position: relative;
  animation: rotation 1s infinite;
}

.loading-item {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  position: absolute;
}

.loading-item1 {
  left: 0;
  background-color: #5C6BC0;
}

.loading-item2 {
  right: 0;
  background-color: #8BC34A;
}

.loading-item3 {
  bottom: 0;
  background-color: #FFB74D;
}

.loading-item4 {
  bottom: 0;
  right: 0;
  background-color: #F44336;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading-item1 {
  animation: loading-animation-loading-item1 2s linear 0s infinite normal;
}

@keyframes loading-animation-loading-item1 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, 18px);
  }

  50% {
    transform: translate(18px, 18px);
  }

  75% {
    transform: translate(18px, 0);
  }
}

.loading-item2 {
  animation: loading-animation-loading-item2 2s linear 0s infinite normal;
}

@keyframes loading-animation-loading-item2 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-18px, 0);
  }

  50% {
    transform: translate(-18px, 18px);
  }

  75% {
    transform: translate(0, 18px);
  }
}

.loading-item3 {
  animation: loading-animation-loading-item3 2s linear 0s infinite normal;
}

@keyframes loading-animation-loading-item3 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(18px, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -18px);
  }
}

.loading-item4 {
  animation: loading-animation-loading-item4 2s linear 0s infinite normal;
}

@keyframes loading-animation-loading-item4 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -18px);
  }

  50% {
    transform: translate(-18px, -18px);
  }

  75% {
    transform: translate(-18px, 0);
  }
}
</style>
