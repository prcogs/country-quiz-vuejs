<script>
import { storeRoutes, storeQuiz } from 'components/Quiz/store'

const regions = ['Europe', 'Asia', 'Africa', 'Americas']

export default {
   data() {
      return {
         storeRoutes,
         storeQuiz,
         number: 1,
         region: regions[0],
         regions,
         loading: false,
         error: null,
      }
   },
   methods: {
      async play() {
         this.loading = true

         const nbr = (this.number >= 0 && this.number <= 10) ? this.number : 5
         const region = Object.values(regions).includes(this.region) ? this.region : 'Europe'
         const go = await this.storeQuiz.init(nbr, region)

         this.loading = false

         if (go) storeRoutes.handleRoute()
         else this.error = 'Error, please retry'
      }
   }
}
</script>

<template>
<div class="container">
   <p class="text">Choisi ton continent et test tes connaissances sur les capitals et les drapeaux des pays.</p>

   <div class="select">
      <select v-model="region">
         <option v-for="region in regions" :value="region" :key="region">{{ region }}</option>
      </select>

      <select v-model="number">
         <option v-for="number in 10" :value="number" :key="number" >{{ number }}</option>
      </select>
   </div>

   <span v-if="error">Erreur serveur</span>

   <button type="button" @click="play" :disabled="loading" class="start-btn">Commencer</button>
</div>
</template>

<style scoped>
/* :root {
   --primary-400: '#1D355D';
   --primary-300: '#2F527B';
   --primary-200: 'rgba(96, 102, 208, 0.7)';
   --secondary-500: '#D18E23';
   --secondary-400: '#F9A826';
   --error: '#EA8282';
   --success: '#60BF88';
   --blank: '#FFFF';
 } */
   .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
   }

   .text {
      text-align: center;
   }

   .select {
      display: flex;
      justify-content: center;
      gap: 48px;
      width: 100%;
   }

   .start-btn {
      width: 100%;
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      align-self: flex-end;

      background-color: #F9A826;
      border-radius: 8px;
      padding: 12px 0;
      color: #FFFF;

      transition: background-color ease-in-out 200ms;
   }

   .start-btn:hover {
      background-color: #D18E23;
   }

   .start-btn:disabled {
      cursor: not-allowed;
   }
</style>
