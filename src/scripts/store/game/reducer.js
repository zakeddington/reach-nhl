// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

// import _ from 'lodash';
// import * as types from './actionTypes';
import immutable from 'seamless-immutable';

const initialState = immutable({
  gameDetail: true
  // gamesAll: undefined,
  // selectedGameUrl: [],
  // selectionFinalized: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case 'what':
      return state.merge({
        gameDetail: action.gamesAll
      });
    // case types.SCHEDULE_FETCHED:
    //   return state.merge({
    //     gamesAll: action.gamesAll
    //   });
    // case types.GAMES_SELECTED:
    //   return state.merge({
    //     selectedGameUrl: action.selectedGameUrl
    //   });
    // case types.GAMES_SELECTION_FINALIZED:
    //   return state.merge({
    //     selectionFinalized: true
    //   });
    default:
      return state;
  }
}

// selectors

// export function getGames(state) {
//   console.log(state);
//   const gamesAll = state.schedule.gamesAll;
//   const topicsUrlArray = _.keys(gamesAll);
//   return [gamesAll, topicsUrlArray];
// }
//
// export function getSelectedGameUrl(state) {
//   return state.schedule.selectedGameUrl;
// }
//
// export function getSelectedTopicsByUrl(state) {
//   return _.mapValues(_.keyBy(state.schedule.selectedGameUrl), (topicUrl) => state.schedule.gamesAll[topicUrl]);
// }
//
// export function isGameSelectionValid(state) {
//   return state.schedule.selectedGameUrl.length === 1;
// }
//
// export function isGameSelectionFinalized(state) {
//   return state.schedule.selectionFinalized;
// }
