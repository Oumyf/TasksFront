# ✅ Gestion des Taches

Interface front-end de l'application de planification de tâches ,  de gestion des utilisateurs avec authentification par OTP développée avec **React.js** et connectée à une API AdonisJS.

---

## 🚀 Fonctionnalités principales

- Authentification par OTP (email)
- Validation et connexion de l'utilisateur
- Affichage des informations utilisateur
- Gestion complète des utilisateurs (admin)
- Création, modification, suppression et filtrage des tâches
- Tableau de bord moderne avec interface responsive

---

## 🧩 Prérequis

- Node.js >= 18
- npm ou yarn
- Backend API opérationnel (cf. [API AdonisJS](https://github.com/Oumyf/ton-api))

---

## ⚙️ Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Oumyf/keur-teranga-frontend.git
   cd keur-teranga-frontend
Installer les dépendances

bash
Copier
Modifier
npm install
Configurer les variables d'environnement
Crée un fichier .env à la racine :

env
Copier
Modifier
VITE_API_URL=http://localhost:3333
Lancer l'application

bash
Copier
Modifier
npm run dev
🔐 Authentification par OTP
POST /auth/login — Envoie un OTP à l'adresse email

POST /auth/confirmLogin — Valide l'OTP reçu

GET /auth/me — Récupère l'utilisateur connecté

Le token est stocké dans localStorage et utilisé via Axios.

👥 Gestion des utilisateurs (admin uniquement)
GET /auth/admin/users — Liste des utilisateurs

POST /auth/admin/users — Création d’un utilisateur

PUT /auth/admin/users/:id — Mise à jour d’un utilisateur

DELETE /auth/admin/users/:id — Suppression

PUT /auth/admin/change_status_user/:userId — Activer / désactiver un utilisateur

📌 Planification des tâches
POST /auth/planification/tasks/add_task — Ajouter une tâche

GET /auth/planification/tasks/list_tasks — Voir toutes les tâches

PUT /auth/planification/tasks/update_task/:id — Modifier une tâche

DELETE /auth/planification/tasks/delete_task/:id — Supprimer une tâche

GET /auth/planification/tasks/getTasksInLate — Voir les tâches en retard

🛠️ Technologies utilisées
⚛️ React.js avec Vite

🎨 Tailwind CSS

🔐 JWT Auth

🌐 Axios

🧭 React Router

🧠 Context API pour la gestion des états globaux

📁 Structure recommandée
bash
Copier
Modifier
src/
├── assets/
├── components/        # Composants UI
├── context/           # Auth / Global Contexts
├── pages/             # Pages principales
├── services/          # Services Axios (ex: authService.js, taskService.js)
├── App.jsx
├── main.jsx


✅ À faire (TODO)
 Ajouter des tests (Jest / React Testing Library)

 Ajouter une interface de statistiques

 Ajouter des notifications toast

 Support multilingue

👩🏽‍💻 Auteur
Nom : Adiaratou Oumy Fall

GitHub : Oumyf
