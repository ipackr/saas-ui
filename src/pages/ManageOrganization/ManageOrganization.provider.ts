import { createContext } from 'react';
import { ManageOrganizationContext } from './ManageOrganization.types';

export const ManageOrganizationProvider = createContext<ManageOrganizationContext>(
  {} as ManageOrganizationContext,
);
