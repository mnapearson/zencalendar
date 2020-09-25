<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <nav>
      <div class="scene">
        <a href="https://celestial-weather.netlify.app">
          <div class="cube">
            <div class="cube-face cube-face-front">
              <img
                src="https://img2.pngio.com/test-your-knowledge-5-little-known-facts-about-the-sistine-chapel-sistine-chapel-png-975_648.png"
                alt="sistine-chapel"
                height="50px"
                width="50px"
                id="cube-image"
              />
            </div>
            <div class="cube-face cube-face-back">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Venus_botticelli_detail.jpg/1920px-Venus_botticelli_detail.jpg"
                alt="face of venus"
                height="50px"
                width="50px;"
                id="cube-image"
              />
            </div>
            <div class="cube-face cube-face-left">
              <img
                src="https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvYXNzZXRzLzIxZjliM2QwLTc5Y2QtNGFmMS05NDc4LTMwZjBjYjkzNmMwNGJmYTVjNmI5M2NjMjgwNDg0YV9Gb3JiaWRkZW5fZnJ1aXQuanBnIl0sWyJwIiwiY29udmVydCIsIi1hdXRvLW9yaWVudCAiXSxbInAiLCJ0aHVtYiIsIjExNTJ4NzY4Kzc3KzIiXSxbInAiLCJjb252ZXJ0IiwiLXF1YWxpdHkgODEgLWF1dG8tb3JpZW50Il0sWyJwIiwidGh1bWIiLCI2MDB4PiJdXQ/Forbidden_fruit.jpg"
                alt="adam and eve"
                height="50px"
                width="50px;"
                id="cube-image"
              />
            </div>
            <div class="cube-face cube-face-right">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Michelangelo%2C_giudizio_universale%2C_dettagli_33.jpg/330px-Michelangelo%2C_giudizio_universale%2C_dettagli_33.jpg"
                alt="last judgment"
                height="50px"
                width="50px;"
                id="cube-image"
              />
            </div>
            <div class="cube-face cube-face-top">
              <img
                src="https://i.pinimg.com/originals/05/14/7d/05147d70df9f77b36aa897bde585826c.jpg"
                alt="sun and moon"
                height="50px"
                width="50px;"
                id="cube-image"
              />
            </div>
            <div class="cube-face cube-face-bottom">
              <img
                src="https://i.pinimg.com/originals/ee/ca/b5/eecab574e99361f679c12dd6bbfb3aa8.jpg"
                alt="the flood"
                height="50px"
                width="50px;"
                id="cube-image"
              />
            </div>
          </div>
        </a>
      </div>
      <router-link class="create" to="/create">Create</router-link>
      <button @click="logout">logout</button>
    </nav>
    <h1>Calendar</h1>
    <div class="calendar">
      <SingleDatePicker @selectDate="selectDate" />
    </div>
    <div class="today">
      <div id="events-container">
        <h2>Events</h2>
        <div
          class="event"
          v-for="event in eventsOnSelectedDate"
          :key="event.id"
        >
          <h3>{{ event.name }}</h3>
          <h3>{{ event.time }}</h3>
          <h3>{{ event.location }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div id="tasks-container">
        <h2>Tasks</h2>
        <div class="task" v-for="task in tasksOnSelectedDate" :key="task.id">
          <h3>{{ task.task }}</h3>
          <h3>{{ task.time }}</h3>
          <p>{{ task.notes }}</p>
        </div>
      </div>
    </div>
    <div class="view-all">
      <router-link class="view" to="/view">View All</router-link>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import SingleDatePicker from "vue-single-date-picker";

export default {
  components: {
    SingleDatePicker
  },
  data() {
    return {
      date: null
    };
  },
  methods: {
    async logout() {
      await auth.signOut();
      this.$router.push({ name: "Welcome" });
    },
    selectDate(date) {
      this.date = date;
    },
    viewDay() {}
  },
  computed: {
    eventsOnSelectedDate() {
      const allEvents = this.$store.state.events;

      return allEvents.filter(event => {
        if (!this.date || !event.date) return false;

        const eventDate = event.date.toDate();

        return (
          this.date.year == eventDate.getFullYear() &&
          this.date.month == eventDate.getMonth() &&
          this.date.date == eventDate.getDate()
        );
      });
    },
    tasksOnSelectedDate() {
      const allTasks = this.$store.state.tasks;
      return allTasks.filter(task => {
        if (!this.date || !task.date) return false;

        const taskDate = task.date.toDate();

        return (
          this.date.year == taskDate.getFullYear() &&
          this.date.month == taskDate.getMonth() &&
          this.date.date == taskDate.getDate()
        );
      });
    }
  }
};
</script>

<style scoped>
nav {
  margin: 1rem;
  display: flex;
  justify-content: space-between;
}

.scene {
  margin-top: 1rem;

  display: flex;
  width: 25px;
  height: 25px;
  perspective: 2400px;
}

.cube {
  width: 50px;
  height: 50px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(30deg) rotateY(30deg);
  -webkit-transform-style: preserve-3d;
  -webkit-animation: rotatecube 40s infinite;

  -moz-transform-style: preserve-3d;
  -moz-animation: rotatecube 40s infinite;
}

@-webkit-keyframes rotatecube {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(360deg) rotateZ(90deg);
  }
  25% {
    -webkit-transform: rotateX(90deg) rotateY(270deg) rotateZ(180deg);
  }
  50% {
    -webkit-transform: rotateX(180deg) rotateY(180deg) rotateZ(0deg);
  }
  75% {
    -webkit-transform: rotateX(270deg) rotateY(90deg) rotateZ(360deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(0deg) rotateZ(270deg);
  }
}

@-moz-keyframes rotatecube {
  0% {
    -moz-transform: rotateX(0deg) rotateY(360deg) rotateZ(90deg);
  }
  25% {
    -moz-transform: rotateX(90deg) rotateY(270deg) rotateZ(180deg);
  }
  50% {
    -moz-transform: rotateX(180deg) rotateY(180deg) rotateZ(0deg);
  }
  75% {
    -moz-transform: rotateX(270deg) rotateY(90deg) rotateZ(360deg);
  }
  100% {
    -moz-transform: rotateX(360deg) rotateY(0deg) rotateZ(270deg);
  }
}

.cube-face {
  width: inherit;
  height: inherit;
  position: absolute;
  opacity: 0.7;
}

.cube-face-front {
  transform: translate3d(0, 0, 25px);
}

.cube-face-back {
  transform: rotateY(180deg) translate3d(0, 0, 25px);
}

.cube-face-left {
  transform: rotateY(-90deg) translate3d(0, 0, 25px);
}

.cube-face-right {
  transform: rotateY(90deg) translate3d(0, 0, 25px);
}

.cube-face-top {
  transform: rotateX(90deg) translate3d(0, 0, 25px);
}

.cube-face-bottom {
  transform: rotateX(-90deg) translate3d(0, 0, 25px);
}

* {
  margin: 0 auto;
  max-width: 750px;
  font-family: "Permanent Marker", cursive;
  color: black;
}
@import "~vue-single-date-picker/dist/vue-single-date-picker.css";

.single-date-picker__calendar-view {
  max-width: 400px;
}

.create {
  margin: 0 8rem;
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}

.create:hover {
  color: #cdacbe;
  font-size: 28px;
}

button {
  margin: 0 8rem;
  border: none;
  outline: none;
  background: white;
  font-size: 24px;
}

button:hover {
  color: #cdacbe;
  font-size: 28px;
}

h1 {
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 45px;
}

h2 {
  font-size: 32px;
  margin: 2rem;
}

.today {
  margin-top: 3rem;
  flex-direction: row;
  justify-content: left;
}

#events-container {
  margin: 2rem;
  display: flex;
  justify-content: left;
  flex-direction: row;
}

#tasks-container {
  margin: 2rem;
  display: flex;
  justify-content: left;
  flex-direction: row;
}

.view-all {
  margin: 2rem;
}

.view {
  outline: none;
  border: none;
  text-decoration-line: none;
  font-size: 20px;
}
.view:hover {
  color: #cdacbe;
  font-size: 24px;
}
</style>
