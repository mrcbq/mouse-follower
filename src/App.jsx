import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // pointer move
  useEffect(() => {
    console.log('effect ', { enabled })
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) { window.addEventListener('pointermove', handleMove) }
    return () => { window.removeEventListener('pointermove', handleMove) } // cleanup method
  }, [enabled])

  // [] -> solos e ejecuta una vez cuando se monta el componente
  // [enabled] se ejecuta cada bez que cambia algfo en el array de dependencias en este caso enabled
  // undefined se ejecuta cada vez que se renderiza el componente

  // change body classname
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => { document.body.classList.remove('no-cursor') }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} Seguir puntero
      </button>
    </main>
  )
}

export default App
