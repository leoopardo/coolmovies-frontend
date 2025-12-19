import { css } from '@emotion/react';

type StarsProps = {
  value: number;
  size?: number;
};

export const Stars = ({ value, size = 24 }: StarsProps) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div css={styles.wrapper}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} css={styles.star(size)}>★</span>
      ))}

      {hasHalfStar && (
        <span css={[styles.star(size), styles.halfStar]}>★</span>
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} css={[styles.star(size), styles.empty]}>★</span>
      ))}
    </div>
  );
};

const styles = {
  wrapper: css({
    display: 'flex',
    gap: 2,
  }),
  star: (size: number) =>
    css({
      fontSize: size,
      color: '#FFC107',
      lineHeight: 1,
    }),
  empty: css({
    color: '#666',
  }),
  halfStar: css({
    background: 'linear-gradient(90deg, #FFC107 50%, #666 50%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }),
};
