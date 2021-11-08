import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const ICON_SIZE = 16;

export const getStyles = ({ border, colors, height, spacing, isLight }: GrafanaTheme) => ({
  item: css`
    align-items: center;
    border-radius: ${border.radius.sm};
    color: ${colors.text};
    display: flex;
    height: ${height.md}px;
    margin-bottom: ${spacing.xs};
    padding: ${spacing.sm};
    cursor: pointer;

    &:hover,
    &:active {
      text-decoration: none;
      background-color: ${isLight ? colors.bg3 : colors.bg1};
    }
  `,
  linkIcon: css`
    height: ${ICON_SIZE}px;
    margin-right: ${spacing.sm};
  `,
});
