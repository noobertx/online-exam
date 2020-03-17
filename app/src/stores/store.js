import Vue from 'vue';
import Vuex from 'vuex';
import { quiz } from '../modules/admin.quiz-item.module';
import { quizPaper } from '../modules/quiz-paper.module.js';
import { account } from '../modules/account.module.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
 	modules: {
        account,
        quiz,
        quizPaper
    },
})