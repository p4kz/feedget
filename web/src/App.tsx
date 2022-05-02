
interface ButtonProps {
  text?: string
}

function Button(props: ButtonProps) {
  return <button className="bg-violet-400 p-2 rounded hover:bg-violet-700 text-violet-50 transition-colors">{props.text ?? 'hello react' }</button>
}

function App() {

  return (
    <div className="flex gap-2">
      <Button text='Olá'/>
      <Button text='tailwind'/>
      <Button />
    </div>
  )
}

export default App
