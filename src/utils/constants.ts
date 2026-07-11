export const UNIVERSITIES = [
  "University of Zambia (UNZA)",
  "Copperbelt University (CBU)",
  "Mulungushi University",
  "ZCAS University",
  "Cavendish University Zambia",
  "Lusaka Apex Medical University"
] as const;

export const ROLES = [
  { id: 'student', title: 'Student', desc: 'Find housing & jobs' },
  { id: 'business', title: 'Business', desc: 'Sell to students' },
  { id: 'landlord', title: 'Landlord', desc: 'List your property' },
  { id: 'employer', title: 'Employer', desc: 'Hire top talent' },
  { id: 'admin', title: 'Administrator', desc: 'Platform control' }
] as const;

export const MARKETPLACE_CATEGORIES = [
  'Electronics',
  'Books',
  'Furniture',
  'Fashion',
  'Services'
] as const;

export const JOB_TYPES = [
  'Internship',
  'Part-time',
  'Full-time',
  'Freelance',
  'Remote'
] as const;

export const BUSINESS_CATEGORIES = [
  'Restaurants',
  'Printing Services',
  'Tutoring',
  'Salons',
  'Transportation',
  'Tech Services'
] as const;
