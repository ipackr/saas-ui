import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, height, spacing, typography } = theme;

  const headerImageSize = `${height.lg}px`;

  return {
    description: css`
      flex: 1;
      margin-right: ${spacing.lg};
    `,
    descriptionWrapper: css`
      align-items: center;
      display: flex;
      margin-left: calc(${spacing.lg} + ${headerImageSize});
    `,
    header: css`
      align-items: center;
      display: flex;
      font-size: ${typography.heading.h2};

      > h2 {
        margin: ${spacing.md} 0;
      }

      > img {
        height: ${headerImageSize};
        margin-right: ${spacing.lg};
      }
    `,
    link: css`
      align-items: center;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      width: 200px;
    `,
    section: css`
      color: ${colors.text};
      max-width: 900px;
      width: 100%;
    `,
  };
};
