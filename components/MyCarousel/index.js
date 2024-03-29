import React, { useState, useEffect, useCallback } from "react";
import { DotButton, PrevButton, NextButton } from "./carouselButtons";
import useEmblaCarousel from "embla-carousel-react";
//import { mediaByIndex } from "../media";

const MyCarousel = ({ slides }) => {
    const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback(
        (index) => embla && embla.scrollTo(index),
        [embla]
    );

    const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();
        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);

    // console.log("slides:");
    // console.log(slides);
    // console.log(`lnk: ${process.env.API_BASE_URL}`);

    return (
        <>
            <div className="embla">
                <div
                    className="embla__viewport"
                    ref={viewportRef}
                    style={{ width: "111%" }}
                >
                    <div className="embla__container">
                        {slides?.map((item) => (
                            <div className="embla__slide" key={item?.id}>
                                <div className="embla__slide__inner">
                                    <img
                                        className="embla__slide__img"
                                        /*${process.env.API_BASE_URL}*/
                                        src={`${item?.url}`}
                                        alt={item?.title}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </>
    );
};

export default MyCarousel;
