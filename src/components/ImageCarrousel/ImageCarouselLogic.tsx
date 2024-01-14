import { useEffect, useRef, useState } from "react";

export default function ImageCarouselLogic(props: { images: string[] }) {
  const { images } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const createInterval = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex: number) => (prevIndex + 1) % images.length
      );
      setActiveDotIndex((prevIndex: number) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (images.length > 0) {
      createInterval();
    }
  }, [images]);

  const handleNext = () => {
    createInterval();
    setCurrentImageIndex(
      (prevIndex: number) => (prevIndex + 1) % images.length
    );
    setActiveDotIndex((prevIndex: number) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    createInterval();
    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setActiveDotIndex((prevIndex: number) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    createInterval();
    setCurrentImageIndex(index);
    setActiveDotIndex(index);
  };

  return {
    currentImageIndex,
    activeDotIndex,
    handlePrevious,
    handleNext,
    handleDotClick,
  };
}
