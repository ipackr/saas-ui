import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Button, useStyles, HorizontalGroup } from '@grafana/ui';
import { CheckboxField, RadioButtonGroupField, TextInputField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const { required } = validators;
const options1 = [
  { label: 'Lowest', value: 'lowest' },
  { label: 'Medium', value: 'medium', disabled: true, icon: 'clock' },
  { label: 'High retention with a long label', value: 'high' },
];
const initialValues1 = { retention: 'lowest' };
/* eslint-disable-next-line no-alert,no-magic-numbers */
const prettify = (values: any) => () => alert(`Submit values:\n${JSON.stringify(values, null, 2)}`);

const RadioButtonGroupState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit} initialValues={initialValues1}>
      {({ form, handleSubmit, invalid, pristine, values }: FormRenderProps) => (
        <form data-testid="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L9-L47"
            state="State: [elem1: enabled, elem2: disabled, elem3: enabled], validation: required, initialValue: 'lowest'"
          />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options1}
            validators={[required]}
            required
          />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)} disabled={invalid}>Submit</Button>
            <Button type="reset" variant="secondary" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

const options2 = [
  { label: 'Lowest', value: 'lowest' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'High' },
  { label: 'Highest', value: 'highest', icon: 'clock' },
];
const initialValues2 = { retention: 'highest' };

const RadioButtonGroupState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit} initialValues={initialValues2}>
      {({ form, handleSubmit, invalid, pristine, values }: FormRenderProps) => (
        <form data-testid="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L49-L85"
            state="State: all enabled, validation: required, initialValue: 'highest'"
          />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options2}
            validators={[required]}
            required
          />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)} disabled={invalid}>Submit</Button>
            <Button type="reset" variant="secondary" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

const options3 = [
  { label: 'Lowest', value: 'lowest', icon: 'bolt' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Highest', value: 'highest', icon: 'clock' },
];

const RadioButtonGroupState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ form, handleSubmit, invalid, pristine, values }: FormRenderProps) => (
        <form data-testid="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L87-L122"
            state="State: all enabled, validation: required, initialValue: undefined"
          />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options3}
            validators={[required]}
            required
          />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)} disabled={invalid}>Submit</Button>
            <Button type="reset" variant="secondary" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

const options4 = [
  { label: 'Lowest', value: 'lowest', icon: 'bolt' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Highest', value: 'highest', icon: 'clock', disabled: true },
];

const RadioButtonGroupState4: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ form, handleSubmit, invalid, pristine, values }: FormRenderProps) => (
        <form data-testid="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L124-L157"
            state="State: all but elem4 enabled, validation: undefined, initialValue: undefined"
          />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options4}
          />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)} disabled={invalid}>Submit</Button>
            <Button type="reset" variant="secondary" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

const options5 = [
  { label: 'Lowest', value: 'lowest', icon: 'bolt' },
  { label: 'Medium', value: 'medium', icon: 'arrow-right' },
  { label: 'High', value: 'high', icon: 'arrow-up' },
  { label: 'Highest', value: 'highest', icon: 'clock' },
];
const initialValues5 = { retention: 'medium', frequency: 'medium', policy: 'Moderate', fullWidth: true };

const RadioButtonGroupState5: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit} initialValues={initialValues5}>
      {({ form, handleSubmit, invalid, pristine, values }: FormRenderProps) => (
        <form data-testid="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L159-L204"
            state="State: all disabled, validation: undefined, initialValue: medium, extra: fullWidth toggle"
          />
          <RadioButtonGroupField
            name="frequency"
            label="Frequency"
            options={options5}
            disabled
            fullWidth={values.fullWidth}
          />
          <TextInputField name="policy" label="Retention policy" required validators={[required]} />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options5}
            disabled
            fullWidth={values.fullWidth}
          />
          <CheckboxField name="fullWidth" label="Toggle fullWidth" />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)} disabled={invalid}>Submit</Button>
            <Button type="reset" variant="secondary" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

export const RadioButtonGroups: FC = () => (
  <>
    <Heading title="RadioButtonGroup" />
    <RadioButtonGroupState1 />
    <RadioButtonGroupState2 />
    <RadioButtonGroupState3 />
    <RadioButtonGroupState4 />
    <RadioButtonGroupState5 />
  </>
);
