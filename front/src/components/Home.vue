<template>
  <div>
    <header-bar />

    <div v-if="admin" class="add"><i class="material-icons">note_add</i></div>

    <section>
      <div class="container" data-masonry='{ "itemSelector": ".post", "columnWidth": ".post-sizer", "gutter": 15, "fitWidth": true }'>
        <div class="post-sizer">
        </div>
        <div class="post" v-for="post in posts">
          <div class="title" :style="'background-color: ' + randomColor()">
            <span style="flex: 1; overflow: hidden">{{ post.title }}</span>
            <span v-if="admin" class="cross"><i class="material-icons">close</i></span>
          </div>
          <div class="text" v-html="post.text"></div>
        </div>
      </div>
    </section>

    <footer-bar />
  </div>
</template>

<script>
import axios from 'axios'

import HeaderBar from './Header'
import FooterBar from './Footer'

export default {
  components: {
    HeaderBar, FooterBar
  },
  data: function () {
    return {
      admin: false,
      posts: []
    }
  },

  methods: {
    randomColor () {
      let trans = 1

      let colors = [
        `rgba(7,25,48,${trans})`,
        `rgba(3,77,112,${trans})`,
        `rgba(3,166,148,${trans})`
      ]

      return colors[Math.floor((Math.random() * colors.length))]
    }
  },

  beforeMount () {
    axios.get('/api/admin')
    .then(res => {
      this.admin = res.data.auth
    })
    .catch(err => {
      console.log(err.message)
    })

    this.posts = [
      { title: '1 Céu', text: 'Um Sol<br>Uma Lua<br>Papel...' },
      { title: '2 Noite', text: 'Um Sol<br>Uma Lua<br>Um Sol<br>Uma Lua<br>Borracha...' },
      { title: '3 Hey... Apontador!', text: 'Um Sol<br>Uma Lua<br>Apontador...' },
      {
        title: '4 Hey... Apontador! Hey... Apontador! Hey... Apontador!',
        text: 'Um Sol<br>Uma Lua<br>Apontador...Um Sol<br>Uma Lua<br>Apontador...Um Sol<br>Uma Lua<br>Apontador...Um Sol<br>Uma Lua<br>Apontador...'
      },
      { title: '5 Noite', text: 'Um Sol<br>Uma Lua<br>Um Sol<br>Uma Lua<br>Borracha...' },
      { title: '6 Noite', text: 'Um Sol<br>Uma Lua<br>Um Sol<br>Uma Lua<br>Borracha...' },
      { title: '7 Noite', text: 'Um Sol<br>Uma Lua<br>Um Sol<br>Uma Lua<br>Borracha...' },
      { title: '8 Céu', text: 'Um Sol<br>Uma Lua<br>Papel...' },
      { title: '9 Céu', text: 'Um Sol<br>Uma Lua<br>Papel...' },
      {
        title: '10 Hey... Apontador!',
        text: 'Um Sol<br>Uma Lua<br>Apontador...Um Sol<br>Uma Lua<br>Apontador...Um Sol<br>Uma Lua<br>Apontador...Um Sol<br>Uma Lua<br>Apontador...'
      },
      { title: '11 Céu', text: 'Um Sol<br>Uma Lua<br>Papel...' },
      { title: '12 Noite', text: 'Um Sol<br>Uma Lua<br>Um Sol<br>Uma Lua<br>Borracha...' }
    ]
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  section {
    width: 90%;
    max-width: 60em;
    margin: 10px auto 0;
    padding-bottom: 10px;

    display: flex;
    justify-content: center;
  }

  .container {
    width: 100%;
  }

  .post-sizer { width: 300px }

  .post {
    width: 300px;
    margin-bottom: 15px;
    color: black;
    font-family: 'Roboto', sans-serif;
  }

  .title {
    padding: .75em .5em;
    display: flex;
    overflow-x: hidden;
    font-size: 1.5em;
    color: white;
  }

  .text {
    display: flex;
    padding: 1em .5em;
    justify-content: flex-start;
    font-size: 1.1em;
    line-height: 1.35;
    background-color: rgba(255, 255, 255, 0.95);
  }

  .add {
    position: absolute;
    margin-top: -50px;
    width: 98%;
    text-align: right;
    color: #00C853;
  }
  .add i {
    cursor: pointer;
  }

  .cross {
    margin-left: auto;
    color: #d50000;
  }
  .cross i {
    cursor: pointer;
  }
</style>
