import React, {FC} from 'react';
import {Route, Switch} from 'react-router';
import {GalleryPage} from "./pages/GalleryPage";

export const App: FC = () => (
    <Switch>
      <Route exact path="/" component={GalleryPage}/>
    </Switch>
);