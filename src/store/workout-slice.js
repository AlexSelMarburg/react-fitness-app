import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    deleteSessionTemplate(state, action) {
      let key = action.payload;
      delete state[key];
    },

    addSessionTemplate(state, action) {
      return { ...state, [action.payload.ID]: action.payload };
    },

    addTemplateExercise(state, action) {
      const { ID, exerciseTemplate } = action.payload;
      const newState = {
        ...state,
        [ID]: {
          ...state[ID],
          templateExercises: [...state[ID].templateExercises, exerciseTemplate],
        },
      };

      return newState;
    },
    removeTemplateExercise(state, action) {
      const { sessionID, exerciseID } = action.payload;

      const newState = {
        ...state,
        [sessionID]: {
          ...state[sessionID],
          templateExercises: state[sessionID].templateExercises.filter(
            (ex) => ex.ID !== exerciseID
          ),
        },
      };

      return newState;
    },

    editTemplateExercise(state, action) {
      const {
        sessionID,
        exerciseID,
        name,
        description,
        maxReps,
        minReps,
        sets,
      } = action.payload;

      const newState = {
        ...state,
        [sessionID]: {
          ...state[sessionID],
          templateExercises: state[sessionID].templateExercises.map((ex) => {
            if (ex.ID === exerciseID) {
              return {
                ...ex,
                name,
                description,
                maxReps,
                minReps,
                sets,
              };
            } else return ex;
          }),
        },
      };

      return newState;
    },

    addProcessedSession(state, action) {
      const { sessionID, processedSession } = action.payload;
      const newState = {
        ...state,
        [sessionID]: {
          ...state[sessionID],
          processedSessions: [
            processedSession,
            ...state[sessionID].processedSessions,
          ],
        },
      };

      return newState;
    },

    deleteProcessedSession(state, action) {
      const { templateSessionID, ID } = action.payload;

      const newState = {
        ...state,
        [templateSessionID]: {
          ...state[templateSessionID],
          processedSessions: state[templateSessionID].processedSessions.filter(
            (ps) => ps.ID !== ID
          ),
        },
      };

      return newState;
    },

    addExerciseSet(state, action) {
      const {
        templateSessionID,
        processedSessionID,
        processedExerciseID,
        set,
      } = action.payload;

      //TODO: Mutationen triggern kein react state eval.  ...warum???

      const pSessions = [...state[templateSessionID].processedSessions];
      const newState = {
        ...state,
        [templateSessionID]: {
          ...state[templateSessionID],
          processedSessions: [
            ...pSessions.map((ps) => {
              if (ps.ID === processedSessionID) {
                const pExercises = ps.processedExercises.map((pe) => {
                  if (pe.ID === +processedExerciseID) {
                    return { ...pe, sets: [...pe.sets, set] };
                  }

                  return pe;
                });

                return {
                  ...ps,
                  processedExercises: pExercises,
                };
              }

              return ps;
            }),
          ],
        },
      };

      return newState;
    },

    removeExerciseSet(state, action) {
      const {
        templateSessionID,
        processedSessionID,
        processedExerciseID,
        setIndex,
      } = action.payload;

      const pSessions = [...state[templateSessionID].processedSessions];
      const newState = {
        ...state,
        [templateSessionID]: {
          ...state[templateSessionID],
          processedSessions: [
            ...pSessions.map((ps) => {
              if (ps.ID === processedSessionID) {
                const pExercises = ps.processedExercises.map((pe) => {
                  if (pe.ID === +processedExerciseID) {
                    return {
                      ...pe,
                      sets: pe.sets.filter((set, index) => {
                        return index !== setIndex;
                      }),
                    };
                  }

                  return pe;
                });

                return {
                  ...ps,
                  processedExercises: pExercises,
                };
              }

              return ps;
            }),
          ],
        },
      };

      return newState;
    },
  },
});

export const workoutActions = workoutSlice.actions;
export default workoutSlice.reducer;
