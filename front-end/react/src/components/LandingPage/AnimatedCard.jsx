import { AlignLeft } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AnimatedCard({ feature }) {
  const cardRef = useRef();

  useEffect(() => {
    let angle = 0;
    function animate() {
      angle = (angle + feature.speed) % 360;
      cardRef.current.querySelector(
        "span"
      ).style.backgroundImage = `conic-gradient(from ${angle}deg, ${feature.mainColor}, ${feature.backgroundColor}, rgba(0, 255, 255, 0.18), ${feature.mainColor})`;
      console.log(angle);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  const Icon = feature.icon;
  return (
    <div className="card" ref={cardRef}>
      <Icon
        style={{
          backgroundColor: `${feature.backgroundColor}`,
          color: `${feature.mainColor}`,
        }}
      />
      <h2>{feature.title}</h2>
      <p>{feature.description}</p>
      <span
        style={{
          backgroundImage: `conic-gradient(from var(--angle), ${feature.mainColor}90%, ${feature.backgroundColor},  ${feature.mainColor} )`,
        }}
      ></span>
    </div>
  );
}
