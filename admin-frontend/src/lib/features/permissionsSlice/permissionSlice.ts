import { createSlice, PayloadAction } from '@reduxjs/toolkit';



// Define a type for a single permission item
type Permission = {
  moduleName: string;
  moduleSlug: string;
  moduleValue: boolean;
  view: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
};

// Define the state type
type PermissionsState = {
  permissions: Permission[];
};


const initialState: PermissionsState = {
  permissions: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<Permission[]>) {
      state.permissions = action.payload;
    },
  },
});

export const { setPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
