import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import EditRecipe from '../components/EditRecipe';
import * as actions from '../actions';
import * as api from '../data/api';
import * as constants from '../constants';

const mapStateToProps = (state) => {
	return {
		recipeDetails: state.recipeDetails,
		isFetching: state.isFetching
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRecipeDetails: (recipeId, recipeType) => {
			dispatch(actions.fetchStarted());
			api.loadRecipeDetails(recipeId, recipeType)
				.then((recipeDetails) => {
					dispatch(actions.fetchFinished());
					dispatch(actions.loadRecipeDetailsSuccess(recipeDetails));
				}).catch(() => {
					// some error
				});
		},
		editRecipeDetails: (recipeId, recipeType, recipe) => {
			api.editRecipeDetails(recipeId, recipeType, recipe)
				.then(() => {
					// success
				}).catch(() => {
					// some error
				});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);