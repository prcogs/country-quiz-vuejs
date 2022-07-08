<script>
import { storeRoutes, routes } from 'components/Quiz/store';
import Start from "./Start.vue";
import Game from './Game.vue'
import Result from './Result.vue';

export default {
   name: 'Quiz',

   components : { Start, Game, Result },

   data() {
      return {
         routes,
         storeRoutes,
      }
   },
}
</script>


<template>
   <main>
      <div class="card">
         <p class="title">COUNTRY QUIZ</p>

         <Start v-if="storeRoutes.route === routes.START" />
   
         <Game v-if="storeRoutes.route === routes.GAME" />
   
         <Result v-if="storeRoutes.route === routes.RESULT" />
      </div>
   </main>
</template>


<style scoped>
   main {
      display: flex;
      width: 100vw;
      height: 100vh;
      align-items: center;
      justify-content: center;
      background: rgba(96, 102, 208, 0.7);
   }

   .card {
      position: relative;
      max-width: 464px;
      height: 600px;
      width: 90%;
      background-color: #FFFF;

      padding: 68px 32px;
      border-radius: 24px;
   }

   .title {
      position: absolute;
      top: -60px;
      left: 0;
      font-weight: bold;
      font-size: 36px;
      line-height: 54px;

      color: #FFFF;
   }
</style>
