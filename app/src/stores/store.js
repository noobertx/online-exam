import Vue from 'vue';
import Vuex from 'vuex';
import { quizItem } from '../modules/admin.quiz-item.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
 	modules: {
        quizItem
    }
})