import { te } from "date-fns/locale";

export class SessionTemplate {
  constructor(name) {
    this.name = name;
    this.ID = new Date().getTime() + name;
    this.templateExercises = [];
    this.processedSessions = [];
  }
}

export class TemplateExercise {
  constructor(name, description, minReps, maxReps, sets) {
    this.name = name;
    this.description = description;
    this.minReps = minReps;
    this.maxReps = maxReps;
    this.setsCount = sets;
    this.ID = new Date().getTime() + name;
  }
}

export class ProcessedSession {
  constructor(date, ID, templateExercises) {
    this.date = date;
    this.ID = ID;
    this.processedExercises = [];
    this.populateProcessedExercises(templateExercises);
  }

  populateProcessedExercises(templateExercises) {
    templateExercises.forEach((templateExercise, index) => {
      this.processedExercises.push(
        new ProcessedExercise(templateExercise.ID, index)
      );
    });
  }
}

export class ProcessedExercise {
  constructor(parentTemplateExerciseID, ID) {
    this.parentTemplateExerciseID = parentTemplateExerciseID || null;
    this.sets = [];
    this.ID = ID;
  }
}

export class Set {
  constructor(reps, weight) {
    this.reps = reps;
    this.weight = weight;
  }
}
