import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel-react';

const useCarousel = (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => {
  const [viewportRef, embla] = useEmblaCarousel(options, plugins);

  const slides = embla?.slideNodes() ?? [];

  const [selectedSlide, setSelectedSlide] = useState(0);

  // useCallback for reference equality when calling embla.off
  const setSelectedCallback = useCallback(() => {
    setSelectedSlide(embla?.selectedScrollSnap() || 0);
  }, [embla]);

  useEffect(() => {
    embla?.on('select', setSelectedCallback);

    return () => {
      embla?.off('select', setSelectedCallback);
    };
  }, [embla, setSelectedCallback]);

  const scrollPrev = () => {
    embla?.scrollPrev();

    return embla?.selectedScrollSnap() ?? 0;
  };

  const scrollNext = () => {
    embla?.scrollNext();

    return embla?.selectedScrollSnap() ?? 0;
  };

  const scrollTo = (index: number) => {
    embla?.scrollTo(index);

    return embla?.selectedScrollSnap() ?? 0;
  };

  return { viewportRef, scrollPrev, scrollNext, scrollTo, slides, selectedSlide };
};

export default useCarousel;
