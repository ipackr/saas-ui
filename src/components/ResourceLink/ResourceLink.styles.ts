import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing }: GrafanaTheme) => ({
  link: css`
    text-decoration: none;
    color: inherit;
    display: block;
  `,
  icon: css`
    margin-left: ${spacing.sm};
  `,
});
