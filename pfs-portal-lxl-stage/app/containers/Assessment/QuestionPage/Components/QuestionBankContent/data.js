const data = [
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox',
    open: false,
    value: [],
    options: [],
  },
  {
    id: 'class',
    label: 'Class',
    type: 'checkbox',
    open: false,
    value: [],
    options: [
      {
        label: 'Class III',
        value: 'classIII',
      },
      {
        label: 'Class IV',
        value: 'classIV',
      },
      {
        label: 'Class V',
        value: 'classV',
      },
    ],
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'radio',
    open: false,
    value: '',
    options: [
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'Hindi',
        value: 'hindi',
      },
      {
        label: 'Mathematics',
        value: 'matematics',
      },
      {
        label: 'Science',
        value: 'science',
      },
    ],
  },
  {
    id: 'chapter',
    label: 'Chapter',
    type: 'checkbox',
    open: true,
    value: '',
    options: [
      {
        label: 'Stars and the Solar System',
        value: 'stars',
      },
      {
        label: 'Friction',
        value: 'friction',
      },
      {
        label: 'Sound',
        value: 'sound',
      },
      {
        label: 'Nutrition in Plants Class',
        value: 'nutrition',
      },
      {
        label: 'Respiration in Organisms',
        value: 'Respirations',
      },
      {
        label: 'Materials: Metals & Non-Metals',
        value: 'materials_metals_&_nonmetals',
      },
    ],
  },
  {
    id: 'topic',
    label: 'Topic',
    type: 'checkbox',
    open: false,
    value: '',
    options: [
      {
        label: 'Stars and the Solar System',
        value: 'stars',
      },
      {
        label: 'Friction',
        value: 'friction',
      },
      {
        label: 'Sound',
        value: 'sound',
      },
      {
        label: 'Nutrition in Plants Class',
        value: 'nutrition',
      },
      {
        label: 'Respiration in Organisms',
        value: 'Respirations',
      },
      {
        label: 'Materials: Metals & Non-Metals',
        value: 'materials_metals_&_nonmetals',
      },
    ],
  },
];

export default data;
