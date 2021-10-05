import React, { FC, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { Form, FormRenderProps, Field } from 'react-final-form';
import { useStyles, Button, Label, Select } from '@grafana/ui';
import { LoaderButton, Modal, TextInputField, validators } from '@percona/platform-core';
import { toast } from 'react-toastify';
import { getStyles } from './InviteMember.styles';
import { Messages } from './InviteMember.messages';
import { GET_ORGANIZATION_URL, ROLES, ORGANIZATION_MEMBER_URL_CHUNK } from './InviteMember.constants';
import { InviteMemberFormFields, InviteMemberProps } from './InviteMember.types';

const { email: emailValidator, required } = validators;

export const InviteMember: FC<InviteMemberProps> = ({ orgId }) => {
  const styles = useStyles(getStyles);
  const { response, error, post, loading } = useFetch({ cachePolicy: CachePolicies.NO_CACHE });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(Messages.fetchError);
    }
  }, [error]);

  const handleModalClose = () => {
    setIsModalVisible((currentValue) => !currentValue);
  };

  const handleInviteMemberClick = () => {
    setIsModalVisible(true);
  };

  const handleInviteMemberSubmit = async ({ email, role }: InviteMemberFormFields) => {
    await post(`${GET_ORGANIZATION_URL}\\${orgId}\\${ORGANIZATION_MEMBER_URL_CHUNK}`, {
      username: email,
      role: role.value,
    });

    if (response.ok) {
      toast.success(Messages.inviteSuccess);
      setIsModalVisible(false);
    }
  };

  return (
    <div data-testid="invite-member-wrapper" className={styles.container}>
      <Button
        data-testid="invite-member-button"
        icon="plus"
        className={styles.inviteButton}
        onClick={handleInviteMemberClick}
      >
          {Messages.inviteMember}
      </Button>
      <Modal
        title={Messages.inviteMember}
        isVisible={isModalVisible}
        onClose={handleModalClose}
      >
        <Form onSubmit={handleInviteMemberSubmit}>
          {({ handleSubmit, valid, pristine }: FormRenderProps) => (
            <form onSubmit={handleSubmit} className={styles.inviteForm} data-testid="invite-member-form">
              <TextInputField name="email" label={Messages.email} validators={[emailValidator, required]} data-testid/>
              <Field name="role">
                {({ input }) => (
                  <>
                    <Label className={styles.roleSelectLabel}>{Messages.role}</Label>
                    <Select className={styles.roleSelect} options={ROLES} {...input} />
                  </>
                )}
              </Field>
              <LoaderButton
                data-testid="invite-member-submit-button"
                className={styles.saveButton}
                type="submit"
                loading={loading}
                disabled={!valid || loading || pristine}
              >
                {Messages.save}
              </LoaderButton>
            </form>
          )}
        </Form>
      </Modal>
    </div>
  );
};
