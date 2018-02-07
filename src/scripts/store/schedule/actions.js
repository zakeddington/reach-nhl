// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

// import _ from 'lodash';
import * as types from './actionTypes';
import nhlService from '../../services/nhl';
// import * as gamesSelectors from './reducer';
// import * as postActions from '../posts/actions';

export function fetchGames(dateFrom, dateTo) {
	return async(dispatch, getState) => {
		try {
			const games = await nhlService.getAllGames(dateFrom, dateTo);
			// const topicsByUrl = _.keyBy(games, (subreddit) => subreddit.url);

			console.log('fetchGames', games);

			dispatch({ type: types.SCHEDULE_FETCHED, games });
		} catch (error) {
			console.error(error);
		}
	};
}

export function fetchCalendar() {
	return async(dispatch, getState) => {
		try {
			const calendar = await nhlService.getCalendar();
			// const topicsByUrl = _.keyBy(games, (subreddit) => subreddit.url);

			console.log('getCalendar', calendar);

			dispatch({ type: types.CALENDAR_FETCHED, calendar });
		} catch (error) {
			console.error(error);
		}
	};
}

// export function selectGame(gameUrl) {
//   return (dispatch, getState) => {
//     const selectedGames = gamesSelectors.getSelectedTopicUrls(getState());
//     let newSelectedGames;
//     if (_.indexOf(selectedGamess, gameUrl) !== -1) {
//       newSelectedGames = _.without(selectedGamess, gameUrl);
//     } else {
//       newSelectedGames = selectedGamess.length < 3 ?
//         selectedGamess.concat(gameUrl) :
//         selectedGamess.slice(1).concat(gameUrl);
//     }
//     dispatch({ type: types.GAME_SELECTED, selectedTopicUrls: newSelectedGames  });
//     // optimization - prefetch the posts before going to the posts screen
//     if (newSelectedGames.length === 3) {
//       dispatch(postActions.fetchPosts());
//     }
//   };
// }
