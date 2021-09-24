import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "@/data/index";
import thunkMiddleware from "redux-thunk";
import { notifications } from "@/middlewares/redux";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage/session").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["basket"],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware, notifications])
    );

    store.__persistor = persistStore(store);

    return store;
  }
};

export const storeWrapper = createWrapper(makeStore);
