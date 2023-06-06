const bmiTableMale = [
  {
    minBMI: 0,
    maxBMI: 18.49,
    status: "Untergewicht",
  },
  {
    minBMI: 18.5,
    maxBMI: 19.49,
    status: "Leichtes Untergewicht",
  },
  {
    minBMI: 19.5,
    maxBMI: 24.99,
    status: "Normalgewicht ",
  },
  {
    minBMI: 25,
    maxBMI: 27.49,
    status: "Beginnende Fettleibigkeit Stufe 1",
  },
  {
    minBMI: 27.5,
    maxBMI: 29.99,
    status: "Beginnende Fettleibigkeit Stufe 2",
  },
  {
    minBMI: 30,
    maxBMI: 32.49,
    status: "Adipositas Grad I Stufe 1",
  },
  {
    minBMI: 32.5,
    maxBMI: 34.99,
    status: "Adipositas Grad I Stufe 2",
  },
  {
    minBMI: 35,
    maxBMI: 37.49,
    status: "Adipositas Grad II Stufe 1",
  },
  {
    minBMI: 37.5,
    maxBMI: 39.99,
    status: "Adipositas Grad II Stufe 2",
  },
  {
    minBMI: 40,
    maxBMI: 100, // (60)
    status: "Adipositas Grad III",
  },
];

const bmiTableFemale = [
  {
    minBMI: 0,
    maxBMI: 17.99,
    status: "Untergewicht",
  },
  {
    minBMI: 18,
    maxBMI: 18.49,
    status: "Leichtes Untergewicht",
  },
  {
    minBMI: 18.5,
    maxBMI: 23.99,
    status: "Normalgewicht ",
  },
  {
    minBMI: 24,
    maxBMI: 26.49,
    status: "Beginnende Fettleibigkeit Stufe 1",
  },
  {
    minBMI: 26.5,
    maxBMI: 28.99,
    status: "Beginnende Fettleibigkeit Stufe 2",
  },
  {
    minBMI: 29,
    maxBMI: 31.49,
    status: "Adipositas Grad I Stufe 1",
  },
  {
    minBMI: 31.5,
    maxBMI: 33.99,
    status: "Adipositas Grad I Stufe 2",
  },

  {
    minBMI: 34,
    maxBMI: 36.49,
    status: "Adipositas Grad II Stufe 1",
  },
  {
    minBMI: 36.5,
    maxBMI: 38.99,
    status: "Adipositas Grad II Stufe 2",
  },
  {
    minBMI: 39,
    maxBMI: 100, // (60)
    status: "Adipositas Grad III",
  },
];

export const getBmiStatus = (bmi, gender = "male") => {
  let bmiRangeObj = (gender === "male" ? bmiTableMale : bmiTableFemale).find(
    (bmiRange) => {
      return bmi >= bmiRange.minBMI && bmi <= bmiRange.maxBMI;
    }
  );

  return bmiRangeObj.status;
};

export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;
  return Number(bmi.toFixed(2));
};

// Harris-Benedict-Formel
export const calculateBMR = (gender, weight, height, age) => {
  let bmr;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else if (gender === "female") {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  } else {
    return null;
  }
  return bmr;
};

export const physicalActivityLevels = [
  {
    label: "Sitzend",
    value: "sitzend",
    palValue: 1.2,
  },
  {
    label: "Leicht aktiv",
    value: "leicht aktiv",
    palValue: 1.375,
  },
  {
    label: "Mäßig aktiv",
    value: "mäßig aktiv",
    palValue: 1.55,
  },
  {
    label: "Sehr aktiv",
    value: "sehr aktiv",
    palValue: 1.725,
  },
  {
    label: "Sehr stark aktiv",
    value: "sehr stark aktiv",
    palValue: 1.9,
  },
];

export const calculateTotalDailyEnergyExpenditure = (
  physicalActivityLevel = "mäßig aktiv",
  BMR
) => {
  return (
    physicalActivityLevels.find((obj) => obj.value === physicalActivityLevel)
      .palValue * BMR
  ).toFixed();
};

export const GOAL_CALORIES_INFO = `Die Anzahl der Kalorien, die täglich erreicht bzw nicht überschritten werden soll.
`;

export const GOAL_PROTEIN_INFO = `Die Tägliche Zielprotein-Menge.
`;
export const GOAL_FAT_INFO = `Die Tägliche Fett-Menge.
`;
export const GOAL_CARBS_INFO = `Die Tägliche Kohlenhydrate-Menge.
`;

export const BMI_INFO = (
  <>
    <p>
      Die Beurteilung des Gewichts von Leistungssportlern, Bodybuildern,
      Schwangeren und stillenden Müttern sowie von Kindern und Jugendlichen kann
      nicht allein auf Basis des Body-Mass-Index{" "}
      <b className="highlight-text">(BMI)</b> erfolgen.
    </p>
    <br />
    <p>
      Im höheren Alter sollte ein etwas höherer{" "}
      <b className="highlight-text">BMI</b> als normalgewichtig betrachtet
      werden! Die angewandte Berechnung berücksichtigt das Alter nicht!
    </p>
  </>
);

export const BMR_INFO = (
  <>
    <p>
      Der <b className="highlight-text">Kalorien-Grundumsatz</b> (berechnet nach
      der Harris-Benedict-Formel) beschreibt die Energiemenge, die der Körper
      benötigt, um grundlegende lebenserhaltende Funktionen wie Zellaufbau,
      Körpertemperatur, Herzschlag, Atmung und Eiweißsynthese im Ruhezustand
      aufrechtzuerhalten.{" "}
    </p>
    <br />
    <p>
      Es ist die minimale Energiemenge, die der Körper benötigt, um{" "}
      <b className="highlight-text">normal</b> zu funktionieren und sollte bei
      einer Diät nicht unterschritten werden (Diät bedeutet nicht bewusstes
      Fasten).
    </p>
    <br />
    <p>
      <b className="highlight-text">Beachten Sie bitte: </b>Personen mit einem
      höheren Muskelanteil haben in der Regel einen höheren Grundumsatz als
      berechnet.
    </p>
  </>
);

export const PAL_INFO = (
  <>
    <h3 className="highlight-text">sitzend:</h3>
    <p>wenig oder keine Bewegung</p>
    <br />
    <h3 className="highlight-text">leicht aktiv:</h3>
    <p>leichte körperliche Aktivität/Sport 1-3 Tage/Woche</p>
    <br />
    <h3 className="highlight-text">mäßig aktiv:</h3>
    <p>moderate körperliche Aktivität/Sport an 3-5 Tagen/Woche</p>
    <br />
    <h3 className="highlight-text">sehr aktiv:</h3>
    <p>starke körperliche Aktivität/Sport an 6-7 Tagen/Woche</p>
    <br />
    <h3 className="highlight-text">sehr stark aktiv:</h3>
    <p>
      sehr starke tägliche körperliche Aktivität/Sport oder 2X tägliches
      Training
    </p>
  </>
);

export const TEE_INFO = (
  <p>
    Die <b className="highlight-text">Schätzung</b> des täglichen
    Kalorienbedarfs bezieht sich auf die ungefähre Menge an Kalorien, die
    erforderlich ist, um das aktuelle Körpergewicht zu HALTEN
  </p>
);
