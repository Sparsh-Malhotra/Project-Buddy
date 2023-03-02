import { useEffect, useState, useRef } from "react";

const LottieAnimation = () => {
  const ref = useRef(null);
  const [lottie, setLottie] = useState(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/static/images/common/empty-ghost.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div className='h-full' ref={ref} />;
};

export default LottieAnimation;
