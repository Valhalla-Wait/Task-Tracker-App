import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { CompletedListActions, RootStateType, Types } from 'store';

export const fetchAll = createAsyncThunk(
  'CompletedList/fetchAll',
  async (params: Types.CardListFetchParamsType, { rejectWithValue, getState, dispatch }) => {
    const {
      data: { pagination },
      sort,
    } = (getState() as RootStateType).сompletedList;
    const filterParams = (getState() as RootStateType).filter.filters;

    if (params.sort) dispatch(CompletedListActions.setSortAction(params.sort));

    try {
      const response = await makeRequest<Types.FetchTasksResponseType>({
        url: 'task/tasks',
        params: {
          page: pagination.page_current,
          per_page: pagination.per_page,
          sort,
          ...filterParams,
          ...params,
          status_id: '8536592a-7340-4e10-ac4b-a280652c9310',
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
