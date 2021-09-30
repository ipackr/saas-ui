import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, isLight, spacing } = theme;

  const borderColor = isLight ? colors.border1 : colors.border2;

  return {
    container: css`
      align-items: center;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      line-height: 2em;
      padding: 0 56px;

      > :not(:first-child) {
        margin-top: ${spacing.lg};
      }

      > :not(:last-child) {
        border-bottom: 1px solid ${borderColor};
        padding-bottom: ${spacing.lg};
      }
    `,
  };
};
