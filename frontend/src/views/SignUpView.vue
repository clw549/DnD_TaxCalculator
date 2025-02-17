<template>
  <div class="signup">
    <SignUp/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'SignUpView',
  components: {
    SignUp
  }
}
</script>
