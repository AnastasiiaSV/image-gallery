import React, {FC} from 'react';
import {Route, Switch} from 'react-router';
import {GalleryPage} from "./pages/GalleryPage";
import {PicturePage} from "./pages/PicturePage";

export const App: FC = () => (
    <Switch>
        <Route exact path="/" component={GalleryPage}/>
        <Route exact path="/picture/:id" component={PicturePage}/>
    </Switch>
);