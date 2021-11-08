import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ colors, isLight }: GrafanaTheme) => ({
  link: css`
    display: block;
    text-decoration: none;
  `,
  linkActive: css`
    background-color: ${isLight ? colors.bg3 : colors.bg1};
  `,
});
