// @flow
//
//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import warnOnOutOfSyncMessages from "webviz-core/src/store/warnOnOutOfSyncMessages";
import type { Store } from "webviz-core/src/types/Store";

const configureStore = (reducer: () => any, middleware?: Array<any> = []): Store => {
  let enhancer = applyMiddleware(thunk, ...middleware);
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    enhancer = composeWithDevTools(enhancer);
  }
  const store = createStore(reducer, window.initialState, enhancer);
  warnOnOutOfSyncMessages(store);
  return store;
};

export default configureStore;
