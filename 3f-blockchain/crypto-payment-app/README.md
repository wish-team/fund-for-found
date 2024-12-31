## Blockchain Payment Processor

```
src/modules
          ├── address/
          │   ├── address.module.ts
          │   ├── address.service.ts
          │   ├── address.controller.ts (optional)
          ├── coin/
          │   ├── coin.module.ts
          │   ├── coin.service.ts
          │   ├── strategy/
          │   │   ├── coin-strategy.interface.ts
          │   │   ├── ethereum-coin.strategy.ts
          │   │   ├── bitcoin-coin.strategy.ts
          │   │   └── (other strategies)
          ├── app.module.ts
```
