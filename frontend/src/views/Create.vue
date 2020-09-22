<template>
  <div>
    <router-link class="calendar" to="/calendar">Calendar</router-link>
    <button @click="logout">logout</button>
    <h1>Create</h1>
    <h2>New Event</h2>
    <form @submit.prevent="submit">
      <input v-model="event.name" placeholder="Name" />
      <input v-model="event.date" placeholder="Date" />
      <input v-model="event.location" placeholder="Location" />
      <input v-model="event.description" placeholder="Description" />
      <div class="flex justify-end">
        <input class="save" type="submit" value="Save Event" />
      </div>
    </form>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";

export default {
  data() {
    return {
      event: {
        name: "",
        date: "",
        location: "",
        description: ""
      }
    };
  },
  methods: {
    submit() {
      db.collection("events").add({
        ...this.event,
        userId: this.$store.state.user.uid,
        createdAt: new Date()
      });
      alert("Event Saved");
    },
    async logout() {
      await auth.signOut();
      this.$router.push({ name: "Welcome" });
    }
  }
};
</script>

<style scoped>
.calendar {
  margin: 0 10rem;
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}

button {
  margin: 0 10rem;
  border: none;
  outline: none;
  background: white;
  font-size: 24px;
}

form {
  margin-top: 2rem;
}

input {
  padding: 0.5rem;
}

.save {
  border: none;
  outline: none;
  border-radius: 10px;
  color: white;
  background: black;
  padding: 0.2rem 0.8rem;
}
</style>
