import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import Layout from "./components/UI/Layout/Layout";
import NutritionPage from "./pages/NutritionPage/NutritionPage";
import WeightPage from "./pages/WeightPage/WeightPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import ProfilPage from "./pages/ProfilPage/ProfilPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from "./store/settings-slice";
import CreateProfilePage from "./pages/CreateProfilePage/CreateProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SessionPage from "./pages/SessionPage/SessionPage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import ProcessedSessionsPage from "./pages/ProcessedSessionsPage/ProcessedSessionsPage";

function App() {
  const { navbarTheme } = useSelector((state) => state.settings);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    document.querySelector("body").className = navbarTheme;
  }, [navbarTheme]);

  // -----------------------
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(settingsActions.isNavbarDisabled(false));
  }, []);
  // -----------------------

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={profile ? <NutritionPage /> : <CreateProfilePage />}
          />
          <Route path="/weight" element={<WeightPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/training/:templateSessionID/:processedSessionID"
            element={<SessionPage />}
          />
          <Route
            path="/training/:templateSessionID/exercise/:templateExerciseID/:processedSessionID/:processedExerciseID/:processedExerciseIndex"
            element={<ExercisePage />}
          />
          <Route
            path="/training/processedSessions/:sessionID"
            element={<ProcessedSessionsPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </div>
  );
}
export default App;
