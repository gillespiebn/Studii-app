const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/studii",
  {
    // useMongoClient: true
  }
);

const classesSeed =[
    {
      "fullName": "Accounting",
      "abbreviation": "ACCT"
    },
    {
      "fullName": "Administration and Supervision",
      "abbreviation": "ADMS"
    },
    {
      "fullName": "Adult Education",
      "abbreviation": "ADLT"
    },
    {
      "fullName": "Advanced Media Production Technology",
      "abbreviation": "AMPT"
    },
    {
      "fullName": "African American Studies",
      "abbreviation": "AFAM"
    },
    {
      "fullName": "Allied Health Professions",
      "abbreviation": "ALHP"
    },
    {
      "fullName": "American Studies",
      "abbreviation": "AMST"
    },
    {
      "fullName": "Anatomy and Neurobiology",
      "abbreviation": "ANAT"
    },
    {
      "fullName": "Anthropology",
      "abbreviation": "ANTH"
    },
    {
      "fullName": "Anthropology Lab",
      "abbreviation": "ANTZ"
    },
    {
      "fullName": "Applied Lessons",
      "abbreviation": "APPL"
    },
    {
      "fullName": "Applied Music",
      "abbreviation": "APPM"
    },
    {
      "fullName": "Arabic",
      "abbreviation": "ARBC"
    },
    {
      "fullName": "Art Education",
      "abbreviation": "ARTE"
    },
    {
      "fullName": "Art Foundation",
      "abbreviation": "ARTF"
    },
    {
      "fullName": "Art History",
      "abbreviation": "ARTH"
    },
    {
      "fullName": "Arts",
      "abbreviation": "ARTS"
    },
    {
      "fullName": "Biochemistry",
      "abbreviation": "BIOC"
    },
    {
      "fullName": "Bioinformatics",
      "abbreviation": "BNFO"
    },
    {
      "fullName": "Biology",
      "abbreviation": "BIOL"
    },
    {
      "fullName": "Biology Lab",
      "abbreviation": "BIOZ"
    },
    {
      "fullName": "Biomedical Engineering",
      "abbreviation": "EGRB"
    },
    {
      "fullName": "Biostatistics",
      "abbreviation": "BIOS"
    },
    {
      "fullName": "Brandcenter",
      "abbreviation": "BRND"
    },
    {
      "fullName": "Business",
      "abbreviation": "BUSN"
    },
    {
      "fullName": "Chemical and Life Science Engineering",
      "abbreviation": "CLSE"
    },
    {
      "fullName": "Chemical Biology",
      "abbreviation": "CHEB"
    },
    {
      "fullName": "Chemistry",
      "abbreviation": "CHEM"
    },
    {
      "fullName": "Chemistry Lab",
      "abbreviation": "CHEZ"
    },
    {
      "fullName": "Chinese",
      "abbreviation": "CHIN"
    },
    {
      "fullName": "Cinema",
      "abbreviation": "CINE"
    },
    {
      "fullName": "Clinical and Translational Research",
      "abbreviation": "CCTR"
    },
    {
      "fullName": "Clinical Laboratory Sciences",
      "abbreviation": "CLLS"
    },
    {
      "fullName": "Clinical Radiation Sciences",
      "abbreviation": "CLRS"
    },
    {
      "fullName": "Clinical Radiation Sciences Lab",
      "abbreviation": "CLRZ"
    },
    {
      "fullName": "Communication Arts",
      "abbreviation": "COAR"
    },
    {
      "fullName": "Community Studies",
      "abbreviation": "CMST"
    },
    {
      "fullName": "Computer and Information Systems Security",
      "abbreviation": "CISS"
    },
    {
      "fullName": "Computer Science",
      "abbreviation": "CMSC"
    },
    {
      "fullName": "Cooperative Education",
      "abbreviation": "COOP"
    },
    {
      "fullName": "Counselor Education",
      "abbreviation": "CLED"
    },
    {
      "fullName": "Craft and Material Studies",
      "abbreviation": "CRAF"
    },
    {
      "fullName": "Criminal Justice",
      "abbreviation": "CRJS"
    },
    {
      "fullName": "Dance and Choreography",
      "abbreviation": "DANC"
    },
    {
      "fullName": "Dance and Choreography Lab",
      "abbreviation": "DANZ"
    },
    {
      "fullName": "Decision Analytics",
      "abbreviation": "DAPT"
    },
    {
      "fullName": "Dental Biomedical Sciences",
      "abbreviation": "DEBS"
    },
    {
      "fullName": "Dental Hygiene",
      "abbreviation": "DENH"
    },
    {
      "fullName": "Dental Special Topics",
      "abbreviation": "DENS"
    },
    {
      "fullName": "Design",
      "abbreviation": "DESI"
    },
    {
      "fullName": "Drug and Alcohol Studies",
      "abbreviation": "IDAS"
    },
    {
      "fullName": "Early Childhood Special Education",
      "abbreviation": "ECSE"
    },
    {
      "fullName": "Economics",
      "abbreviation": "ECON"
    },
    {
      "fullName": "Education",
      "abbreviation": "EDUC"
    },
    {
      "fullName": "Educational Leadership",
      "abbreviation": "EDLP"
    },
    {
      "fullName": "Educational Studies",
      "abbreviation": "EDUS"
    },
    {
      "fullName": "Electrical and Computer Engineering",
      "abbreviation": "EGRE"
    },
    {
      "fullName": "Emergency Medical Sciences and Administration",
      "abbreviation": "EMSA"
    },
    {
      "fullName": "Endodontics",
      "abbreviation": "ENDO"
    },
    {
      "fullName": "Engineering",
      "abbreviation": "ENGR"
    },
    {
      "fullName": "English",
      "abbreviation": "ENGL"
    },
    {
      "fullName": "English/English Education",
      "abbreviation": "ENED"
    },
    {
      "fullName": "Environmental Studies",
      "abbreviation": "ENVS"
    },
    {
      "fullName": "Environmental Studies Lab",
      "abbreviation": "ENVZ"
    },
    {
      "fullName": "European Cultures",
      "abbreviation": "EUCU"
    },
    {
      "fullName": "Family Medicine and Population Health",
      "abbreviation": "EPID"
    },
    {
      "fullName": "Fashion Design and Merchandising",
      "abbreviation": "FASH"
    },
    {
      "fullName": "Fast Track Information Systems",
      "abbreviation": "ISTM"
    },
    {
      "fullName": "Fast Track MBA",
      "abbreviation": "FMBA"
    },
    {
      "fullName": "Finance, Insurance and Real Estate",
      "abbreviation": "FIRE"
    },
    {
      "fullName": "Foreign Languages",
      "abbreviation": "FRLG"
    },
    {
      "fullName": "Foreign Literature in English Translation",
      "abbreviation": "FLET"
    },
    {
      "fullName": "Forensic Science",
      "abbreviation": "FRSC"
    },
    {
      "fullName": "Forensic Science Lab",
      "abbreviation": "FRSZ"
    },
    {
      "fullName": "French",
      "abbreviation": "FREN"
    },
    {
      "fullName": "Gender, Sexuality and Women’s Studies",
      "abbreviation": "GSWS"
    },
    {
      "fullName": "General Practice",
      "abbreviation": "GENP"
    },
    {
      "fullName": "German",
      "abbreviation": "GRMN"
    },
    {
      "fullName": "Gerontology",
      "abbreviation": "GRTY"
    },
    {
      "fullName": "Global Education",
      "abbreviation": "GLED"
    },
    {
      "fullName": "Government and Public Affairs",
      "abbreviation": "GVPA"
    },
    {
      "fullName": "Graduate Medical Education",
      "abbreviation": "GMED"
    },
    {
      "fullName": "Graduate School",
      "abbreviation": "GRAD"
    },
    {
      "fullName": "Graphic Design",
      "abbreviation": "GDES"
    },
    {
      "fullName": "Health Administration",
      "abbreviation": "HADM"
    },
    {
      "fullName": "Health Administration/Executive",
      "abbreviation": "HADE"
    },
    {
      "fullName": "Health and Movement Sciences",
      "abbreviation": "HEMS"
    },
    {
      "fullName": "Health Care Management",
      "abbreviation": "HCMG"
    },
    {
      "fullName": "Health, Physical Education and Exercise Science",
      "abbreviation": "HPEX"
    },
    {
      "fullName": "Health, Physical Education and Exercise Science Lab",
      "abbreviation": "HPEZ"
    },
    {
      "fullName": "Healthcare Policy and Research",
      "abbreviation": "HCPR"
    },
    {
      "fullName": "History",
      "abbreviation": "HIST"
    },
    {
      "fullName": "Homeland Security and Emergency Preparedness",
      "abbreviation": "HSEP"
    },
    {
      "fullName": "Honors",
      "abbreviation": "HONR"
    },
    {
      "fullName": "Human and Molecular Genetics",
      "abbreviation": "HGEN"
    },
    {
      "fullName": "Human-centered Design",
      "abbreviation": "HCDN"
    },
    {
      "fullName": "Humanities and Sciences",
      "abbreviation": "HUMS"
    },
    {
      "fullName": "Humanities and Sciences – Interdisciplinary",
      "abbreviation": "HUSI"
    },
    {
      "fullName": "Information Systems",
      "abbreviation": "INFO"
    },
    {
      "fullName": "Innovation in Product Design and Development",
      "abbreviation": "INNO"
    },
    {
      "fullName": "Interdisciplinary Biomedical Sciences",
      "abbreviation": "IBMS"
    },
    {
      "fullName": "Interdisciplinary Developmental Disability Studies",
      "abbreviation": "IDDS"
    },
    {
      "fullName": "Interdisciplinary Science",
      "abbreviation": "INSC"
    },
    {
      "fullName": "Interior Design",
      "abbreviation": "IDES"
    },
    {
      "fullName": "International Program in Addiction Studies",
      "abbreviation": "IPAS"
    },
    {
      "fullName": "International Studies",
      "abbreviation": "INTL"
    },
    {
      "fullName": "Interprofessional Education and Collaborative Care",
      "abbreviation": "IPEC"
    },
    {
      "fullName": "Italian",
      "abbreviation": "ITAL"
    },
    {
      "fullName": "Kinetic Imaging",
      "abbreviation": "KINE"
    },
    {
      "fullName": "Language and Cultural Competence",
      "abbreviation": "LGCC"
    },
    {
      "fullName": "Language Skills",
      "abbreviation": "LASK"
    },
    {
      "fullName": "Latin",
      "abbreviation": "LATN"
    },
    {
      "fullName": "LEAD",
      "abbreviation": "LDRS"
    },
    {
      "fullName": "Life Sciences",
      "abbreviation": "LFSC"
    },
    {
      "fullName": "Linguistics",
      "abbreviation": "LING"
    },
    {
      "fullName": "Management",
      "abbreviation": "MGMT"
    },
    {
      "fullName": "Management – Master’s",
      "abbreviation": "MSTM"
    },
    {
      "fullName": "Marketing",
      "abbreviation": "MKTG"
    },
    {
      "fullName": "Mass Communications",
      "abbreviation": "MASC"
    },
    {
      "fullName": "Mathematics",
      "abbreviation": "MATH"
    },
    {
      "fullName": "Mechanical and Nuclear Engineering",
      "abbreviation": "EGMN"
    },
    {
      "fullName": "Media, Art, and Text",
      "abbreviation": "MATX"
    },
    {
      "fullName": "Medical Physics",
      "abbreviation": "MEDP"
    },
    {
      "fullName": "Medicinal Chemistry",
      "abbreviation": "MEDC"
    },
    {
      "fullName": "Medicine",
      "abbreviation": "MEDI"
    },
    {
      "fullName": "Microbiology and Immunology",
      "abbreviation": "MICR"
    },
    {
      "fullName": "Military Sciences",
      "abbreviation": "MILS"
    },
    {
      "fullName": "Music Composition",
      "abbreviation": "MUSC"
    },
    {
      "fullName": "Music Education",
      "abbreviation": "MUED"
    },
    {
      "fullName": "Music History, Literature and Theory",
      "abbreviation": "MHIS"
    },
    {
      "fullName": "Nanoscience and Nanotechnology",
      "abbreviation": "NANO"
    },
    {
      "fullName": "Neurosciences",
      "abbreviation": "NEUS"
    },
    {
      "fullName": "Nurse Anesthesia",
      "abbreviation": "NRSA"
    },
    {
      "fullName": "Nurse Anesthesia Lab",
      "abbreviation": "NRSZ"
    },
    {
      "fullName": "Nurse Anesthesia Practice",
      "abbreviation": "DNAP"
    },
    {
      "fullName": "Nursing",
      "abbreviation": "NURS"
    },
    {
      "fullName": "Occupational Therapy",
      "abbreviation": "OCCT"
    },
    {
      "fullName": "Operations Research",
      "abbreviation": "OPER"
    },
    {
      "fullName": "Oral and Craniofacial Molecular Biology",
      "abbreviation": "OCMB"
    },
    {
      "fullName": "Oral Diagnostic Sciences",
      "abbreviation": "ORPT"
    },
    {
      "fullName": "Oral Surgery",
      "abbreviation": "ORSG"
    },
    {
      "fullName": "Orthodontics",
      "abbreviation": "ORTH"
    },
    {
      "fullName": "Painting and Printmaking",
      "abbreviation": "PAPR"
    },
    {
      "fullName": "Pathology",
      "abbreviation": "PATH"
    },
    {
      "fullName": "Patient Counseling",
      "abbreviation": "PATC"
    },
    {
      "fullName": "Pediatric Dentistry",
      "abbreviation": "PEDD"
    },
    {
      "fullName": "Periodontics",
      "abbreviation": "PERI"
    },
    {
      "fullName": "Pharmaceutical Sciences",
      "abbreviation": "PSCI"
    },
    {
      "fullName": "Pharmaceutics",
      "abbreviation": "PCEU"
    },
    {
      "fullName": "Pharmacology and Toxicology",
      "abbreviation": "PHTX"
    },
    {
      "fullName": "Pharmacy",
      "abbreviation": "PHAR"
    },
    {
      "fullName": "Philosophy",
      "abbreviation": "PHIL"
    },
    {
      "fullName": "Photography and Film",
      "abbreviation": "PHTO"
    },
    {
      "fullName": "Physical Therapy",
      "abbreviation": "PHTY"
    },
    {
      "fullName": "Physics",
      "abbreviation": "PHYS"
    },
    {
      "fullName": "Physics Lab",
      "abbreviation": "PHYZ"
    },
    {
      "fullName": "Physiology and Biophysics",
      "abbreviation": "PHIS"
    },
    {
      "fullName": "Physiology Lab",
      "abbreviation": "PHIZ"
    },
    {
      "fullName": "Policy and Leadership",
      "abbreviation": "DPAL"
    },
    {
      "fullName": "Political Science",
      "abbreviation": "POLI"
    },
    {
      "fullName": "Portuguese",
      "abbreviation": "PORT"
    },
    {
      "fullName": "Prosthodontics",
      "abbreviation": "PROS"
    },
    {
      "fullName": "Psychology",
      "abbreviation": "PSYC"
    },
    {
      "fullName": "Public Administration",
      "abbreviation": "PADM"
    },
    {
      "fullName": "Public Policy and Administration",
      "abbreviation": "PPAD"
    },
    {
      "fullName": "Reading",
      "abbreviation": "READ"
    },
    {
      "fullName": "Reading and Study Skills",
      "abbreviation": "RDSS"
    },
    {
      "fullName": "Rehabilitation and Movement Science",
      "abbreviation": "REMS"
    },
    {
      "fullName": "Rehabilitation Counseling",
      "abbreviation": "RHAB"
    },
    {
      "fullName": "Religious Studies",
      "abbreviation": "RELS"
    },
    {
      "fullName": "Research",
      "abbreviation": "OVPR"
    },
    {
      "fullName": "Russian",
      "abbreviation": "RUSS"
    },
    {
      "fullName": "Science, Technology and Society",
      "abbreviation": "SCTS"
    },
    {
      "fullName": "Sculpture and Extended Media",
      "abbreviation": "SCPT"
    },
    {
      "fullName": "Social and Behavioral Health",
      "abbreviation": "SBHD"
    },
    {
      "fullName": "Social Science",
      "abbreviation": "SOCS"
    },
    {
      "fullName": "Social Work",
      "abbreviation": "SLWK"
    },
    {
      "fullName": "Social Work – Doctorate",
      "abbreviation": "SWKD"
    },
    {
      "fullName": "Sociology",
      "abbreviation": "SOCY"
    },
    {
      "fullName": "Spanish",
      "abbreviation": "SPAN"
    },
    {
      "fullName": "Spanish/English Translation and Interpretation",
      "abbreviation": "SETI"
    },
    {
      "fullName": "Special Education and Disability Policy",
      "abbreviation": "SEDP"
    },
    {
      "fullName": "Speech",
      "abbreviation": "SPCH"
    },
    {
      "fullName": "Sport Leadership",
      "abbreviation": "SPTL"
    },
    {
      "fullName": "Statistical Sciences",
      "abbreviation": "STAT"
    },
    {
      "fullName": "Statistical Sciences and Operations Research",
      "abbreviation": "SSOR"
    },
    {
      "fullName": "Supply Chain Management and Analytics",
      "abbreviation": "SCMA"
    },
    {
      "fullName": "Systems Modeling and Analysis",
      "abbreviation": "SYSM"
    },
    {
      "fullName": "Teacher Education",
      "abbreviation": "TEDU"
    },
    {
      "fullName": "Theatre",
      "abbreviation": "THEA"
    },
    {
      "fullName": "Theatre Lab",
      "abbreviation": "THEZ"
    },
    {
      "fullName": "University College",
      "abbreviation": "UNIV"
    },
    {
      "fullName": "University Studies",
      "abbreviation": "UNVS"
    },
    {
      "fullName": "Urban Studies",
      "abbreviation": "URSP"
    },
    {
      "fullName": "Urban Studies and Planning Lab",
      "abbreviation": "URSZ"
    },
    {
      "fullName": "Venture Creation",
      "abbreviation": "VNTR"
    },
    {
      "fullName": "World Studies",
      "abbreviation": "WRLD"
    }
   ]

   db.ClassNames
  .remove({})
  .then(() => db.ClassNames.collection.insertMany(classesSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });