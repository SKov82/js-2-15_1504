import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './layout/styles/style.css';
import './layout/styles/normalize.css';

import Vue from 'vue';
import app from './app.vue';

new Vue({
    render: h => h(app)
}).$mount('#app');
