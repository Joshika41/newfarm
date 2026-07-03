import { Task, User, ActivityLog, WeatherData, Issue, Notification } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'emp_david',
    name: 'David',
    username: 'David',
    role: 'employee',
    assigned_checklists: ['vehicles', 'birds', 'fish'],
  },
  {
    id: 'emp_kalyan',
    name: 'Kalyan',
    username: 'Kalyan',
    role: 'employee',
    assigned_checklists: ['vehicles'],
  },
  {
    id: 'emp_selvaraj',
    name: 'Selvaraj',
    username: 'Selvaraj',
    role: 'employee',
    assigned_checklists: ['vehicles'],
  },
  {
    id: 'emp_savari',
    name: 'Savari',
    username: 'Savari',
    role: 'employee',
    assigned_checklists: ['vehicles', 'calves'],
  },
  {
    id: 'emp_vishwa',
    name: 'Vishwa',
    username: 'Vishwa',
    role: 'employee',
    assigned_checklists: ['vehicles'],
  },
  {
    id: 'emp_mani',
    name: 'Mani',
    username: 'Mani',
    role: 'employee',
    assigned_checklists: ['vehicles'],
  },
  {
    id: 'emp_shanmugam',
    name: 'Shanmugam',
    username: 'Shanmugam',
    role: 'employee',
    assigned_checklists: ['birds', 'fish', 'pond'],
  },
  {
    id: 'emp_raja',
    name: 'Raja',
    username: 'Raja',
    role: 'employee',
    assigned_checklists: ['health'],
  },
  {
    id: 'admin_jayanthi',
    name: 'Jayanthi',
    username: 'Jayanthi',
    role: 'admin',
    assigned_checklists: ['birds', 'fish', 'pond', 'health', 'calves', 'cow_shed', 'vehicles', 'maintenance'],
  },
  {
    id: 'owner_chairman',
    name: 'Chairman',
    username: 'Chairman',
    role: 'owner',
    assigned_checklists: ['birds', 'fish', 'pond', 'health', 'calves', 'cow_shed', 'vehicles', 'maintenance'],
  }
];

