import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing, colors, typography }: GrafanaTheme) => ({
  container: css`
    display: flex;
    flex-direction: column;
  `,
  cardsContainer: css`
    display: flex;
    flex-wrap: wrap;
  `,
  card: css`
    flex: 1 1 calc(50% - ${spacing.lg});
    padding: ${spacing.lg};
    background-color: ${colors.pageHeaderBg};

    @media (max-width: 850px) {
      flex: 0 0 100%;
    }

    &:first-child {
      margin-right: ${spacing.lg};

      @media (max-width: 850px) {
        margin: 0;
        margin-bottom: ${spacing.lg};
      }
    }
  `,
  cardTitle: css`
    font-size: ${typography.size.lg};
    font-weight: ${typography.weight.bold};
  `,
  cardPoint: css`
    font-weight: ${typography.weight.semibold};
  `,
  contactBtn: css`
    text-decoration: none;
  `,
});
