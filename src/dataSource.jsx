

export const users =[
    {firstname:'NOEL', lastname:'Berlensky', userType: 'admin', username:'', password:''},
    {firstname:'BERTIN', lastname:'Cartilina', userType:'principal', username:'', password:''},
    {firstname:'', lastname:'', userType:'teacher', username:'', password:''},
    {firstname:'', lastname:'', userType: 'student', username:'', password:''},
    {firstname:'', lastname:'', userType:'parent', username:'', password:''},
    {firstname:'', lastname:'', userType:'menfp_member', username:'', password:''},
]

export const school = {
    name: 'Institution Mixte Cérélus Pierre Glaude',
    adress:{no: '118', street:'BOULEVARD JEAN JACQUES DESSALINES', city: 'VERRETTES', country:'HAÏTI, (W.I)'}, 
    dept:'Artibonite',
    section: ['Garderie Éducative','Kindergarden','Fondamentale', 'Secondaire'],
    email:'imcpg.edu@gmail.com'
   
}


export const students = [
    {id: 1, firstname:'Kerenne Mairah', lastname:'Jules', class:'CP', year: '2025 - 2026'},
    {id: 2, firstname:'Ketsia Naima', lastname:'Jules', class:'CM2', year: '2025 - 2026'},
    {id: 3, firstname:'Medjina', lastname:'Thelemaque', class:'CE2', year: '2025 - 2026'},
    {id: 4, firstname:'Silfrida', lastname:'Méronvil', class:'CE1', year: '2025 - 2026'}
]
export const results = [
    {
        studentId: 1, matieres:
                        [
                            {name: 'Écriture', score: 6, coefficient: 10},
                            {name: 'Mathématiques', score: 8, coefficient: 10},
                            {name: 'Informatique', score: 8, coefficient: 10},
                        ]
    },
    {
        studentId: 2, matieres:
                        [
                            {name: 'Grammaire', score: 6.50, coefficient: 10},
                            {name: 'Sciences Sociales', score: 18, coefficient: 20}, 
                            {name: 'Sciences Expérimentales', score: 9, coefficient: 10},
                            {name: 'Mathématiques', score: 14, coefficient: 20},
                            {name: 'Informatique', score: 8, coefficient: 10},
                        ]
    },
    {
        studentId: 3, matieres:
                        [
                            {name: 'Conjugaison', score: 8, coefficient: 10},
                            {name: 'Mathématiques', score: 5.50, coefficient: 10},
                            {name: 'Informatique', score: 8, coefficient: 10},
                        ]
    },
    {
        studentId: 4, matieres:
                        [
                            {name: 'Conjugaison', score: 8, coefficient: 10},
                            {name: 'Mathématiques', score: 8, coefficient: 10},
                            {name: 'Informatique', score: 8, coefficient: 10},
                        ]
    }
]
export const subjects =[
    { name: "Lecture ou Exposé", grade: 0, coefficient: 0 },
    { name: "Anglais Oral", grade: 0, coefficient: 0 },
    { name: "Anglais Écrit", grade: 0, coefficient: 0 },
    { name: "Espagnol Oral", grade: 0, coefficient: 0 },
    { name: "Espagnol Écrit", grade: 0, coefficient: 0 },
    { name: "Dessin/Peinture", grade: 0, coefficient: 0 },
    { name: "Histoire", grade: 0, coefficient: 0 },
    { name: "Géographie", grade: 0, coefficient: 0 },
    { name: "Éducation Civique", grade: 0, coefficient: 0 },
    { name: "Sciences Expérimentales", grade: 0, coefficient: 0 },
    { name: "Mathématiques", grade: 0, coefficient: 0 },
    { name: "Informatique", grade: 0, coefficient: 0 },

    {nom: 'Créole', grade: null, coefficient: null},
    {nom: 'Français', grade: null, coefficient: null},
    {nom: 'Grammaire', grade: null, coefficient: null},
    {nom: 'Orthographe', grade: null, coefficient: null},
    {nom: 'Vocabulaire', grade: null, coefficient: null},
    {nom: 'Lecture', grade: null, coefficient: null},
    {nom: 'Sciences Physiques', grade: null, coefficient: null},
    {nom: 'Chimie', grade: null, coefficient: null},
    {nom: 'Éléctricité', grade: null, coefficient: null},
    {nom: 'Condensateur', grade: null, coefficient: null},

]

export const radialBarChartDATA = [
    {name: 'Boys', x: 1234, fill: "green"},
    {name: 'Girls', x: 1134, fill: "yellow"},

]