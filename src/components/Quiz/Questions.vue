<script>
const LETTERS = ['A', 'B', 'C', 'D']
const random = () => Math.floor(Math.random() * 4)

export default {
   props: {
      data: Array,
      isPlaying: Boolean,
      whichType: Number,
   },

   emits: ['handle-answer'],

   data() {
      return {
         letters: LETTERS,
         goodAnswer: this.data[random()],
         response: null,
      }
   },

   watch: {
      data(val, prevVal) {
         if(val !== prevVal) {
            this.goodAnswer = this.data[random()]
         }
      }
   },

   methods: {
      handleAnswer(country) {
         if(this.isPlaying) {
            this.response = country.name
            this.$emit('handle-answer', country.name === this.goodAnswer.name)
         }
      },

      setClass(name) {
         if (!this.isPlaying) {
            if (name === this.goodAnswer.name) return 'success'
            if (name === this.response) return 'error'
            return 'none'
         }

         return ''
      }
   }
}
</script>


<template>
   <div class="container">
      <p v-if="whichType === 1" class="question">{{ goodAnswer.capital }} is the capital of</p>
      <div v-else class="question">
         <img class="img-flag" :src="goodAnswer.flags" alt="Flag" width="100">
         Wich country does this flag belong to
      </div>

      <ul class="wrapper">
         <li 
            class="answer"
            v-for="(country, index) in data"
            :key="country.capital"
         >
            <button
               :class="setClass(country.name)"
               class="answer-btn"
               :disabled="!isPlaying"
               @click="handleAnswer(country)"
            >
               <span>{{ letters[index] }}</span>

               {{ country.name }}

               <span v-if="!isPlaying" class="icon">
                  <img v-if="country.name === goodAnswer.name" src="/icons/check-solid.svg" alt="Icon check" />
                  <img v-else src="/icons/xmark-solid.svg" alt="Icon cross" />
               </span>
            </button>
         </li>
      </ul>
   </div>
</template>

<style scoped>
   .question {
      position: relative;

      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      color: #1D355D;
      margin-bottom: 32px;
   }

   .img-flag {
      position: absolute;
      right: 0;
      top: -50px;
      width: 70px;
   }

   .wrapper {
      display: flex;
      flex-direction: column;
      gap: 26px;

      margin-bottom:24px;
   }

   .answer {
      height: 56px;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
   }

   .answer-btn {
      display: flex;
      align-items: center;
      gap: 46px;
      width: 100%;
      height:100%;
      position: relative;

      color: rgba(96, 102, 208, 0.7);
      border-radius: 12px;
      border: 2px solid rgba(96, 102, 208, 0.7);
      padding: 10px 18px;
      
      transition: background-color border ease-in-out 300ms;
   }

   .answer-btn:hover {
      background-color: #F9A826;
      border: 2px solid transparent;
      color: #FFFF;
   }

   .answer-btn:disabled {
      cursor: not-allowed;
   }

   .answer-btn.success {
      border: 2px solid transparent;
      color: #FFFF;
      background-color: #60BF88;
   }

   .answer-btn.success:hover {
       background-color: #60BF88;
   }

   .answer-btn.error {
      border: 2px solid transparent;
      color: #FFFF;
      background-color: #EA8282;
   }

   .answer-btn.error:hover {
       background-color: #EA8282;
   }

   .answer-btn.none:hover {
      background-color: #FFFF;
      border: 2px solid rgba(96, 102, 208, 0.7);
      color: rgba(96, 102, 208, 0.7);
   }

   .icon {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 16px;
      right: 18px;
   }
</style>
