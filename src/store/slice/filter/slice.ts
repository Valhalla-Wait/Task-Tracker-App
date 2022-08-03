import { createSlice } from '@reduxjs/toolkit';
import { statusesId } from '../statuses/types';

import {
  setSearchAction as setSearch,
  removeSearchAction as removeSearch,
  setMembersAction as setMembers,
  removeMembersAction as removeMembers,
  setStatusAction as setStatus,
  setTagsAction as setTags,
  removeTagsAction as removeTags,
  setAttachmentAction as setAttachment,
  removeAttachmentAction as removeAttachment,
  setPrioritiesAction as setPriorities,
  removePrioritiesAction as removePriorities,
  setAssignToMeAction as setAssignToMe,
  removeAssignToMeAction as removeAssignToMe,
  resetFiltersAction as resetFilters,
  setFiltersFromLocalStorageAction as setFiltersFromLocalStorage,
  setAllFiltersAction as setAllFilters,
} from './actions';
import { FilterReducerType } from './types';

export const initialState: FilterReducerType = {
  filters: {},
  status: [
    statusesId.created,
    statusesId.inWork,
    statusesId.completed,
    statusesId.notCompleted,
    statusesId.rejected,
  ],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch,
    removeSearch,
    setMembers,
    removeMembers,
    setStatus,
    setTags,
    removeTags,
    setAttachment,
    removeAttachment,
    setPriorities,
    removePriorities,
    setAssignToMe,
    removeAssignToMe,
    resetFilters,
    setFiltersFromLocalStorage,
    setAllFilters,
  },
});
