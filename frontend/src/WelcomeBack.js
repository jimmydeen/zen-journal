export function WelcomeBack() {
  const text = 'Welcome back'

  return (
    <div className="loading-screen">
      <h1 className="loading-text">
        {text.split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );

}
export default WelcomeBack