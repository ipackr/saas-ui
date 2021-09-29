import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { border, colors, height, spacing } = theme;

  const ICON_SIZE = 16;

  return {
    link: css`
      align-items: center;
      border-radius: ${border.radius.sm};
      color: ${colors.text};
      display: flex;
      height: ${height.md}px;
      margin-bottom: ${spacing.xs};
      padding: ${spacing.sm};
      text-decoration: none;

      &:hover,
      &:active {
        text-decoration: none;
        background-color: ${theme.isLight ? colors.bg3 : colors.bg1};
      }
    `,
    linkIcon: css`
      height: ${ICON_SIZE}px;
      margin-right: ${spacing.xs};
    `,
    linkActive: css`
      background-color: ${theme.isLight ? colors.bg3 : colors.bg1};
    `,
  };
};
