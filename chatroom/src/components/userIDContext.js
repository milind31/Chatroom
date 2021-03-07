import React from 'react';

const UserIDContext = React.createContext();

const UserIDProvider = UserIDContext.Provider;
const UserIDConsumer = UserIDContext.Consumer;

export { UserIDProvider, UserIDConsumer }