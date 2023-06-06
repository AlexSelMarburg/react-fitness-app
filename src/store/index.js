import { configureStore, combineReducers } from "@reduxjs/toolkit";
import profileReducer from "./profile-slice";
import bodyWeightsReducer from "./bodyWeights-slice";
import settingsReducer from "./settings-slice";
import nutritionReducer from "./nutrition-slice";
import targetDailyNutritionReducer from "./targetDailyNutrition-slice";
import workoutReducer from "./workout-slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  profile: profileReducer,
  bodyWeights: bodyWeightsReducer,
  settings: settingsReducer,
  nutrition: nutritionReducer,
  targetDailyNutrition: targetDailyNutritionReducer,
  workout: workoutReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
