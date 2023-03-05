import Lottie from "react-lottie";
import animationData from "/public/static/images/common/empty-ghost.json";

const LottieAnimation = () => {
  return (
    <Lottie
      className='h-full'
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
      }}
    />
  );
};

export default LottieAnimation;
