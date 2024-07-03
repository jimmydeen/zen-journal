import { memo } from "react"
function QuestionAndAnswerComponent({stage, question, answers, handleResponse}) {
  return (
    <div className='question'>
      <h1>{question}</h1>
      <div className='answers'>
        {answers.map(answer => 
          <button onClick={handleResponse(answer, stage)}>{answer}</button>
        )}
      </div>
    </div>
  )
}
const QuestionAndAnswer = memo(QuestionAndAnswerComponent)
export default QuestionAndAnswer