<template>
  <div>
    <h1>ZenCal</h1>

    <img
      src="https://media.istockphoto.com/photos/yin-yang-great-ultimate-chinese-medicine-painting-picture-id537282780?k=6&m=537282780&s=612x612&w=0&h=fFmAyyuzguP3h0dAFJAMMQrLrV9ETluvzGX4potEXB8="
      alt
    />

    <h2>Need to sign up?</h2>
    <h3
      class="toggle"
      :class="mode == 'Sign Up' ? 'text-blue-400' : 'text-gray-200'"
      @click="mode = 'Sign Up'"
    >
      (Do it.)
    </h3>

    <form @submit.prevent="submit">
      <input
        class="email"
        type="text"
        name="email"
        v-model="email"
        placeholder="email"
      />
      <input
        class="password"
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      />
      <input
        class="signup"
        :class="mode == 'Welcome'"
        type="submit"
        :value="mode"
      />
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
        password: "",
      },
      mode: "Welcome",
    };
  },
  methods: {
    async submit() {
      if (this.mode == "Welcome") {
        await auth.signInWithEmailAndPassword(this.email, this.password);
      } else {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
      }

      this.$router.push({ name: "Calendar" });
    },
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
  margin: 2rem;
  font-size: 60px;
}

h2 {
  margin-top: 2rem;
  font-size: 18px;
}

h3 {
  margin-bottom: 2rem;
}

.toggle:hover {
  font-size: 20px;
  color: #cdacbe;
}

form {
  margin: 1rem auto;
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
.submit:hover {
  color: #cdacbe;
  font-size: 18px;
}
img {
  width: 20%;

  -webkit-animation: swirl-in-fwd 2s ease-out both;
  animation: swirl-in-fwd 2s ease-out both;
}

@-webkit-keyframes swirl-in-fwd {
  0% {
    -webkit-transform: rotate(-540deg) scale(0);
    transform: rotate(-540deg) scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}
@keyframes swirl-in-fwd {
  0% {
    -webkit-transform: rotate(-540deg) scale(0);
    transform: rotate(-540deg) scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}
</style>