export const INITIAL_TASKS: Task[] = [
  // Birds tasks (14 tasks)
  {
    id: 'b1',
    title: 'Broccolli, Capsicum, Cabbage, Pomegranate, Corriander, Badham',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '7.00am-7.30am', frequency: 'Daily' }
  },
  {
    id: 'b2',
    title: 'Green Pairu & sun flower seed',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '10.00am to 10.30 am.', frequency: 'Daily' }
  },
  {
    id: 'b3',
    title: 'Carrot, Beans',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '1.00pm to 1.30 pm', frequency: 'Daily' }
  },
  {
    id: 'b4',
    title: 'Sweet Com',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '4.00pm to 4.40 pm', frequency: 'Daily' }
  },
  {
    id: 'b5',
    title: 'Apple & Papaya',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '07.30 pm to 8.00 pm', frequency: 'Daily' }
  },
  {
    id: 'b6',
    title: 'Sun Flower Seed',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '6.00pm', frequency: 'Daily' }
  },
  {
    id: 'b7',
    title: 'முளை கட்டிய பயிறு',
    category: 'birds',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: 'Morning, 7.30am', frequency: 'Daily' }
  },
  {
    id: 'b8',
    title: 'Cup Water Change',
    category: 'birds',
    subcategory: 'Water',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'medium',
    details: { time: '01.30 pm', frequency: 'Daily' }
  },
  {
    id: 'b9',
    title: 'Full Tray Cleaning work',
    category: 'birds',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '08.00 pm, 9.30am, 6.00pm', frequency: 'Daily' }
  },
  {
    id: 'b10',
    title: 'Bird Bath',
    category: 'birds',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'medium',
    details: { time: '', frequency: 'Weekly' }
  },
  {
    id: 'b11',
    title: 'Tray wash',
    category: 'birds',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'medium',
    details: { time: '', frequency: 'Weekly' }
  },
  {
    id: 'b12',
    title: 'Nail Cut',
    category: 'birds',
    subcategory: 'Notes',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'low',
    details: { time: '', frequency: 'Once in Three months' }
  },
  {
    id: 'b13',
    title: 'Feather Cut',
    category: 'birds',
    subcategory: 'Notes',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'low',
    details: { time: '', frequency: 'Once in Three months' }
  },
  {
    id: 'b14',
    title: 'Health Checkup',
    category: 'birds',
    subcategory: 'Vaccination',
    status: 'pending',
    assignedTo: 'Jenifer & David',
    priority: 'high',
    details: { time: '', frequency: 'by veterinary doctor' }
  },

  // Fish tasks (8 tasks)
  {
    id: 'f1',
    title: 'Feed fish twice only',
    category: 'fish',
    subcategory: 'Feeding',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'f2',
    title: 'Check water temperature',
    category: 'fish',
    subcategory: 'Water Quality',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'f3',
    title: 'Ensure filter and air pump are working',
    category: 'fish',
    subcategory: 'Oxygen',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'f4',
    title: 'Check Lighting',
    category: 'fish',
    subcategory: 'Notes',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'f5',
    title: 'Check water level and top up',
    category: 'fish',
    subcategory: 'Water Quality',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'medium',
    details: { time: '', frequency: 'Weekly' }
  },
  {
    id: 'f6',
    title: 'Deep clean gravel',
    category: 'fish',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'medium',
    details: { time: '', frequency: 'Monthly' }
  },
  {
    id: 'f7',
    title: 'Check heater and thermometer accuracy',
    category: 'fish',
    subcategory: 'Notes',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'medium',
    details: { time: '', frequency: 'Monthly' }
  },
  {
    id: 'f8',
    title: 'Cleaning the entire fish tank',
    category: 'fish',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & David',
    priority: 'high',
    details: { time: '', frequency: 'Monthly' }
  },

  // Pond tasks (8 tasks)
  {
    id: 'p1',
    title: '1st motor goes to cascade',
    category: 'pond',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'p2',
    title: '2nd motor goes to main pump',
    category: 'pond',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'p3',
    title: '3rd motor goes to (UV+Bio-filter)',
    category: 'pond',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'p4',
    title: '2nd & 3rd motor - should run (24/7)',
    category: 'pond',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'p5',
    title: '1st motor (cascade) - Morning (11am to 12pm) It has to run',
    category: 'pond',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'medium',
    details: { time: '11:00 AM - 12:00 PM', frequency: 'Daily' }
  },
  {
    id: 'p6',
    title: 'Fresh water changes -Daily',
    category: 'pond',
    subcategory: 'Water Level',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'p7',
    title: 'Water Changes every 3rd Week 80% of Water has to be removed & add back with fresh water (Buy a new motor later)',
    category: 'pond',
    subcategory: 'Water Level',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'high',
    details: { time: '', frequency: 'Every 3rd Week' }
  },
  {
    id: 'p8',
    title: 'Daily once feeding',
    category: 'pond',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Shanmugam',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },

  // Calves tasks - Linga & Kamadhenu (24 tasks)
  {
    id: 'c1',
    title: '[Linga] Feeding milk to the Calf near Krishnan Statue',
    category: 'calves',
    subcategory: 'Milk',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '06.30 a.m.', frequency: 'Daily' }
  },
  {
    id: 'c2',
    title: '[Linga] Pellets, Water and Grass (to be kept always near the calf)',
    category: 'calves',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '11.30 a.m.', frequency: 'Daily' }
  },
  {
    id: 'c3',
    title: '[Linga] Rice Bran (Thavadu) + Cattle feed Powder in Water',
    category: 'calves',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '01.00 p.m.', frequency: 'Daily' }
  },
  {
    id: 'c4',
    title: '[Linga] Feeding milk to the Calf near Krishnan Statue',
    category: 'calves',
    subcategory: 'Milk',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '05.30 p.m.', frequency: 'Daily' }
  },
  {
    id: 'c5',
    title: '[Linga] Shifting to Old Office',
    category: 'calves',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: '06.00 p.m.', frequency: 'Daily' }
  },
  {
    id: 'c6',
    title: '[Linga] Bath Wet Towel',
    category: 'calves',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'c7',
    title: '[Linga] Multivitamin (10ml) - As per Doctor Advice',
    category: 'calves',
    subcategory: 'Medicine',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'c8',
    title: '[Linga] Care best Shampoo',
    category: 'calves',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: 'Morning', frequency: 'Daily' }
  },
  {
    id: 'c9',
    title: '[Linga] Doctor Visit',
    category: 'calves',
    subcategory: 'Medicine',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: 'Weekly once' }
  },
  {
    id: 'c10',
    title: '[Linga] Vaccination-As per Doctor Advice',
    category: 'calves',
    subcategory: 'Vaccination',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: '' }
  },
  {
    id: 'c11',
    title: '[Linga] Deworming As per Doctor Advice',
    category: 'calves',
    subcategory: 'Medicine',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: '' }
  },
  {
    id: 'c12',
    title: '[Linga] Bath',
    category: 'calves',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'c13',
    title: '[Kamadhenu] Feeding milk to the Calf near Krishnan Statue',
    category: 'calves',
    subcategory: 'Milk',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '06.30 a.m.', frequency: 'Daily' }
  },
  {
    id: 'c14',
    title: '[Kamadhenu] Pellets, Water and Grass (to be kept always near the calf)',
    category: 'calves',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '11.30 a.m.', frequency: 'Daily' }
  },
  {
    id: 'c15',
    title: '[Kamadhenu] Rice Bran (Thavadu) + Cattle feed Powder in Water',
    category: 'calves',
    subcategory: 'Feed',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '01.00 p.m.', frequency: 'Daily' }
  },
  {
    id: 'c16',
    title: '[Kamadhenu] Feeding milk to the Calf near Krishnan Statue',
    category: 'calves',
    subcategory: 'Milk',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '05.30 p.m.', frequency: 'Daily' }
  },
  {
    id: 'c17',
    title: '[Kamadhenu] Shifting to Old Office',
    category: 'calves',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: '06.00 p.m.', frequency: 'Daily' }
  },
  {
    id: 'c18',
    title: '[Kamadhenu] Bath Wet Towel',
    category: 'calves',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'c19',
    title: '[Kamadhenu] Multivitamin (10ml) - As per Doctor Advice',
    category: 'calves',
    subcategory: 'Medicine',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'c20',
    title: '[Kamadhenu] Care best Shampoo',
    category: 'calves',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: 'Morning', frequency: 'Daily' }
  },
  {
    id: 'c21',
    title: '[Kamadhenu] Doctor Visit',
    category: 'calves',
    subcategory: 'Medicine',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: 'Weekly once' }
  },
  {
    id: 'c22',
    title: '[Kamadhenu] Vaccination As per Doctor Advice',
    category: 'calves',
    subcategory: 'Vaccination',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: '' }
  },
  {
    id: 'c23',
    title: '[Kamadhenu] Deworming As per Doctor Advice',
    category: 'calves',
    subcategory: 'Medicine',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'high',
    details: { time: '', frequency: '' }
  },
  {
    id: 'c24',
    title: '[Kamadhenu] Bath',
    category: 'calves',
    subcategory: 'Cleaning',
    status: 'pending',
    assignedTo: 'Shanmugam & Sabari',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },

  // Cow Shed tasks (4 tasks)
  {
    id: 'cs1',
    title: 'Light',
    category: 'cow_shed',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Sabari & Shanmugam',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'cs2',
    title: 'Fan',
    category: 'cow_shed',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Sabari & Shanmugam',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'cs3',
    title: 'Mosquito bat charging Facility',
    category: 'cow_shed',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Sabari & Shanmugam',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },
  {
    id: 'cs4',
    title: 'Mosquito net hooks',
    category: 'cow_shed',
    subcategory: 'Maintenance',
    status: 'pending',
    assignedTo: 'Sabari & Shanmugam',
    priority: 'medium',
    details: { time: '', frequency: 'Daily' }
  },

  // Vehicles tasks (16 tasks)
  {
    id: 'v1',
    title: 'Range Rover [TN09DF3444]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09DF3444', driver: 'David' }
  },
  {
    id: 'v2',
    title: 'Benz Maybach [TN09DE3444]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09DE3444', driver: 'David' }
  },
  {
    id: 'v3',
    title: 'Audi A7 3Atdi Quat [TN09BR6999]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09BR6999', driver: 'Manikandan' }
  },
  {
    id: 'v4',
    title: 'Skoda Slavia [TN09DB3444]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09DB3444', driver: 'Manikandan' }
  },
  {
    id: 'v5',
    title: 'Porsche Cayenne [TN10AL6999]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN10AL6999', driver: 'Kalyani' }
  },
  {
    id: 'v6',
    title: 'BMW 17 Electrical [TN09DL3444]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09DL3444', driver: 'Kalyani' }
  },
  {
    id: 'v7',
    title: 'Benz S 350 Cdi Bsiv (Trichy) [TN09CB6999]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09CB6999', driver: 'Savarimuthu' }
  },
  {
    id: 'v8',
    title: 'BMW 730D [TN09CE3444]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09CE3444', driver: 'Savarimuthu' }
  },
  {
    id: 'v9',
    title: 'Kona Eletrical [TN09CT7989]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09CT7989', driver: 'Selvaraj' }
  },
  {
    id: 'v10',
    title: 'Porsche Panamera [TN09CU3444]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09CU3444', driver: 'Selvaraj' }
  },
  {
    id: 'v11',
    title: 'Innova Crysta [TN10BC6999]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN10BC6999', driver: 'Vishwa' }
  },
  {
    id: 'v12',
    title: 'Eeco [TN09CU8715]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09CU8715', driver: 'Vishwa' }
  },
  {
    id: 'v13',
    title: 'BMW G310R (Bike) [TN10BT9292]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN10BT9292', driver: 'Savarimuthu' }
  },
  {
    id: 'v14',
    title: 'Kawasaki Nija 500 (Bike) [TN10CA7600]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN10CA7600', driver: 'Savarimuthu' }
  },
  {
    id: 'v15',
    title: 'Yamaha RX-100 (Bike) [TAQ0048]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TAQ0048', driver: 'Vishwa' }
  },
  {
    id: 'v16',
    title: 'FXDB Dyna Street BOB (Bike) [TN09CA6999]',
    category: 'vehicles',
    subcategory: 'Status',
    status: 'pending',
    assignedTo: 'Sukumar & Sakthivel',
    priority: 'medium',
    details: { vehicle_number: 'TN09CA6999', driver: 'Vishwa' }
  },

  // Maintenance tasks (2 tasks)
  {
    id: 'm1',
    title: 'Daily Generator Health Check',
    category: 'maintenance',
    subcategory: 'Daily',
    status: 'pending',
    assignedTo: 'Silas Green',
    priority: 'high',
  },
  {
    id: 'm2',
    title: 'Weekly Water Filtration Backwash',
    category: 'maintenance',
    subcategory: 'Weekly',
    status: 'pending',
    assignedTo: 'John Carver',
    priority: 'medium',
  },

  // Daily Health & Routine tasks (15 tasks)
  {
    id: 'h1',
    title: 'HBOT',
    category: 'health',
    subcategory: 'Therapy',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '8.00 AM to 9.00 AM', frequency: 'Daily' }
  },
  {
    id: 'h2',
    title: 'Juice வாழைத்தண்டு (Banana Stem Juice)',
    category: 'health',
    subcategory: 'Diet',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '9.00 AM to 10.00 AM', frequency: 'Daily' }
  },
  {
    id: 'h3',
    title: 'Juice பூசனி (Ash Gourd Juice)',
    category: 'health',
    subcategory: 'Diet',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '10.00 AM to 11.00 AM', frequency: 'Daily' }
  },
  {
    id: 'h4',
    title: 'Juice கேரட் + பாதாம் பால் (Carrot Juice + Almond Milk)',
    category: 'health',
    subcategory: 'Diet',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '11.00 AM to 12.00 PM', frequency: 'Daily' }
  },
  {
    id: 'h5',
    title: 'Coffee & Tea',
    category: 'health',
    subcategory: 'Diet',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'low',
    details: { time: '12.00 PM to 1.00 PM', frequency: 'Daily' }
  },
  {
    id: 'h6',
    title: 'Lunch (Omelette, Steamed Broccoli/Cabbage/Cauliflower, Curd Rice, Fried Fish, Fried Chicken)',
    category: 'health',
    subcategory: 'Diet',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '1.00 PM to 3.00 PM', frequency: 'Daily' }
  },
  {
    id: 'h7',
    title: 'Chelation / Ozone',
    category: 'health',
    subcategory: 'Therapy',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: 'Anytime', frequency: 'Daily' }
  },
  {
    id: 'h8',
    title: 'EECP',
    category: 'health',
    subcategory: 'Therapy',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '6.00 PM to 7.00 PM', frequency: 'Daily' }
  },
  {
    id: 'h9',
    title: 'ACT',
    category: 'health',
    subcategory: 'Therapy',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'medium',
    details: { time: 'Anytime', frequency: 'Daily' }
  },
  {
    id: 'h10',
    title: 'Shuttle & Swimming',
    category: 'health',
    subcategory: 'Activity',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'medium',
    details: { time: '7.00 PM to 8.00 PM', frequency: 'Daily' }
  },
  {
    id: 'h11',
    title: 'Dinner',
    category: 'health',
    subcategory: 'Diet',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: '8.00 PM to 8.30 PM', frequency: 'Daily' }
  },
  {
    id: 'h12',
    title: 'BP Check - Morning',
    category: 'health',
    subcategory: 'Vitals',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: 'Morning', frequency: 'Daily' }
  },
  {
    id: 'h13',
    title: 'BP Check - Evening',
    category: 'health',
    subcategory: 'Vitals',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: 'Evening', frequency: 'Daily' }
  },
  {
    id: 'h14',
    title: 'Sugar Check - Morning',
    category: 'health',
    subcategory: 'Vitals',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: 'Morning', frequency: 'Daily' }
  },
  {
    id: 'h15',
    title: 'Sugar Check - Evening',
    category: 'health',
    subcategory: 'Vitals',
    status: 'pending',
    assignedTo: 'Shanmugam (HBOT)',
    priority: 'high',
    details: { time: 'Evening', frequency: 'Daily' }
  }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act1',
    userId: 'emp3',
    userName: 'Clara Fields',
    action: 'Completed Cow Shed A Milking & Cleaning',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    category: 'cow_shed'
  },
  {
    id: 'act2',
    userId: 'emp3',
    userName: 'Clara Fields',
    action: 'Completed Morning Calf Milk Replacer Feeding',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    category: 'calves'
  },
  {
    id: 'act3',
    userId: 'emp2',
    userName: 'John Carver',
    action: 'Fed fish in pond A-D',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    category: 'fish'
  },
  {
    id: 'act4',
    userId: 'emp1',
    userName: 'Silas Green',
    action: 'Completed Morning Poultry Feeding',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    category: 'birds'
  },
  {
    id: 'act5',
    userId: 'emp1',
    userName: 'Silas Green',
    action: 'Completed Egg Collection & Grading',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    category: 'birds'
  }
];

