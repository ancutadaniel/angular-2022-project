import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActionsType
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      console.log(action.type, action.payload);
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      console.log(action.type, action.payload);
      const arr = action.payload[Symbol.iterator]();
      return {
        ...state,
        ingredients: [...state.ingredients, ...arr],
      };

    case ShoppingListActions.UPDATE_INGREDIENT: {
      console.log(action.type, action.payload);
      // find ingredient
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // update
      const updateIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.editedIngredientIndex] = updateIngredient;

      return {
        ...state,
        ingredients: updateIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }

    case ShoppingListActions.DELETE_INGREDIENT: {
      console.log(action.type, action.payload);
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_el, i) => i === state.editedIngredientIndex
        ),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }

    case ShoppingListActions.START_EDIT: {
      console.log(action.type, action.payload);
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      console.log(action.type, action.payload);
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }

    default:
      return state;
  }
}
