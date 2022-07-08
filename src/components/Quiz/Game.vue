
<script>
import { storeQuiz, storeRoutes } from 'components/Quiz/store'
import Questions from 'components/Quiz/Questions.vue'

const type = {
   CAPITAL: 1,
   FLAG: 2,
}

export default {
   name: "Game",

   components: { Questions },

   data() {
      return {
         storeRoutes,
         storeQuiz,
         isPlaying: true,
      };
   },

   computed: {
      whichType() {
         return this.storeQuiz.dataGame.actualQuestion % 2 === 0 ? type.CAPITAL : type.FLAG
      },
   },

   methods: {
      handleAnswer(resp) {
         if(resp) this.storeQuiz.isAGoodAnswer()
         this.isPlaying = !this.isPlaying
      },

      handleNext() {
         const isFinish = this.storeQuiz.nextQuestion()

         if(isFinish) this.storeRoutes.handleRoute()

         this.isPlaying = !this.isPlaying
      }
   }
}
</script>

<template>
   <div class="container">
      <span class="game-progress">{{ storeQuiz.dataGame.actualQuestion + 1 }} / {{ storeQuiz.dataGame.numberQuestions }}</span>

      <Questions
         :data="storeQuiz.questions[storeQuiz.dataGame.actualQuestion]"
         @handle-answer="handleAnswer"
         :isPlaying="isPlaying"
         :which-type="whichType"
      />

      <button v-if="!isPlaying" @click="handleNext" class="next-btn">Next</button>
   </div>
</template>

<style>
   .container {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
      /* justify-content: space-between; */
   }

   .game-progress {
      position: absolute;
      top: -40px;
      left: 0;
      font-size: 20px;
   }

   .next-btn {
      background-color: #F9A826;
      border-radius: 8px;
      color: #FFFF;
      padding: 16px 36px;
      width: min-content;
      align-self: flex-end;

      transition: background-color ease-in-out 200ms;
   }

   .next-btn:hover {
       background-color: #D18E23;
   }
</style>
