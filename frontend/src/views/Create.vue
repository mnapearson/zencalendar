<template>
  <div>
    <router-link class="calendar" to="/calendar">Calendar</router-link>
    <button @click="logout">logout</button>
    <h1>Create</h1>
    <div class="create-forms">
      <div class="new-event">
        <h2>New Event</h2>
        <form ref="event" @submit.prevent="submit">
          <input v-model="event.name" placeholder="Name" />
          <datepicker
            class="event-date"
            v-model="event.date"
            name="event-date"
            placeholder="date"
          ></datepicker>
          <input v-model="event.location" placeholder="Location" />
          <textarea v-model="event.description" placeholder="Description" />
          <div>
            <button class="save" @click="submitEvent">Save</button>
          </div>
        </form>
      </div>
      <div class="new-task">
        <h2>New Task</h2>
        <form ref="task" @submit.prevent="submit">
          <input v-model="task.task" placeholder="Task" />
          <datepicker
            class="task-deadline"
            v-model="task.deadline"
            name="task-deadline"
            placeholder="deadline"
          ></datepicker>
          <textarea v-model="task.notes" placeholder="notes" />
          <div>
            <button class="save" @click="submitTask">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      event: {
        name: "",
        date: "",
        location: "",
        description: "",
      },
      task: {
        task: "",
        deadline: "",
        notes: "",
      },
    };
  },
  methods: {
    submitEvent() {
      db.collection("events").add({
        ...this.event,
        userId: this.$store.state.user.uid,
        createdAt: new Date(),
      });
      alert("Event Saved");
      this.$refs.event.reset();
    },
    submitTask() {
      db.collection("tasks").add({
        ...this.task,
        userId: this.$store.state.user.uid,
        createdAt: new Date(),
      });
      alert("Task Saved");
      this.$refs.task.reset();
    },
    async logout() {
      await auth.signOut();
      this.$router.push({ name: "Welcome" });
    },
  },
  components: {
    Datepicker,
  },
};
</script>

<style scoped>
* {
  margin: 0 auto;
  font-family: "Permanent Marker", cursive;
  color: black;
}

h1 {
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 45px;
}
.calendar {
  padding-right: 5rem;
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}

button {
  padding-left: 5rem;
  border: none;
  outline: none;
  background: white;
  font-size: 24px;
}

.create-forms {
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.new-event {
  margin-right: 0;
}

.new-task {
  margin-left: 0;
}

input {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-date {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.task-deadline {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.save {
  margin: 1rem;
  padding: 0 1rem;
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 10px;
  color: white;
  background: black;
}
</style>
