<template>
  <div>
    <h1>ZenCal</h1>

    <img
      src="https://media.istockphoto.com/photos/yin-yang-great-ultimate-chinese-medicine-painting-picture-id537282780?k=6&m=537282780&s=612x612&w=0&h=fFmAyyuzguP3h0dAFJAMMQrLrV9ETluvzGX4potEXB8="
      alt
    />

    <h2>Need to sign up?</h2>
    <h2
      :class="mode == 'Sign Up' ? 'text-blue-400' : 'text-gray-200'"
      @click="mode = 'Sign Up'"
    >(Do it.)</h2>

    <form @submit.prevent="submit">
      <input class="email" type="text" name="email" v-model="email" placeholder="email" />
      <input
        class="password"
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      />
      <input class="signup" :class="mode == 'Welcome'" type="submit" :value="mode" />
    </form>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "Welcome",

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      mode: "Welcome"
    };
  },
  methods: {
    async submit() {
      if (this.mode == "Welcome") {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.push({ name: "Calendar" });
      } else {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.$router.push({ name: "Calendar" });
      }
    }
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
  margin-top: 5rem;
  font-size: 60px;
}

.stage {
  width: 300px;
  height: 300px;
  perspective: 1200px;
}

.ball .shadow {
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0) 50%
  );
  transform: rotateX(90deg) translateZ(-150px);
  z-index: -1;
}

h2 {
  font-size: 18px;
}

img {
  margin: 2rem;
}

form {
  margin: 4rem auto;
  display: grid;
  grid-template: row;
  row-gap: 2rem;
  position: center;
}

.email {
  border: none;
  outline: none;
  background: white;
  border-bottom: 1px solid black;
}
.password {
  border: none;
  outline: none;
  background: white;
  border-bottom: 1px solid black;
}

.signup {
  border: none;
  border-radius: 10px;
  padding: 0.3rem 0.5rem;
  outline: none;
  background: black;
  color: white;
}

.submit {
  margin-top: 3rem;
  border: none;
  outline: none;
  background: white;
}
img {
  width: 30%;
}
</style>
