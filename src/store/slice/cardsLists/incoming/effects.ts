import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { IncomingListActions, RootStateType, Types } from 'store';

export const fetchAll = createAsyncThunk(
  'IncomingList/fetchAll',
  async (params: Types.CardListFetchParamsType, { rejectWithValue, getState, dispatch }) => {
    const {
      data: { pagination },
      sort,
    } = (getState() as RootStateType).incomingList;
    const filterParams = (getState() as RootStateType).filter.filters;

    if (params.sort) dispatch(IncomingListActions.setSortAction(params.sort));

    try {
      const response = await makeRequest<Types.FetchTasksResponseType>({
        url: 'task/tasks',
        params: {
          page: pagination.page_current,
          per_page: pagination.per_page,
          sort,
          ...filterParams,
          ...params,
          status_id: 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2',
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
