import { useState, useEffect, memo } from "react"

const LoadingText = memo(function LoadingTextComponent({message}) {
  const loadingTextPhrases = ['Loading your personalised journal question', 'Did you know you can send encouragements to your friends? Checkout the friends tab.', '"Simplicity is the ultimate sophistication.” – Leonardo da Vinci"', 'Almost there, just a moment...']
  const [messageIndex, setMessageIndex] = useState(0)
  const [isFadingIn, setIsFadingIn] = useState(true)

  useEffect(() => {
    let fadeOutInterval
    // wait 6 seconds
    setTimeout(() => {
      // change it to fade out every 12 seconds
      fadeOutInterval = setInterval(() => {
        setIsFadingIn(false)
      }, 12000)
    }, 6000)

    // fadeIn every 12 seconds
    const fadeInInterval = setInterval(() => {
      setIsFadingIn(true)
    }, 12000)
    
    return () => {clearInterval(fadeOutInterval); clearInterval(fadeInInterval)}
  }, [])

  useEffect(() => {
    if (isFadingIn) {
      setMessageIndex(prev => (prev + 1) % 4)
    }
  }, [isFadingIn])

  return (
    <>
      <p className={isFadingIn ? "fade-in" : "fade-out"}>{loadingTextPhrases[messageIndex]}</p>
    </>
  )
})
export default LoadingText