import styles from '../assets/styles/questionAnswer.module.css'
import buttonStyle from '../assets/styles/button.module.css'

import { memo } from "react"
function QuestionAndAnswerComponent({stage, question, answers, handleResponse}) {
  return (
    <div className={styles.question}>
      <h1>{question}</h1>
      <div className={styles.answers}>
        {answers.map(answer =>  // needs key
          <button key={answer} className={buttonStyle.button} onClick={handleResponse(answer, stage)}>{answer}</button>
        )}
      </div>
    </div>
  )
}
const QuestionAndAnswer = memo(QuestionAndAnswerComponent)
export default QuestionAndAnswer