export const WEATHER_MOCK: WeatherData = {
  temp: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12
};

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'iss1',
    taskId: 'b2',
    taskTitle: 'Water Line Check & Refill',
    category: 'birds',
    reportedBy: 'Silas Green',
    reportedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    priority: 'high',
    type: 'equipment',
    description: 'The automated water dispenser in Coop 2 has a cracked fitting and is slowly leaking water onto the floor bedding. Needs replacement connector.',
    status: 'pending',
    imageUri: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'iss2',
    taskId: 'cs2',
    taskTitle: 'Cow Feeding & Water Trough Refill',
    category: 'cow_shed',
    reportedBy: 'Clara Fields',
    reportedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    priority: 'medium',
    type: 'supply',
    description: 'Feed silage stock in shed B is running low. We only have about 2 bags left, which will last till tomorrow morning. Ordering new batch is urgent.',
    status: 'resolved',
    imageUri: 'https://images.unsplash.com/photo-1500937386664-56d159062215?w=500&auto=format&fit=crop&q=80',
    resolutionNotes: 'Manager ordered 10 units of feed, arriving this afternoon.'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'not1',
    title: 'New Issue Reported ⚠️',
    message: 'Silas Green reported: Coop 2 water line dispenser is leaking.',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    category: 'birds',
    read: false,
    type: 'issue_reported'
  },
  {
    id: 'not2',
    title: 'Task Rescheduled 📅',
    message: 'Milking & Cleaning reassigned to Clara Fields.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    category: 'cow_shed',
    read: true,
    type: 'task_rescheduled'
  }
];
