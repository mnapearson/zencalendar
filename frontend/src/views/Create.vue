<template>
  <div>
    <router-link class="calendar" to="/calendar">Calendar</router-link>
    <button class="logout" @click="logout">logout</button>
    <h1>Create</h1>
    <div class="create-forms">
      <div class="new-event">
        <h2>New Event</h2>
        <form ref="event" @submit.prevent="">
          <input v-model="event.name" placeholder="Name" />
          <datepicker
            class="event-date"
            v-model="event.date"
            placeholder="date"
          ></datepicker>
          <input v-model="event.location" placeholder="Location" />
          <input v-model="event.time" placeholder="time" />
          <textarea v-model="event.description" placeholder="Description" />
          <div>
            <button class="save" @click="submitEvent">Save</button>
          </div>
        </form>
      </div>
      <div class="new-task">
        <h2>New Task</h2>
        <form ref="task" @submit.prevent="">
          <input v-model="task.task" placeholder="Task" />
          <datepicker
            class="task-date"
            v-model="task.date"
            placeholder="deadline"
          ></datepicker>
          <input v-model="task.time" placeholder="time" />
          <textarea v-model="task.notes" placeholder="notes" />
          <div>
            <button class="save" @click="submitTask">Save</button>
          </div>
        </form>
      </div>
    </div>

    <router-link class="view" to="/view">View All</router-link>
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
        time: "",
        location: "",
        description: ""
      },
      task: {
        task: "",
        date: "",
        time: "",
        notes: ""
      }
    };
  },
  methods: {
    async submitEvent() {
      await db.collection("events").add({
        ...this.event,
        userId: this.$store.state.user.uid,
        createdAt: new Date()
      });

      alert("Event Saved");
    },
    async submitTask() {
      await db.collection("tasks").add({
        ...this.task,
        userId: this.$store.state.user.uid,
        createdAt: new Date()
      });
      alert("Task Saved");
    },
    // async clearTask() {
    //   await this.submitTask();
    //   this.$refs.task.reset();
    // },
    // async clearEvent() {
    //   await this.submitEvent();
    //   this.$refs.event.reset();
    // },
    async logout() {
      await auth.signOut();
      this.$router.push({ name: "Welcome" });
    }
  },
  components: {
    Datepicker
  }
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
.calendar:hover {
  color: #cdacbe;
  font-size: 28px;
}

.logout {
  padding-left: 5rem;
  border: none;
  outline: none;
  background: white;
  font-size: 24px;
}

.logout:hover {
  color: #cdacbe;
  font-size: 28px;
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

.task-date {
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

.save:hover {
  font-size: 18px;
}

.view {
  margin: 4rem;
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
