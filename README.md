```
cosmos-explorer/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── logos/
│       └── arkeo.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.vue
│   │   │   ├── Footer.vue
│   │   │   ├── SearchBar.vue
│   │   │   └── LoadingSpinner.vue
│   │   ├── dashboard/
│   │   │   ├── NetworkStatus.vue
│   │   │   ├── LatestBlocks.vue
│   │   │   ├── LatestTransactions.vue
│   │   │   ├── ValidatorsList.vue
│   │   │   └── TokenomicsCard.vue
│   │   ├── blocks/
│   │   │   ├── BlockList.vue
│   │   │   └── BlockDetails.vue
│   │   ├── transactions/
│   │   │   ├── TransactionList.vue
│   │   │   └── TransactionDetails.vue
│   │   ├── validators/
│   │   │   ├── ValidatorsList.vue
│   │   │   └── ValidatorDetails.vue
│   │   ├── accounts/
│   │   │   ├── AccountDetails.vue
│   │   │   └── AccountTransactions.vue
│   │   └── governance/
│   │       ├── ProposalList.vue
│   │       └── ProposalDetails.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ProjectHomeView.vue
│   │   ├── BlocksView.vue
│   │   ├── BlockDetailView.vue
│   │   ├── TransactionsView.vue
│   │   ├── TransactionDetailView.vue
│   │   ├── ValidatorsView.vue
│   │   ├── ValidatorDetailView.vue
│   │   ├── AccountView.vue
│   │   ├── GovernanceView.vue
│   │   └── ProposalDetailView.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   ├── index.js
│   │   ├── modules/
│   │   │   ├── networks.js
│   │   │   ├── blocks.js
│   │   │   ├── transactions.js
│   │   │   ├── validators.js
│   │   │   ├── accounts.js
│   │   │   └── governance.js
│   ├── api/
│   │   ├── apiClient.js
│   │   ├── networkService.js
│   │   ├── blockService.js
│   │   ├── transactionService.js
│   │   ├── validatorService.js
│   │   ├── accountService.js
│   │   └── governanceService.js
│   ├── utils/
│   │   ├── format.js
│   │   ├── time.js
│   │   └── constants.js
│   ├── config/
│   │   └── networks.js
│   ├── App.vue
│   └── main.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```
