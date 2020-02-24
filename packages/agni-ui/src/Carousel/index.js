/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  forwardRef,
  useState,
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  Fragment
} from 'react';
import { motion } from 'framer-motion';
import { PseudoBox } from '../PseudoBox';
import { useUiTheme } from '../UiProvider/hooks/useUiTheme';
import { useComponentSize } from '../_hooks/useComponentSize';
import { useForkedRef } from '../_hooks/useForkedRef';
import { useInterval } from '../_hooks/useInterval';

const CarouselContext = createContext({});
const useCarouselContext = () => useContext(CarouselContext);

/////////////////////////////////////

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const CarouselItem = forwardRef(({ children, index, className }, forwardedRef) => {
  const { items, activeIndex, registerItem, width } = useCarouselContext();

  const ref = useRef(null);
  const forkedRef = useForkedRef(ref, forwardedRef);

  useEffect(() => {
    registerItem(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = index === activeIndex;

  const visualLabel = `${index + 1} of ${items.length}`;

  return (
    <motion.div
      className={cn(['carousel__item', isActive && 'active', className])}
      ref={forkedRef}
      role="group"
      aria-hidden={activeIndex !== index}
      aria-roledescription="slide"
      aria-label={visualLabel}
      css={css([
        {
          display: 'block',
          width,
          height: '100%',
          userSelect: 'none',
          paddingLeft: 24,
          paddingRight: 24
        }
      ])}
    >
      {children}
    </motion.div>
  );
});

CarouselItem.displayName = 'CarouselItem';

/////////////////////////////////////

const placementStyle = {
  top: {
    top: '6px',
    left: '50%',
    flexDirection: 'row',
    transform: 'translateX(-50%)'
  },
  bottom: {
    bottom: '6px',
    left: '50%',
    flexDirection: 'row',
    transform: 'translateX(-50%)'
  },
  left: {
    left: '6px',
    top: '50%',
    flexDirection: 'column',
    transform: 'translateY(-50%)'
  },
  right: {
    right: '6px',
    top: '50%',
    flexDirection: 'column',
    transform: 'translateY(-50%)'
  }
};

const CarouselIndicators = () => {
  const { items, activeIndex, updateByDirection, placement } = useCarouselContext();
  const theme = useUiTheme();

  return (
    <PseudoBox
      className="carousel__indicators"
      d="flex"
      flexWrap="wrap"
      mr="auto"
      pos="absolute"
      zIndex="2"
      {...placementStyle[placement]}
    >
      {items.map((uid, index) => (
        <motion.button
          key={`car_indicator-${uid}`}
          type="button"
          className="carousel__indicators-item"
          title={`Go to slide ${index + 1}`}
          onClick={() => updateByDirection(index - activeIndex)}
          whileHover={{
            scale: 1.2
          }}
          whileTap={{
            scale: 0.9
          }}
          animate={{
            backgroundColor:
              activeIndex === index ? theme.colors.primary[500] : theme.colors.gray[200],
            scale: activeIndex === index ? 1.2 : 1
          }}
          css={css([
            {
              display: 'block',
              width: 16,
              height: 16,
              marginLeft: 2,
              marginRight: 2,
              borderRadius: theme.radii.full,
              outline: 'none',
              userSelect: 'none'
            }
          ])}
        />
      ))}
    </PseudoBox>
  );
};

CarouselIndicators.displayName = 'CarouselIndicators';

/////////////////////////////////////

const controlButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 50px;
  font-size: 20px;
  line-height: 1;
  position: absolute;
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 2;
  outline: none;
  user-select: none;
`;

const CarouselControls = () => {
  const { updateByDirection } = useCarouselContext();

  return (
    <div className="carousel__controls">
      <motion.button
        type="button"
        className="carousel__controls-prev"
        initial={{
          scale: 1
        }}
        whileHover={{
          x: 2,
          scale: 1.2
        }}
        whileTap={{
          scale: 0.9
        }}
        css={css([
          controlButtonStyle,
          {
            left: 0,
            backgroundColor: 'transparent'
          }
        ])}
        onClick={() => updateByDirection(-1)}
        title="Previous slide"
      >
        <FiArrowLeft />
      </motion.button>
      <motion.button
        type="button"
        className="carousel__controls-next"
        initial={{
          scale: 1
        }}
        whileHover={{
          x: -2,
          scale: 1.2
        }}
        whileTap={{
          scale: 0.9
        }}
        css={css([
          controlButtonStyle,
          {
            right: 0,
            backgroundColor: 'transparent'
          }
        ])}
        onClick={() => updateByDirection(1)}
        title="Next Slide"
      >
        <FiArrowRight />
      </motion.button>
    </div>
  );
};

CarouselControls.displayName = 'CarouselControls';

/////////////////////////////////////

const Carousel = ({
  className,
  children,
  autoPlay = true,
  duration = 5,
  showControl = true,
  showIndicator = true,
  placement = 'bottom',
  ...restProps
}) => {
  const carouselRef = useRef(null);

  const [width] = useComponentSize(carouselRef);

  const [height, setHeight] = useState(() => '100%');

  const [isPlaying, setPlaying] = useState(() => autoPlay || false);
  const [items, setItems] = useState([]);
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  const slide = useCallback(() => {
    setActiveIndex(oldState => {
      if (oldState[0] + 1 > items.length - 1) return [0, -1 * (items.length - 1)];
      return [oldState[0] + 1, 1];
    });
  }, [items.length]);

  useInterval(
    () => {
      setActiveIndex(oldState => {
        if (oldState[0] + 1 > items.length - 1) return [0, -1 * (items.length - 1)];
        return [oldState[0] + 1, 1];
      });
    },
    isPlaying && autoPlay ? duration * 1000 : null
  );

  // On mount register slide and set width carousel items
  const registerItem = useCallback(newItemUid => {
    setItems(oldItems => {
      if (oldItems.indexOf(newItemUid) > -1) return oldItems;
      return [...oldItems, newItemUid];
    });
  }, []);

  const updateByDirection = useCallback(
    newDirection => {
      setActiveIndex(oldState => {
        let attempt = oldState[0] + newDirection;
        if (attempt > items.length - 1) {
          attempt = 0;
        } else if (attempt < 0) {
          attempt = items.length - 1;
        }
        return [attempt, newDirection];
      });
    },
    [items.length]
  );

  const updateByIndex = useCallback(newIndex => {
    setActiveIndex([newIndex, 1]);
  }, []);

  return (
    <PseudoBox
      ref={carouselRef}
      className={cn(['carousel', className])}
      pos="relative"
      minH="100px"
      w="full"
      h="full"
      overflow="hidden"
      role="region"
      aria-roledescription="carousel"
      paddingLeft={placement === 'left' && '28px'}
      paddingRight={placement === 'right' && '28px'}
      {...restProps}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      <CarouselContext.Provider
        value={{
          slide,
          activeIndex,
          registerItem,
          items,
          setPlaying,
          isPlaying,
          direction,
          updateByDirection,
          updateByIndex,
          width,
          height,
          setHeight,
          placement
        }}
      >
        <Fragment>
          {showControl && <CarouselControls />}
          {showIndicator && <CarouselIndicators />}
          <PseudoBox w="full" h="full" className="carousel__positioner">
            <motion.div
              role="region"
              aria-live="off"
              className="carousel__list"
              animate={{ x: activeIndex * width * -1 }}
              style={{ width: width * items.length, height, display: 'flex', flexDirection: 'row' }}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 200 }
              }}
              drag="x"
              whileHover={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  updateByDirection(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  updateByDirection(-1);
                }
              }}
            >
              {children}
            </motion.div>
          </PseudoBox>
        </Fragment>
      </CarouselContext.Provider>
    </PseudoBox>
  );
};

Carousel.displayName = 'Carousel';

export { Carousel, CarouselItem };
