<template>
  <div>
    <p class="red">{{ message }}</p>
    <p>{{ reversedMessage }}</p>
    <p>{{ this.$store.state }}</p>
    <p>{{ totalFiction }}</p>
    <p>{{ getBook }}</p>
    <p>icon: <i class="fi-clock"></i></p>
    <p><img src="../assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg"></p>
    <p><img src="~assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg"></p>
    <p><img src="~assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg"></p>
    <p><img src="~static/sample-1.jpg"></p>
    <p><img src="static/sample-2.jpg"></p>
    <p><img src="/static/sample-3.jpg"></p>

    <div class="image-background" :style="{'background-image': 'url(' + require('../assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg') + ')'}"></div>

    <!--<div class="image-background" style="background-image: url('../src/assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg');"></div>-->
  </div>
</template>

<script>
// import Image from 'assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'
// import Sample from 'assets/javascripts/modules/sample/index'
export default {
  name: 'home',

  data () {
    return {
      message: 'Hello World'
    }
  },

  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    },

    totalFiction () {
      return this.$store.getters.countFiction
    },

    getBook () {
      return this.$store.getters.getBookById(2)
    }
  },

  // async mounted () {
  //   // Async sample.
  //   async function example3 () {
  //     return 'example 3'
  //   }
  //   console.log(await example3())

  //   let s = new Sample()
  //   console.log(await s.multiply(2)) // return 4
  // }
}
</script>

<style>
  .red {
    color: red;
  }

  .image-background {
    /*background-image: url('~assets/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg');*/
    border: 1px solid red;
    width: 600px;
    height: 600px;
  }
</style>
