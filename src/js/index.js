import Vue from 'vue'
import app from '../components/app.vue'
import '../scss/main.scss'

new Vue({
    el: '#app',
    render: h => h(app)
})