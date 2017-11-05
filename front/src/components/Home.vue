<template>
  <div>
    <header-bar />

    <div v-if="admin" class="add"><a href="#add"><i class="material-icons">note_add</i></a></div>

    <div id="add" class="lightbox">
      <div class="lightbox-content">
        <div class="lightbox-title">
          <span style="flex: 1"></span>
          <span>Novo Post</span>
          <span style="flex: 1"></span>
          <span class="lightbox-close"><a href="/"><i class="material-icons">close</i></a></span>
        </div>
        <div class="raw">
          <form @submit.prevent="addPost">
            <br>
            <div class="post">
              <div class="title" :style="'background-color: ' + randomColor()">
                <span><input type="text" v-model="prev.title"></span>
              </div>
              <div class="text">
                <textarea rows="10" cols="40" v-model="prev.text"></textarea>
              </div>
            </div>
            <div class="submit">
              <input type="submit" value="Add" />
            </div>
          </form>
        </div>
        <div class="preview">
          <div class="post" style="border: 1px solid lightgrey">
            <div class="title" :style="'background-color: ' + randomColor()">
              <span>{{ prev.title }}</span>
            </div>
            <div class="text" v-html="prev.text"></div>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div class="container" v-masonry item-selector=".post" fit-width="true" gutter=".gutter-sizer">
        <div class="post-sizer"></div>
        <div class="gutter-sizer"></div>
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
// import axios from 'axios'

import HeaderBar from './Header'
import FooterBar from './Footer'

export default {
  components: {
    HeaderBar, FooterBar
  },
  data: function () {
    return {
      admin: false,
      changeColor: true,
      loaded: false,
      posts: [],
      prev: {title: '', text: ''}
    }
  },

  methods: {
    randomColor () {
      if (this.changeColor) {
        let trans = 1

        let colors = [
          `rgba(7,25,48,${trans})`,
          `rgba(3,77,112,${trans})`,
          `rgba(3,166,148,${trans})`
        ]

        return colors[Math.floor((Math.random() * colors.length))]
      }
    },

    addPost () {
      alert(this.prev.title)
      // alert(this.prev.text)
    }
  },

  beforeMount () {
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
  },

  mounted () {
    this.changeColor = false
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
  .gutter-sizer { width: 15px }
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

  /*LIGHTBOX*/
  .lightbox {
    display: none;

    position: fixed;
    top: 0;
    left: 0;
  	width: 100%;
  	height: 100%;
    z-index: 999;
  	justify-content: center;
    align-items: center;
  	background: rgba(0,0,0,0.8);
  }

  .lightbox:target {
    display: flex;
  }

  .lightbox-close {
    color: grey;
    cursor: pointer;
  }

  .lightbox-content {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;


    width: auto;
    padding: 10px;
    background-color: white;
  }

  .lightbox-title {
    grid-column: 1 / span 2;
    display: flex;
    justify-content: center;
    font-size: 2em;
  }

  .raw .title {
    padding: .75em 2px;
  }

  .raw .text {
    padding: 0;
  }

  .submit {
    text-align: center;
  }
  .submit input {
    width: 100%;
    border: none;
    padding: 10px 10px;
    background-color: #00C853;
    color: black;
    cursor: pointer;
  }

  input {
    font-size: 1em;
    color: white;
    border: none;
    border-bottom: 1px solid lightgrey;
    background-color: transparent
  }

  input:focus {
    outline: none;
  }
</style>
