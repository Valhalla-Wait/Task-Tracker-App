import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { AtWorkListActions, RootStateType, Types } from 'store';

export const fetchAll = createAsyncThunk(
  'AtWorkList/fetchAll',
  async (params: Types.CardListFetchParamsType, { rejectWithValue, getState, dispatch }) => {
    const {
      data: { pagination },
      sort,
    } = (getState() as RootStateType).atWorkList;
    const filterParams = (getState() as RootStateType).filter.filters;

    if (params.sort) dispatch(AtWorkListActions.setSortAction(params.sort));

    try {
      const response = await makeRequest<Types.FetchTasksResponseType>({
        url: 'task/tasks',
        params: {
          page: pagination.page_current,
          per_page: pagination.per_page,
          sort,
          ...filterParams,
          ...params,
          status_id: '372d63ff-3ae3-4be2-a606-38940d7f8c8f',
        },
      });

      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
