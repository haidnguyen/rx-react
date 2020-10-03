import React, { FC, useCallback, useEffect } from 'react';
import { $ } from 'react-rxjs-elements';
import { map } from 'rxjs/operators';

import { usePostQuery, usePostAction } from './PostList.store';

export const PostList: FC = () => {
  const fromPost = usePostQuery();
  const action = usePostAction();
  useEffect(() => {
    action.fetchPost();
  }, [action]);

  const onSelectPost = useCallback((id: number) => action.selectPost(id), [action]);

  return (
    <div>
      <span>Post Page Component</span>
      <button onClick={action.fetchPost.bind(action)}>Test</button>
      <$>{fromPost.activePost$.pipe(map(post => (post ? <div>{post?.body}</div> : null)))}</$>
      <$>
        {fromPost.posts$.pipe(
          map(posts =>
            posts.map(post => (
              <div key={post.id} onClick={() => onSelectPost(post.id)}>
                {post.title}
              </div>
            )),
          ),
        )}
      </$>
    </div>
  );
};
