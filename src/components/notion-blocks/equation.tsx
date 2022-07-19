import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

const Equation = ({ block }) => {
  const equation = block.Equation.Expression
  return (
    <div style={{ overflowX: 'auto' }}>
      <BlockMath math={equation} />
    </div>
  )
}
export default Equation
