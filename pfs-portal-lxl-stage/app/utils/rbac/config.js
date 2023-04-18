import { Authorizer } from 'casbin.js';

// Can be used for default settings if not provided in config

const permsDef = {
  Parent: {
    reportsCard: ['view'],
  },
  Student: {
    reportsCard: ['view'],
    marketsPlace: ['view'],
    events: ['view'],
    courseContent: ['view'],
    timetable: ['view'],
    students: ['view'],
    exams: ['view'],
    myStudents: ['view'],
    miscellaneous: ['view'],
    enroll: ['view'],
    feePayment: ['view'],
    attendance: ['view'],
    eventsModified: ['view'],
    dashboard: ['view'],
  },
  Faculty: {
    grades: ['view'],
    assessments: ['add'],
    marketsPlace: ['view'],
    events: ['view'],
    courseContent: ['view'],
    timetable: ['view'],
    studentsByOffering: ['view'],
    myFeedback: ['view'],
    facultyServices: ['view'],
    facultyAcademics: ['view'],
    workload: ['view'],
    attendance: ['view'],
    eventsModified: ['view'],
  },
  'Class Teacher': {
    myStudents: ['view'],
    myStudents_Reports: ['view'],
    myStudents_ConsolidatedGrades: ['view'],
    reports_scholastic: ['edit'],
    reports_coscholastic: ['edit'],
    studentsByOffering: ['view'],
  },
};

export const authorizer = new Authorizer('manual');

export function defineRulesFor(config, roles = []) {
  // perms should be of format
  // {myStudents: ['view']}

  const configPerms = config?.RBAC || {};

  const perms = { ...permsDef };

  Object.entries(configPerms).forEach(([personaKey, personaObj]) => {
    // Class Teacher
    if (perms[personaKey]) {
      Object.entries(personaObj || {}).forEach(
        ([featureKey, permsArray = []]) => {
          const pA = perms[personaKey][featureKey] || [];
          perms[personaKey][featureKey] = pA.filter(
            action => !permsArray.includes(action)
          );
        }
      );
    }
  });
  const finalPerms = {};
  roles.forEach(role => {
    const permissions = perms[role] || [];
    Object.entries(permissions).forEach(([key, value]) => {
      finalPerms[key] = [...value];
    });
  });
  authorizer.setPermission(finalPerms);
  return finalPerms;
}

export const isFeatureAllowed = (feature, action) => {
  return authorizer.can(feature, action);
};
