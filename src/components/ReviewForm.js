import StarReview from './StarReview'
import TextArea from './TextArea'
import { useState } from 'react'

const ReviewForm = ({ handleAdd }) => {
    const [text, setText] = useState('')
    const [difficulty, setDifficulty] = useState(0)
    const [workLoad, setWorkload] = useState(0)
    const [teaching, setTeaching] = useState(0)

    const addReview = (event) => {
        event.preventDefault()
        console.log(text)
        console.log(difficulty)
        console.log(workLoad)
        console.log(teaching)
        setText('')
        setDifficulty(0)
        setWorkload(0)
        setTeaching(0)
        handleAdd()
    }

    return (
        <form onSubmit={addReview}>
            <div>
                <div>
                    difficulty {difficulty}
                    <StarReview
                        size={17}
                        space={1}
                        starValue={difficulty}
                        setStarValue={setDifficulty}
                    />
                </div>
                <div>
                    workload {workLoad}
                    <StarReview
                        size={17}
                        space={1}
                        starValue={workLoad}
                        setStarValue={setWorkload}
                    />
                </div>
                <div>
                    teaching {teaching}
                    <StarReview
                        size={17}
                        space={1}
                        starValue={teaching}
                        setStarValue={setTeaching}
                    />
                </div>
                <TextArea text={text} setText={setText} />
                <button type='submit'>Post</button>
            </div>
        </form>
    )
}

export default ReviewForm