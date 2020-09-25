<template>
  <div>
    <nav>
      <router-link class="create" to="/create">Create</router-link>
      <router-link class="calendar" to="/calendar">Calendar</router-link>
      <button @click="logout">logout</button>
    </nav>
    <h1 @click="console()">Upcoming</h1>
    <section class="view-all">
      <div class="events">
        <h2>events</h2>
        <div class="event" v-for="event in $store.state.events" :key="event.id">
          <h3>{{ event.name }}</h3>
          <p>{{ event.date.toDate().toLocaleDateString() }}</p>
          <p>{{ event.time }}</p>
          <p>{{ event.location }}</p>
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div class="tasks">
        <h2>tasks</h2>
        <div class="task" v-for="task in $store.state.tasks" :key="task.id">
          <h3>{{ task.task }}</h3>
          <p>{{ task.date.toDate().toLocaleDateString() }}</p>
          <p>{{ task.time }}</p>
          <p>{{ task.notes }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  methods: {
    async logout() {
      await auth.signOut();
      this.$router.push({ name: "Welcome" });
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
.create {
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
.calendar {
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}
.calendar:hover {
  color: #cdacbe;
  font-size: 28px;
}
button {
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
  margin-top: 4rem;
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
