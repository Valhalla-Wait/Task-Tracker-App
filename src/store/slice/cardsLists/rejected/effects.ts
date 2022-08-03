import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { RejectedListActions, RootStateType, Types } from 'store';

export const fetchAll = createAsyncThunk(
  'RejectedList/fetchAll',
  async (params: Types.CardListFetchParamsType, { rejectWithValue, getState, dispatch }) => {
    const {
      data: { pagination },
      sort,
    } = (getState() as RootStateType).rejectedList;
    const filterParams = (getState() as RootStateType).filter.filters;

    if (params.sort) dispatch(RejectedListActions.setSortAction(params.sort));

    try {
      const response = await makeRequest<Types.FetchTasksResponseType>({
        url: 'task/tasks',
        params: {
          page: pagination.page_current,
          per_page: pagination.per_page,
          sort,
          ...filterParams,
          ...params,
          status_id: '4658859a-32a6-4206-838a-c0064f147299',
        },
      });

      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
