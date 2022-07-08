import { getCountries } from 'api/request/getCountries'
import { reactive } from 'vue'

export const routes = {
   START: 1,
   GAME: 2,
   RESULT: 3,
}

const DATA_GAME_INIT = {
   numberQuestions: 0,
   numberGoodResp: 0,
   actualQuestion: 0,
}

export const storeRoutes = reactive({
   route: routes.START,

   handleRoute() {
      const { START, GAME, RESULT } = routes

      switch (this.route) {
         case START:
            this.route = GAME
            break;
         case GAME:
            this.route = RESULT
            break;
         case RESULT:
            this.route = START
            break;
         default:
            this.route = START
            break;
      }
   },
})

export const createQuestions = (countries, numberQuestions) => {
   const nbrCountries = numberQuestions * 4
   const randomNumbers = []

   for (let i = 0; i < nbrCountries; i += 1) {
      let condition = true
      while (condition) {
         const random = Math.floor(Math.random() * countries.length)
         if (randomNumbers.every(nbr => nbr !== random)) {
            randomNumbers.push(random)
            condition = false
         }
      }
   }

   let allQuestions = []
   for (let i = 0; i < randomNumbers.length; i += 4) {
      const singleQuestion = [
         countries[randomNumbers[i]],
         countries[randomNumbers[i + 1]],
         countries[randomNumbers[i + 2]],
         countries[randomNumbers[i + 3]],
      ]
      allQuestions = [...allQuestions, singleQuestion]
   }


   return allQuestions
}

export const storeQuiz = reactive({
   dataGame: DATA_GAME_INIT,

   questions: [],

   async init(nbr, region) {
      const { data, error } = await getCountries(region)

      if (data) {
         const parsedData = data
            .filter(({ capital, flags, name }) => capital && flags && name)
            .map(({ capital, flags, name }) => ({
               capital: capital[0],
               flags: flags?.svg || flags?.png,
               name: name?.common,
            }))
         
         this.questions = createQuestions(parsedData, nbr)
         this.dataGame = { ...this.dataGame, numberQuestions: nbr }

         return true
      }

      if (error) return false

      return false
   },

   nextQuestion() {
      if (this.dataGame.actualQuestion + 1 >= this.dataGame.numberQuestions) return true
      else {
         this.dataGame = { ...this.dataGame, actualQuestion: this.dataGame.actualQuestion + 1}
         return false
      }
   },

   isAGoodAnswer() {
      this.dataGame = { ...this.dataGame, numberGoodResp: this.dataGame.numberGoodResp + 1}
   },

   retry() {
      this.dataGame = DATA_GAME_INIT
   },
})
