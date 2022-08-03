import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { NotCompletedListActions, RootStateType, Types } from 'store';

export const fetchAll = createAsyncThunk(
  'NotCompletedList/fetchAll',
  async (params: Types.CardListFetchParamsType, { rejectWithValue, getState, dispatch }) => {
    const {
      data: { pagination },
      sort,
    } = (getState() as RootStateType).notCompletedList;
    const filterParams = (getState() as RootStateType).filter.filters;

    if (params.sort) dispatch(NotCompletedListActions.setSortAction(params.sort));

    try {
      const response = await makeRequest<Types.FetchTasksResponseType>({
        url: 'task/tasks',
        params: {
          page: pagination.page_current,
          per_page: pagination.per_page,
          sort,
          ...filterParams,
          ...params,
          status_id: '599f5d03-1ef0-4a5b-a18c-33a4f44c4610',
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
