import { useRef } from 'react';

interface CreateComponentStoreFnParams<T, K> {
  query: T;
  service: K;
}

type ComponentStoreHooks<T, K> = [() => T, () => K];

export const createComponentStoreHooks = <T, K>({
  query,
  service,
}: CreateComponentStoreFnParams<T, K>): ComponentStoreHooks<T, K> => [
  () => useRef(query).current,
  () => useRef(service).current,
];
