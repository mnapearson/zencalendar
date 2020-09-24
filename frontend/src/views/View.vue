<template>
  <div>
    <nav>
      <router-link class="create" to="/create">Create</router-link>
      <router-link class="calendar" to="/calendar">Calendar</router-link>
      <button @click="logout">logout</button>
    </nav>
    <h1>Upcoming</h1>
    <section class="view-all">
      <div>
        <h2>events</h2>

        <div class="event" v-for="event in $store.state.events" :key="event.id">
          <h3>{{ event.name }}</h3>
          <p>{{ event.date }}</p>
          <p>{{ event.time }}</p>
          <p>{{ event.location }}</p>
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div>
        <h2>tasks</h2>
        <div class="task" v-for="task in $store.state.tasks" :key="task.id">
          <h3>{{ task.task }}</h3>
          <p>{{ task.date }}</p>
          <p>{{ task.time }}</p>
          <p>{{ task.notes }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: null
    };
  },
  methods: {
    logout() {
      console.log("logout");
      this.$router.push({ name: "Welcome" });
    },
    computed: {
      eventsDate() {
        const eventDate = event.date.toDate();

        return (
          this.date.year == eventDate.getFullYear() &&
          this.date.month == eventDate.getMonth() &&
          this.date.date == eventDate.getDate()
        );
      }
    }
  }
};
</script>

<style scoped>
.create {
  margin: 0 8rem;
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}
.calendar {
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}
button {
  margin: 0 8rem;
  border: none;
  outline: none;
  background: white;
  font-size: 24px;
}
h1 {
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 45px;
}
h2 {
  font-size: 30px;
}

.view-all {
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
}

.event {
  margin: 2rem;
}

.task {
  margin: 2rem;
}
</style>