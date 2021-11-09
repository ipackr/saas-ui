import React, { FC } from 'react';
import { LinkButton, useStyles } from '@grafana/ui';
import { useUserInfo, useUserRole } from 'core/hooks';
import { getStyles } from './Contacts.styles';
import { Messages } from './Contacts.messages';
import { LINKS } from './Contacts.constants';

export const Contacts: FC = () => {
  const styles = useStyles(getStyles);
  const [user] = useUserInfo();
  const [role] = useUserRole();
  const { firstName, lastName } = user;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <p className={styles.cardTitle}>{Messages.yourAccount}</p>
        <p>
          <span className={styles.cardPoint}>{Messages.name}</span> {firstName} {lastName}
        </p>
        <p>
          <span className={styles.cardPoint}>{Messages.role}</span> {role}
        </p>
        <p>
          <span className={styles.cardPoint}>{Messages.accountType}</span> {Messages.freeAccount}
        </p>
        <p>{Messages.perconaExperts}</p>
        <LinkButton target="_blank" rel="noreferrer" className={styles.contactBtn} variant="primary" href={LINKS.contactUs}>{Messages.contactUs}</LinkButton>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>{Messages.perconaContacts}</p>
        <p>{Messages.findUs}</p>
        <p><a href={LINKS.forum} target="_blank" rel="noreferrer">{Messages.forums}</a></p>
        <p><a href={LINKS.discord} target="_blank" rel="noreferrer">{Messages.discord}</a></p>
        <p>
          {Messages.getInTouch} <a href={LINKS.contact} target="_blank" rel="noreferrer">{LINKS.contact}</a>
        </p>
      </div>
    </div>
  );
};
