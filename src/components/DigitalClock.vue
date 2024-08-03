<script>
export default {
  data() {
    return {
      time: this.digitalClock(),
    };
  },
  methods: {
    digitalClock() {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      // hours + ':' + minutes + ':' + seconds;
      this.time = `${hours}:${minutes}:${seconds}`;
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
    this.interval = setInterval(this.digitalClock, 1000);
  },
};
</script>
<template>
  <p>Текущее время: {{ time }}</p>
</template>