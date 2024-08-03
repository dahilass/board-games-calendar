<script setup>
import moment from "moment";
import createDate from "@/functions/createDate";

// class Calendar {
//   constructor(options) {
//     this.date = options.date;
//     this.month = options.month;
//     this.year = options.year;
//     this.dayOfTheWeek = options.dayOfTheWeek;
//   }
// }
moment.updateLocale("ru");

console.log(
  new Date().toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
  })
);

const currentDate = {
  date: moment().format("DD"),
  month: moment().format("MM"),
  year: moment().format("YYYY"),
  dayOfTheWeek: moment().day(),
  firstDayOfTheMonth() {
    return moment(`${this.year}-${this.month}-01`).day();
  },
  // firstFridayOfTheMonth() {
  //   return (
  //     (5 - this.firstDayOfTheMonth() >= 0
  //       ? 5 - this.firstDayOfTheMonth()
  //       : 5 + 5 - this.firstDayOfTheMonth() + 2) + this.date
  //   );
  // },
};

const nextDate = {
  day: moment().toDate().getDate(),
  month: moment().add(1, "month").toDate().getMonth(),
  year: moment().toDate().getFullYear(),
};

const numberOfDaysInCurrentMonth = extractNumberOfDays(
  moment().add(1, "month").toDate() - moment().toDate()
);
function extractNumberOfDays(date) {
  return Math.round(date / 1000 / 3600 / 24);
}
// defineProps({
//   iteration: {
//     type: Number,
//     required: true,
//   },
// });
const weekTemplate = {
  1: "пн",
  2: "вт",
  3: "ср",
  4: "чт",
  5: "пт",
  6: "сб",
  7: "вс",
};

// :class="{ primary: true, second: item > 10 }"
//:data-first-friday="item === currentDate.firstFridayOfTheMonth() ? '' : null"
</script>

<template>
  <p>Сегодня: {{ createDate() }}</p>
  <ul className="list" v-if="currentDate.firstDayOfTheMonth() === 1">
    <li v-for="day in 7" :key="day">{{ weekTemplate[day] }}</li>
    <li v-for="item in numberOfDaysInCurrentMonth" :key="item">
      {{ item }}
    </li>
  </ul>

  <ul v-else className="list">
    <li v-for="day in 7" :key="day">{{ weekTemplate[day] }}</li>
    <li
      v-for="blankItem of currentDate.firstDayOfTheMonth() - 1"
      :key="blankItem + 'blank'"
    ></li>
    <li
      v-for="item in numberOfDaysInCurrentMonth"
      @click="
        console.log(
          createDate(item, currentDate.month, currentDate.year) <
            createDate(currentDate.date, currentDate.month, currentDate.year)
        )
      "
      :key="item + 'number'"
      :data-today="item == currentDate.date ? '' : null"
      :class="{
        xdd:
          createDate(item, currentDate.month, currentDate.year) <
          createDate(currentDate.date, currentDate.month, currentDate.year),
        item,
      }"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template: auto / repeat(7, 1fr);
  gap: 0.5rem;
}
li {
  position: relative;
}
li:not(.blank) {
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px 15px;
  color: wheat;
  font-size: 1.25rem;
}
li[data-today] {
  color: cadetblue;
  border: 2px solid cadetblue;
  border-radius: 4px;
}
li[data-first-friday] {
  color: coral;
  border: 2px solid coral;
  border-radius: 4px;
}
li[data-first-friday][data-today] {
  background-color: yellow;
}
li.xdd {
  color: whitesmoke;
}
.xdd::after,
.xdd::before {
  content: "";
  position: absolute;
  width: 2%;
  height: 100%;
  background-color: coral;
  top: 0;
}
.xdd::before {
  rotate: 45deg;
}
.xdd::after {
  rotate: -45deg;
}
</style>

