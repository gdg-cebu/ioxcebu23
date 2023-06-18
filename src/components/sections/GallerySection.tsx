import Image from 'next/image';
import cloneDeep from 'lodash/cloneDeep';
import BaseSection from '../common/BaseSection';
import Button from '../common/Button';
import styles from './GallerySection.module.css';

import type * as React from 'react';
import type * as types from 'types';

export type Props = types.GallerySection & types.StackbitAnnotation;

const GallerySection: React.FC<Props> = (section) => {
  return (
    <BaseSection className="p-1" sb={section.sb}>
      <div className={styles.grid}>
        {renderContent(section)}
        {renderImages(section)}
      </div>
    </BaseSection>
  );
};

const renderContent = ({ title, description, cta }: types.GallerySection): React.ReactNode => {
  return (
    <div className={`flex flex-col items-start py-12 px-6 md:px-12 -mx-1 md:mx-0 ${styles.content}`}>
      <h2 className="mb-4 text-xl md:text-2xl font-bold" data-sb-field-path=".title">
        {title}
      </h2>
      {description && (
        <p className="mb-4 text-base md:text-lg" data-sb-field-path=".description">
          {description}
        </p>
      )}
      {cta && (
        <div className="inline-block mt-auto" data-sb-field-path=".cta">
          <Button href={cta.url} sb=".label .url#@href">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
};

const renderImages = ({ images }: types.GallerySection): React.ReactNode => {
  const data = prepareCompleteImages(images);
  if (data.length === 0) {
    return (
      <>
        {new Array(9).fill(0).map((_, index) => (
          <div key={index} className={`w-full h-full bg-complementary-faded ${styles.item}`} />
        ))}
      </>
    );
  }
  return (
    <>
      {data.map((image, index) => (
        <div
          key={index}
          className={`w-full h-full bg-complementary-faded relative ${styles.item}`}
          data-sb-field-path={index < images.length ? `.images.[${index}]` : null}
        >
          <Image
            src={image.url}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            data-sb-field-path={index < images.length ? '.url#@src .alt#@alt' : null}
          />
        </div>
      ))}
    </>
  );
};

const prepareCompleteImages = (images: types.Image[]): types.Image[] => {
  let data: types.Image[] = [];
  const validImages = images.filter((image) => image.url);
  if (validImages.length > 0) {
    while (data.length < 9) {
      data = [...data, ...validImages];
    }
    data = data.slice(0, 9);
  }
  return data;
};

export default GallerySection;
