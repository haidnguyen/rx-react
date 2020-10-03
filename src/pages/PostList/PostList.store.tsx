import {
  action,
  ActiveState,
  applyTransaction,
  EntityState,
  EntityStore,
  QueryEntity,
  StoreConfig,
} from '@datorama/akita';
import { createComponentStoreHooks } from '@rx-react/lib';
import { Post } from '@rx-react/models';
import { of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';

interface PostState extends EntityState<Post, number>, ActiveState {}

@StoreConfig({ name: 'posts' })
export class PostFeatureStore extends EntityStore<PostState> {}

class PostFeatureQuery extends QueryEntity<PostState> {
  constructor(protected readonly store: PostFeatureStore) {
    super(store);
  }

  readonly posts$ = this.selectAll();
  readonly activePost$ = this.selectActive();
}

class PostService {
  constructor(private postFeatureStore: PostFeatureStore) {}

  @action('[PostList] Fetch Posts')
  fetchPost() {
    this.postFeatureStore.setLoading(true);
    applyTransaction(async () => {
      (
        await ajax('https://jsonplaceholder.typicode.com/posts')
          .pipe(
            map(request => () => this.postFeatureStore.add(request.response as Post[])),
            catchError((err: AjaxError) => of(() => console.log(err.message))),
          )
          .toPromise()
      )();
      this.postFeatureStore.setLoading(false);
    });
  }

  @action('[PostList] Select Post')
  selectPost(entityId: number) {
    this.postFeatureStore.setActive(entityId);
  }
}

const store = new PostFeatureStore();
const query = new PostFeatureQuery(store);
const service = new PostService(store);

const [usePostQuery, usePostAction] = createComponentStoreHooks({ query, service });
export { usePostQuery, usePostAction };
