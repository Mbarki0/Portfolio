# Portfolio 3D — Mohammed M'BARKI

Portfolio React/Three.js consacré au génie logiciel, aux API, aux systèmes distribués et à l'IA générative.

## Lancement rapide sous Windows

Double-cliquer sur `LANCER_PORTFOLIO.bat`. Le lanceur compile la dernière version, démarre un serveur local et ouvre automatiquement le portfolio dans le navigateur à l'adresse `http://127.0.0.1:4173`.

Ne pas ouvrir directement `index.html` : les navigateurs bloquent les modules React/Three.js chargés depuis une adresse `file://`.

## Développement

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

La version compilée est générée dans `dist/`.

## Publication sur GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` construit et publie automatiquement le portfolio à chaque push sur la branche `main` ou `master`.

Dans le dépôt GitHub, ouvrir **Settings → Pages**, puis sélectionner **GitHub Actions** dans **Build and deployment → Source**. Ensuite :

```bash
git add .
git commit -m "Replace portfolio with 3D redesign"
git push origin main
```

Les ressources utilisent des chemins relatifs : le site fonctionne sur un domaine utilisateur GitHub Pages comme dans un sous-dossier de dépôt.

## Identité et ressources

- Le logo MBK officiel est utilisé sans modification dans la navigation et la scène 3D.
- Les visuels fournis sont conservés sous `public/assets/`.
- Le CV est disponible au téléchargement depuis la navigation et la section contact.
