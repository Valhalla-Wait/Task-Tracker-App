import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ModalReviewOneTask, ErrorModalOneTask, SpinLoading } from 'features';
import {
  AtWorkListEffects,
  CompletedListEffects,
  countSubscribesEffects,
  FilterActions,
  FilterSelectors,
  IncomingListEffects,
  NotCompletedListEffects,
  OneTaskSelectors,
  PrioritiesEffects,
  ProfileEffects,
  RejectedListEffects,
  StatusesEffects,
  subscribesEffects,
  TagsEffects,
  UsersEffects,
} from 'store';
import { Helpers } from 'shared';
import { FilterPanel } from './FilterPanel';
import { MobileHeader } from './MobileHeader';
import { TasksCategoryesComponent } from './TasksWrapper/TasksCategoryes';
import { Header } from './TasksWrapper/Header';

export const Main = () => {
  const dispatch = useDispatch();
  const userId = Helpers.Cookies.getUserIdCookies();

  const status = useSelector(OneTaskSelectors.oneTaskStatusSelector);
  const filters = useSelector(FilterSelectors.filters);
  const allFilters = useSelector(FilterSelectors.allFilters);

  useEffect(() => {
    dispatch(countSubscribesEffects.fetchCountSubscribes());
    dispatch(subscribesEffects.fetchSubscribes());
    dispatch(StatusesEffects.fetchStatuses());
    dispatch(PrioritiesEffects.fetchPriorities());
    dispatch(ProfileEffects.fetchUserProfile(userId));
    dispatch(TagsEffects.fetchTags());
    dispatch(UsersEffects.fetchUsers());
    dispatch(FilterActions.setFiltersFromLocalStorage());
  }, []);

  useEffect(() => {
    dispatch(AtWorkListEffects.fetchAll({}));
    dispatch(NotCompletedListEffects.fetchAll({}));
    dispatch(IncomingListEffects.fetchAll({}));
    dispatch(CompletedListEffects.fetchAll({}));
    dispatch(RejectedListEffects.fetchAll({}));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(allFilters));
  }, [allFilters]);

  return (
    <Wrap>
      <MobileHeader />
      {/* visible at 645px */}
      <FilterPanel />
      <TasksWrapper>
        <Content>
          <Header />
          <TasksCategoryesComponent />
          {status === 'loading' && <SpinLoading />}
          {status === 'success' && <ModalReviewOneTask />}
          {status === 'fail' && <ErrorModalOneTask />}
        </Content>
      </TasksWrapper>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr;

  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }

  @media (max-width: 645px) {
    grid-template-columns: none;
    grid-template-rows: auto 1fr;
  }
`;

const TasksWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  width: 100%;
  background: var(--color-grey100);
  overflow: auto;

  @media (max-width: 645px) {
    min-height: calc(100vh - 55px);
  }
`;

const Content = styled.div`
  display: grid;
  padding: 23px 37px 30px;
  grid-template-rows: auto 1fr;
  row-gap: 30px;
  min-height: 100%;

  @media (max-width: 645px) {
    padding: 10px 10px 0;
    row-gap: 16px;
  }
`;
