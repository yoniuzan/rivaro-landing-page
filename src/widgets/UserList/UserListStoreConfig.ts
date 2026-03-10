/**
 * UserList Widget Store Configuration
 * Configuration for integrating the widget into the store
 */

import { userListSlice } from './UserListStoreSlice';
import { userListApi } from './UserListApi';

export const userListStoreConfig = {
  reducer: {
    [userListSlice.name]: userListSlice.reducer,
    [userListApi.reducerPath]: userListApi.reducer,
  },
  middleware: [userListApi.middleware],
};

export default userListStoreConfig;

