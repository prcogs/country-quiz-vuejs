
<script>
import { storeQuiz, storeRoutes } from 'components/Quiz/store'

export default {
   data() {
      return {
         storeRoutes,
         storeQuiz,
      }
   },

   methods: {
      retry() {
         this.storeQuiz.retry()
         this.storeRoutes.handleRoute()
      }
   }
}
</script>

<template>
   <div class="container">
      <h2>Results</h2>

      <p class="text">You got <span class="good-answers">{{ storeQuiz.dataGame.numberGoodResp }}</span> / {{ storeQuiz.dataGame.numberQuestions }} corrects answer</p> 

      <button @click="retry" class="retry-btn">Retry</button>
   </div>
</template>

<style scoped>
   .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 46px;
   }

   h2 {
      font-weight: 700;
      font-size: 48px;
      line-height: 72px;
      color: #1D355D;
   }

   .text {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      text-align: center;
   }

   .good-answers {
      color: #60BF88;
      font-size: 24px;
   }

   .retry-btn {
      width: fit-content;

      padding: 18px 62px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      border: 2px solid #1D355D;
      color: #1D355D;
   }
</style>
