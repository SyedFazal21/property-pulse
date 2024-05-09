import Image from "next/image";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function PropertyImages({ images }) {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ref, open}) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  height={0}
                  width={0}
                  alt=""
                  sizes="100vw"
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, i) => (
                <div
                  key={i}
                  className={`
                ${images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"}
                `}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ref, open}) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        className="object-cover h-[400px] w-full rounded-xl"
                        height={0}
                        width={0}
                        alt=""
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}
